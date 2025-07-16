export default function decorate(block) {
  // Create the launcher container
  const launcher = document.createElement('div');
  launcher.className = 'chat-launcher-floating';

  // Insert the actual chat-launcher.svg icon as inline SVG
  const img = document.createElement('img');
  img.src = 'icons/chat-launcher.png';
  img.alt = 'Chat Launcher';
  img.className = 'chat-launcher-icon';
  launcher.appendChild(img);

  // Clear block and append launcher
  block.innerHTML = '';
  block.appendChild(launcher);
}
