export default function decorate(block) {
  // Use block text as button label, or fallback
  const label = block.textContent.trim() || 'Open Modal';
  block.innerHTML = '';

  // Create button
  const button = document.createElement('button');
  button.className = 'button button-modal-trigger';
  button.textContent = label;
  block.appendChild(button);

  // Modal HTML structure
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'button-modal-overlay';
  modalOverlay.style.display = 'none';

  const modal = document.createElement('div');
  modal.className = 'button-modal';

  // Modal close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'button-modal-close';
  closeBtn.setAttribute('aria-label', 'Close modal');
  closeBtn.innerHTML = '&times;';

  // Modal content (customize as needed)
  const modalContent = document.createElement('div');
  modalContent.className = 'button-modal-content';
  modalContent.innerHTML = '<h2>Modal Title</h2><p>This is the modal content. You can customize this!</p>';

  modal.appendChild(closeBtn);
  modal.appendChild(modalContent);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  // Open modal
  button.addEventListener('click', () => {
    modalOverlay.style.display = 'block';
    setTimeout(() => modalOverlay.classList.add('open'), 10);
  });

  // Close modal on close button or overlay click
  function closeModal() {
    modalOverlay.classList.remove('open');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 300); // match CSS transition
  }
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
