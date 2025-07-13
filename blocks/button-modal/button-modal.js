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

    // Log before appending
    console.log('Step 4: Body children before append:', Array.from(document.body.children).map(el => el.className || el.tagName));

    // Append overlay to body
    document.body.appendChild(overlay);

    // Log after appending
    console.log('Step 4: Body children after append:', Array.from(document.body.children).map(el => el.className || el.tagName));
    console.log('Step 4: Overlay is now in DOM:', overlay);
  });
}
