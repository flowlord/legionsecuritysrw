chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchData') {
    fetch('https://legionsecuritysr.online/DB/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        sendResponse(data);
        console.log('Data fetched successfully:', data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        sendResponse({ error: 'Error fetching data' });
      });
    return true;  // Will respond asynchronously.
  }
});
