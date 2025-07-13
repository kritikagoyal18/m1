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
    modal.className = 'button-modal';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'button-modal-close';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.innerHTML = '&times;';

    const content = document.createElement('div');
    content.className = 'button-modal-content';
    content.innerHTML = '<h2>Modal Title</h2><p>This is the modal content.</p>';

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
