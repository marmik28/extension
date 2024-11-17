document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('analysisResult', (data) => {
      const resultDiv = document.getElementById('result');
      if (data && data.analysisResult && data.analysisResult.message) {
          resultDiv.textContent = data.analysisResult.message;
      } else {
          resultDiv.textContent = 'No analysis available.';
          console.error('No analysis result found in storage');
      }
  });
});
