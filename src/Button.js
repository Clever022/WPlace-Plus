export function createSettingsButton() {
  const btn = document.createElement('button');
  btn.className = 'btn btn-square shadow-md';
  btn.title = 'Settings';
  btn.innerHTML = '...';
  return btn;
}

export default createSettingsButton;
