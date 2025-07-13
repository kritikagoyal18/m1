export default function decorate(block) {
  const label = block.textContent.trim() || 'Button';
  block.innerHTML = '';

  const button = document.createElement('button');
  button.className = 'button button-modal-trigger';
  button.textContent = label;
  block.appendChild(button);

  button.addEventListener('click', () => {
    console.log('Button was clicked!');

    // Create modal overlay and modal panel in memory
    const overlay = document.createElement('div');
    overlay.className = 'button-modal-overlay';
    // Minimal inline styles for overlay
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.4)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = 1000;

    const modal = document.createElement('div');
    modal.className = 'button-modal';
    // Minimal inline styles for modal
    modal.style.background = '#fff';
    modal.style.padding = '2rem';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 32px rgba(0,0,0,0.2)';
    modal.style.minWidth = '300px';
    modal.style.maxWidth = '90vw';
    modal.style.maxHeight = '90vh';
    modal.style.overflow = 'auto';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'button-modal-close';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '16px';
    closeBtn.style.right = '16px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '2rem';
    closeBtn.style.cursor = 'pointer';

    const content = document.createElement('div');
    content.className = 'button-modal-content';
    content.innerHTML = '<h2>Modal Title</h2><p>This is the modal content.</p>';
    content.style.position = 'relative';

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
