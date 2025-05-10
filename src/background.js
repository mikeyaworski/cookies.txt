// Create an offscreen document to handle downloads (for Chrome)
async function createOffscreen() {
  await chrome.offscreen.createDocument({
    url: 'offscreen/index.html',
    reasons: ['BLOBS'],
    justification: 'Downloading cookie file from service worker'
  });
}

chrome.offscreen?.hasDocument((hasDoc) => {
  if (!hasDoc) createOffscreen();
});

function formatCookie(co) {
  return [
    [
      co.httpOnly ? '#HttpOnly_' : '',
      !co.hostOnly && co.domain && !co.domain.startsWith('.') ? '.' : '',
      co.domain
    ].join(''),
    co.hostOnly ? 'FALSE' : 'TRUE',
    co.path,
    co.secure ? 'TRUE' : 'FALSE',
    co.session || !co.expirationDate ? 0 : co.expirationDate,
    co.name,
    co.value + '\n'
  ].join('\t');
}

async function getCookiesResponse(options = {}) {
  const stores = await chrome.cookies.getAllCookieStores();
  // TODO: Support multiple downloads for all cookie stores
  const cookies = await chrome.cookies.getAll({
    ...options,
    storeId: stores[0].id,
  });
  const header = [
    '# Netscape HTTP Cookie File\n',
    '# https://curl.haxx.se/rfc/cookie_spec.html\n',
    '# This is a generated file! Do not edit.\n\n'
  ];
  const body = cookies.map(formatCookie);
  const data = header.concat(body);
  return data.join('');
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'DOWNLOAD') {
    getCookiesResponse({
      url: msg.url ? decodeURIComponent(msg.url) : undefined
    }).then(cookiesResponse => {
      if (URL.createObjectURL) { // Firefox
        const blob = new Blob([cookiesResponse], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: url,
          filename: 'cookies.txt',
          saveAs: true,
        }, () => {
          // Revoke the object URL after a delay to allow the download to complete
          setTimeout(() => URL.revokeObjectURL(url), 5000);
        });
      } else { // Chrome
        chrome.runtime.sendMessage({
          type: 'OFFSCREEN_DOWNLOAD',
          data: cookiesResponse,
        });
      }
    });
  }
  return true;
});
