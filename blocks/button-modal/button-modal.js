export default function decorate(block) {
  const label = block.textContent.trim() || 'Button';
  block.innerHTML = '';

  const button = document.createElement('button');
  button.className = 'button button-modal-trigger';
  button.textContent = label;
  block.appendChild(button);

  button.addEventListener('click', () => {
    // Create modal overlay and modal panel
    const overlay = document.createElement('div');
    overlay.className = 'button-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'button-modal-panel';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'button-modal-close';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.innerHTML = '&times;';

    const content = document.createElement('div');
    content.className = 'button-modal-content';
    content.innerHTML = '<h2>Free registration, SIM card and delivery</h2><ul><li>Worldwide Roaming</li><li>Free Caller Number Display for 3 months for new sign-ups or when you switch to M1</li><li>Free Unlimited Weekend Data for 3 months for new sign-ups or when you switch to M1</li><li>Up to $200 off devices for new sign ups.</li></ul>';

    modal.appendChild(closeBtn);
    modal.appendChild(content);
    overlay.appendChild(modal);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Close logic
    closeBtn.addEventListener('click', () => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }
    });
  });
}
