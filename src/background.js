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

chrome.runtime.onMessage.addListener((url, sender, sendResponse) => {
  getCookiesResponse({
    url: decodeURIComponent(url) || undefined
  }).then(cookiesResponse => {
    sendResponse(cookiesResponse);
  });
  return true;
});
