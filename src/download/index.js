chrome.runtime.sendMessage(decodeURIComponent(window.location.hash.slice(1))).then(response => {
  const blob = new Blob([response], { type: 'text/plain' });
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = objectUrl;
  a.download = 'cookies.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
  close();
});
