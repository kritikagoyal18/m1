export default function decorate(block) {
  // Use block text as button label, or fallback
  const label = block.textContent.trim() || 'Button';
  block.innerHTML = '';

  // Create button
  const button = document.createElement('button');
  button.className = 'button button-modal-trigger';
  button.textContent = label;
  block.appendChild(button);
}
