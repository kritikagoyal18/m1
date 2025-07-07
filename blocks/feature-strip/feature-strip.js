export default function decorate(block, { variation = 'strip', features = [] } = {}) {
  // Support Universal Editor property injection
  if (block.dataset && block.dataset.ueProps) {
    try {
      const ueProps = JSON.parse(block.dataset.ueProps);
      variation = ueProps.variation || variation;
      features = ueProps.features || features;
    } catch (e) {
      // Ignore parse errors, fallback to defaults
    }
  }

  block.classList.add('feature-strip', `feature-strip--${variation}`);

  // Clear block content
  block.innerHTML = '';

  // Create container for features
  const container = document.createElement('div');
  container.className = 'feature-strip__features';

  features.forEach((feature) => {
    const { icon, label, link, highlight } = feature;
    const item = document.createElement('div');
    item.className = 'feature-strip__item';
    if (highlight) item.classList.add('feature-strip__item--highlight');

    // SVG icon
    if (icon) {
      const iconEl = document.createElement('img');
      iconEl.className = 'feature-strip__icon';
      iconEl.src = icon;
      iconEl.alt = label || '';
      item.appendChild(iconEl);
    }

    // Label (optionally wrapped in link)
    let labelEl = document.createElement('span');
    labelEl.className = 'feature-strip__label';
    labelEl.textContent = label || '';
    if (link) {
      const linkEl = document.createElement('a');
      linkEl.href = link;
      linkEl.appendChild(labelEl);
      labelEl = linkEl;
    }
    item.appendChild(labelEl);

    container.appendChild(item);
  });

  block.appendChild(container);
}
