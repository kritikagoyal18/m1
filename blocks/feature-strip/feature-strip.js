export default function decorate(block) {
  console.log('Decorating feature-strip block');
  // Support Universal Editor property injection
  let variation = 'strip';
  let props = {};
  if (block.dataset && block.dataset.ueProps) {
    try {
      props = JSON.parse(block.dataset.ueProps);
      variation = props.variation || variation;
      console.log('variation', variation);
    } catch (e) {
      // Ignore parse errors, fallback to defaults
    }
  }

  block.classList.add('feature-strip', `feature-strip--${variation}`);
  block.innerHTML = '';

  // Build features array (same field names for both variants)
  let features = [];
  for (let i = 1; i <= 3; i++) {
    features.push({
      icon: props[`icon${i}`] || '',
      label: props[`text${i}`] || '',
      link: props[`link${i}`] || ''
    });
  }

  // Create container for features
  const container = document.createElement('div');
  container.className = 'feature-strip__features';

  features.forEach((feature) => {
    const { icon, label, link } = feature;
    const item = document.createElement('div');
    item.className = 'feature-strip__item';

    // SVG icon
    if (icon) {
      const iconEl = document.createElement('img');
      iconEl.className = 'feature-strip__icon';
      iconEl.src = icon;
      iconEl.alt = label || '';
      item.appendChild(iconEl);
    }

    // Label (optionally wrapped in link for grid variant)
    let labelEl = document.createElement('span');
    labelEl.className = 'feature-strip__label';
    labelEl.textContent = label || '';
    if (variation === 'grid' && link) {
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
