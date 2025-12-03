import { createSettingsButton } from './Button.js';

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

// Insert "Settings" button into the navigation container that holds
// the Store, Alliance, Leaderboard and Search buttons. Try immediately,
// then observe DOM changes briefly if the container isn't present yet.
try {
  const KNOWN_LABELS = ["Store", "Alliance", "Leaderboard", "Search"];

  function countLabelMatches(container) {
    const buttons = Array.from(container.querySelectorAll('button'));
    let count = 0;
    for (const b of buttons) {
      const t = (b.textContent || '').trim();
      if (!t) continue;
      for (const lbl of KNOWN_LABELS) {
        if (t.toLowerCase() === lbl.toLowerCase()) {
          count += 1;
          break;
        }
      }
    }
    return count;
  }

  function findNavContainer() {
    const candidates = Array.from(document.querySelectorAll('div.flex.flex-col'));
    let best = null;
    let bestScore = 0;
    for (const c of candidates) {
      const score = countLabelMatches(c);
      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }
    return bestScore > 0 ? best : null;
  }

  const settingsBtn = createSettingsButton();
  let appended = false;

  function tryAppend() {
    const container = findNavContainer();
    if (container) {
      container.appendChild(settingsBtn);
      appended = true;
      return true;
    }
    return false;
  }

  if (!tryAppend()) {
    const observer = new MutationObserver(() => {
      if (tryAppend()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  }
} catch (err) {
  console.error('Error adding Settings button:', err);
}