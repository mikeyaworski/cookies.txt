document.querySelector(".all").addEventListener("click", () => {
  chrome.permissions.request({
    origins: ['<all_urls>'],
  }).then(() => {
    chrome.tabs.create({
      active: false,
      url: '/download/index.html',
    });
  });
});
document.querySelector(".current").addEventListener("click", () => {
  chrome.permissions.request({
    origins: ['<all_urls>'],
  }).then(() => {
    chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      const { url } = tabs[0];
      chrome.tabs.create({
        active: false,
        url: `/download/index.html#${encodeURIComponent(url)}`,
      });
    });
  });
});
