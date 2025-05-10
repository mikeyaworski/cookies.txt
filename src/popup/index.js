document.querySelector(".all").addEventListener("click", () => {
  chrome.permissions.request({
    origins: ['<all_urls>'],
  }).then(() => {
    chrome.runtime.sendMessage({
      type: 'DOWNLOAD',
    });
  });
});
document.querySelector(".current").addEventListener("click", () => {
  chrome.permissions.request({
    origins: ['<all_urls>'],
  }).then(() => {
    chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      const { url } = tabs[0];
      chrome.runtime.sendMessage({
        type: 'DOWNLOAD',
        url,
      });
    });
  });
});
