chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchData') {
      fetch('https://legionsecuritysr.online/DB/data.json')
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => console.error('Error fetching data:', error));
      return true;  // Will respond asynchronously.
    }
  });
  