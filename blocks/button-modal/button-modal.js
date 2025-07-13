export default function decorate(block) {
  const label = block.textContent.trim() || 'Button';
  block.innerHTML = '';

  const button = document.createElement('button');
  button.className = 'button button-modal-trigger';
  button.textContent = label;
  block.appendChild(button);

  button.addEventListener('click', () => {
    console.log('Button was clicked!');

    // Step 3: Create modal overlay and modal panel in memory
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

    // Log the created elements (not appended to DOM)
    console.log('Step 3: Created overlay:', overlay);
    console.log('Step 3: Created modal:', modal);
    console.log('Step 3: Created closeBtn:', closeBtn);
    console.log('Step 3: Created content:', content);
  });
}
