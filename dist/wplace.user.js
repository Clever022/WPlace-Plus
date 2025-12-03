// ==UserScript==
// @name         Wplace +
// @version      1.0
// @description  A userscript that add quality of life improvements to the wplace website
// @match        https://wplace.live/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==


(function () {
  function createSettingsButton() {
    const btn = document.createElement('button');
    btn.className = 'btn btn-square shadow-md';
    btn.title = 'Settings';
    btn.innerHTML = '...';
    return btn;
  }
  
  
  
  
  // Create notification styles
  const style = document.createElement("style");
  style.textContent = `
    .wplace-notification {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4CAF50;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      opacity: 1;
      transition: opacity 1s ease-in-out;
    }
  `;
  document.head.appendChild(style);
  
  // Create notification box
  const notification = document.createElement("div");
  notification.className = "wplace-notification";
  notification.textContent = "loaded";
  document.body.appendChild(notification);
  
  // Fade out after 4 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.remove();
    }, 1000);
  }, 4000);
  
  // Insert "Settings" button into navigation container with existing buttons
  try {
    const settingsBtn = createSettingsButton();
    
    // Find the flex container that holds the buttons (Store, Alliance, Leaderboard, Search)
    // by looking for a flex.flex-col container that has button children with the btn class
    const flexContainers = document.querySelectorAll('div.flex.flex-col');
    let buttonContainer = null;
    
    for (const container of flexContainers) {
      const buttons = container.querySelectorAll('button.btn');
      if (buttons.length > 0) {
        buttonContainer = container;
        break;
      }
    }
    
    if (buttonContainer) {
      buttonContainer.appendChild(settingsBtn);
    } else {
      console.warn('Button container not found in page');
    }
  } catch (err) {
    console.error('Error adding Settings button:', err);
  }
})();
