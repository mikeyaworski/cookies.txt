chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'OFFSCREEN_DOWNLOAD') {
    const blob = new Blob([msg.data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cookies.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
