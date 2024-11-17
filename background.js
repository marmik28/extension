chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.policyLink) {
      console.log('Received policy link:', message.policyLink);

      // Use ChatGPT API endpoint (example placeholder)
      fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_Key}`
          },
          body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: `Analyze this privacy policy page: ${message.policyLink} and give list of potential risks` }]
          })
      })
      .then(response => {
          if (!response.ok) {
              console.error(`Error ${response.status}`);
              return response.json().then(text => {
                  console.error(`Details: ${JSON.stringify(text)}`);
                  throw new Error('Network response was not ok');
              });
          }
          return response.json();
      })
      .then(data => {
          const message = data.choices[0].message.content;
          console.log('ChatGPT Analysis Result:', message);
          chrome.storage.local.set({ analysisResult: { message } });
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
});
