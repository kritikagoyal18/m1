export default function decorate(block) {
  // Always add base class
  block.classList.add('feature-strip');

  // Detect variant from block class or data (default to 'strip')
  let variation = 'strip';
  if (block.classList.contains('feature-strip--grid')) {
    variation = 'grid';
  } else if (block.classList.contains('feature-strip--strip')) {
    variation = 'strip';
  } else if (block.dataset && block.dataset.variation) {
    variation = block.dataset.variation;
  }

  // Remove any existing variant class
  block.classList.remove('feature-strip--grid', 'feature-strip--strip');
  // Add the correct variant class
  block.classList.add(`feature-strip--${variation}`);

  // Clear block content
  const rows = [...block.children];
  block.innerHTML = '';

  // Create container for features
  const container = document.createElement('div');
  container.className = 'feature-strip__features';

  // Group icon+text (and link) into a single item per feature
  let i = 0;
  while (i < rows.length) {
    // Skip variant row or empty items
    const row = rows[i];
    if (row.getAttribute && row.getAttribute('data-aue-prop') === 'variation') {
      i++;
      continue;
    }
    // Find icon in this row
    const iconEl = row.querySelector('img, picture');
    if (iconEl) {
      // Look ahead for the next row with text
      let textRow = null;
      for (let j = i + 1; j < rows.length; j++) {
        const candidate = rows[j];
        if (candidate.getAttribute && candidate.getAttribute('data-aue-prop') === 'variation') continue;
        if (candidate.querySelector('p, span, a')) {
          textRow = candidate;
          break;
        }
      }
      // Create item
      const item = document.createElement('div');
      item.className = 'feature-strip__item';
      // Clone and append icon
      const iconClone = iconEl.cloneNode(true);
      if (iconClone.tagName === 'IMG') {
        iconClone.className = 'feature-strip__icon';
      } else {
        iconClone.querySelectorAll('img').forEach(img => img.classList.add('feature-strip__icon'));
      }
      item.appendChild(iconClone);
      // Clone and append label (if found)
      if (textRow) {
        let labelEl = textRow.querySelector('a, span, p');
        if (labelEl) {
          labelEl = labelEl.cloneNode(true);
          labelEl.classList.add('feature-strip__label');
          item.appendChild(labelEl);
        }
      }
      container.appendChild(item);
      // Skip the text row in the next iteration
      if (textRow) {
        i = rows.indexOf(textRow) + 1;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  block.appendChild(container);
}
