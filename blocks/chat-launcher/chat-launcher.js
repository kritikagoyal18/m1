export default function decorate(block) {
  // Create the launcher container
  const launcher = document.createElement('div');
  launcher.className = 'chat-launcher-floating';

  // Create the image
  const img = document.createElement('img');
  img.src = '/icons/chat-launcher.svg';
  img.alt = 'Chat Launcher';
  img.className = 'chat-launcher-icon';

  // Append image to container
  launcher.appendChild(img);

  // Clear block and append launcher
  block.innerHTML = '';
  block.appendChild(launcher);
}
