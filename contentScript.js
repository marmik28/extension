(function findPrivacyPolicy() {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
      const href = link.href.toLowerCase();
      if (href.includes('privacy') || href.includes('policy')) {
          console.log('Privacy Policy Found:', href);
          chrome.runtime.sendMessage({ policyLink: href });
      }
  });
})();
