export default function decorate(block) {
  // Add base class
  block.classList.add('feature-strip');

  // Detect variant from block class (e.g., feature-strip--grid or feature-strip--strip)
  let variation = 'strip';
  if (block.classList.contains('feature-strip--grid')) {
    variation = 'grid';
  } else if (block.classList.contains('feature-strip--strip')) {
    variation = 'strip';
  }

  // Clear block content
  const rows = [...block.children];
  block.innerHTML = '';

  // Create container for features
  const container = document.createElement('div');
  container.className = 'feature-strip__features';

  rows.forEach((row) => {
    // Skip if the row's text content matches the variant name
    if (row.getAttribute && row.getAttribute('data-aue-prop') === 'variation') return;

    const item = document.createElement('div');
    item.className = 'feature-strip__item';

    // Find icon (img or picture)
    const iconEl = row.querySelector('img, picture');
    if (iconEl) {
      const iconClone = iconEl.cloneNode(true);
      if (iconClone.tagName === 'IMG') {
        iconClone.className = 'feature-strip__icon';
      } else {
        // If picture, add class to all contained imgs
        iconClone.querySelectorAll('img').forEach(img => img.classList.add('feature-strip__icon'));
      }
      item.appendChild(iconClone);
    }

    // Find label and link
    let labelEl = row.querySelector('a, span, p');
    if (labelEl) {
      labelEl = labelEl.cloneNode(true);
      labelEl.classList.add('feature-strip__label');
      item.appendChild(labelEl);
    } else {
      // fallback: use text content
      const text = row.textContent.trim();
      if (text) {
        const span = document.createElement('span');
        span.className = 'feature-strip__label';
        span.textContent = text;
        item.appendChild(span);
      }
    }

    container.appendChild(item);
  });

  block.appendChild(container);
}
