export function updateButtons(activeSlide) {
  const block = activeSlide.closest('.block');
  const buttons = block.closest('.cf-carousel-wrapper').querySelector('.cf-carousel-buttons');

  const nthSlide = activeSlide.offsetLeft / activeSlide.parentNode.clientWidth;
  const button = block.parentElement.querySelector(`.cf-carousel-buttons > button:nth-child(${nthSlide + 1})`);
  [...buttons.children].forEach((r) => r.classList.remove('selected'));
  button.classList.add('selected');
}

// Helper to get attribute value by prop name, supporting both author and publish environments
function getBlockPropValue(block, propName, order) {
  const attrDiv = block.querySelector(`[data-aue-prop="${propName}"]`);
  if (attrDiv) {
    return attrDiv.textContent?.trim() || '';
  } else if (block.children[order]) {
    return block.children[order].textContent?.trim() || '';
  }
  return '';
}

async function loadContentFragments(cfQueryPath) {
  const { hostname } = window.location;
  const isAemCloud = hostname.includes('author-p160056-e1711628.adobeaemcloud.com') ||
                     hostname.includes('publish-p160056-e1711628.adobeaemcloud.com');
  const apiBase = isAemCloud
    ? ''
    : 'https://publish-p160056-e1711628.adobeaemcloud.com';
  const apiUrl = `${apiBase}/graphql/execute.json/m1/${cfQueryPath}`;
  const cfFolder = await fetch(apiUrl);
  const cfFolderData = await cfFolder.json();
  const cfItems = Object.values(cfFolderData?.data)?.[0]?.items;
  return cfItems;
}

export default function decorate(block) {
  // Pagination dots container
  const pagination = document.createElement('div');
  pagination.classList.add('cf-carousel-pagination');

  // Get configuration from block attributes or sequential divs.
  const cfFolderPath = getBlockPropValue(block, 'reference', 0);
  const slidesToShowVal = getBlockPropValue(block, 'slidesToShow', 1);
  const layout = getBlockPropValue(block, 'layout', 2) || 'verticle';
  const arrowNavigationVal = getBlockPropValue(block, 'arrowNavigation', 3);
  const autoRotateVal = getBlockPropValue(block, 'autoRotate', 4);
  const customStyle = getBlockPropValue(block, 'customStyle', 5);

  // Default values
  const slidesToShow = slidesToShowVal ? parseInt(slidesToShowVal, 10) : 3;
  const arrowNavigation = arrowNavigationVal?.toLowerCase() === 'true' || true;
  const autoRotate = true;

  if (!cfFolderPath) return;

  // Responsive slidesToShow
  function getResponsiveSlidesToShow() {
    const width = window.innerWidth;
    if (width >= 1024) return slidesToShow;
    if (width >= 600) return 2;
    return 1;
  }

  let currentSlidesToShow = getResponsiveSlidesToShow();
  let allItems = [];
  let sortedItems = [];

  // Card-based slide structure
  function createSlide(item, slidesToShowValue) {
    const card = document.createElement('div');
    card.classList.add('cf-carousel-card', layout);
    card.innerHTML = `
      <div class="cf-carousel-card-image">
        <a href="${item.ctaLink._publishUrl}" target="_blank" rel="noopener noreferrer">
          <img src="${item.image._publishUrl}" alt="${item.title}" loading="eager" />
          <h1>${item.title}</h1>
          <p>${item.pretitle}</p>
          <a href="${item.ctaLink._publishUrl}" target="_blank" rel="noopener noreferrer" class="carouselButton">
            ${item.ctaLabel}
          </a>
        </a>
      </div>
    `;
    return card;
  }

  // Pagination dots
  function updatePagination(activePage) {
    pagination.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('span');
      dot.className = 'cf-carousel-pagination-dot' + (i === activePage ? ' active' : '');
      dot.addEventListener('click', () => {
        scrollToPage(i);
      });
      pagination.appendChild(dot);
    }
  }

  // Create left and right arrow buttons
  const leftArrow = document.createElement('button');
  leftArrow.classList.add('cf-carousel-arrow', 'cf-carousel-arrow-left');
  leftArrow.setAttribute('aria-label', 'Previous slide');
  leftArrow.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 19L9.5 12L15.5 5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  leftArrow.style.display = 'none';

  const rightArrow = document.createElement('button');
  rightArrow.classList.add('cf-carousel-arrow', 'cf-carousel-arrow-right');
  rightArrow.setAttribute('aria-label', 'Next slide');
  rightArrow.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 5L14.5 12L8.5 19" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  rightArrow.style.display = 'none';

  // Create arrow button container
  const arrowContainer = document.createElement('div');
  arrowContainer.classList.add('cf-carousel-arrows');
  arrowContainer.append(leftArrow, rightArrow);

  // Set arrow container width for desktop
  if (window.innerWidth >= 1024) {
    const slidesToShowNow = getResponsiveSlidesToShow();
    arrowContainer.style.width = `${320 * slidesToShowNow + (slidesToShowNow - 1) * 20 + 10}px`;
  }

  let currentPage = 0;
  let totalPages = 1;
  let scrollTarget = null;
  let autoRotateInterval = null;

  function scrollToPage(page) {
    scrollTarget = block.clientWidth * page;
    block.scrollTo({
      left: scrollTarget,
      behavior: 'smooth'
    });
    currentPage = page;
    updateArrowVisibility(page);
    updatePagination(page);
    
    // Reset auto-rotate timer when manually navigating
    if (autoRotate && autoRotateInterval) {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    }
  }

  function updateArrowVisibility(page) {
    if (totalPages <= 1) {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
      return;
    }
    leftArrow.style.display = page > 0 ? '' : 'none';
    rightArrow.style.display = page < totalPages - 1 ? '' : 'none';
  }

  leftArrow.addEventListener('click', () => {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1);
    }
  });

  rightArrow.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      scrollToPage(currentPage + 1);
    }
  });

  // Auto-rotate functionality
  function startAutoRotate() {
    if (!autoRotate || totalPages <= 1) return;
    
    autoRotateInterval = setInterval(() => {
      const nextPage = (currentPage + 1) % totalPages;
      scrollToPage(nextPage);
    }, 3000); // 3 seconds
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  function renderCarousel(itemsToRender) {
    block.replaceChildren();
    currentSlidesToShow = getResponsiveSlidesToShow();
    // Render slides
    itemsToRender.forEach(item => {
      block.append(createSlide(item, currentSlidesToShow));
    });
    // No navigation buttons, only pagination dots
    const totalSlides = itemsToRender.length;
    totalPages = Math.ceil(totalSlides / currentSlidesToShow);
    updatePagination(0);
  }

  (async () => {
    try {
      // Fetch and process data
      const cfItems = await loadContentFragments(cfFolderPath);
      allItems = cfItems;
      renderCarousel(allItems);

      // Insert navigation arrows
      if (arrowNavigation) {
        block.parentElement.append(arrowContainer);
      }
      // Insert pagination only
      block.parentElement.append(pagination);
      if (customStyle) block.classList.add(customStyle);
      if (arrowNavigation) updateArrowVisibility(0);
      updatePagination(0);
      
      // Start auto-rotation if enabled
      if (autoRotate) {
        startAutoRotate();
      }

      block.addEventListener('scroll', () => {
        if (scrollTarget !== null) {
          if (Math.abs(block.scrollLeft - scrollTarget) < 2) {
            scrollTarget = null;
          } else {
            // Still animating, don't update UI yet
            return;
          }
        }
        const page = Math.round(block.scrollLeft / block.clientWidth);
        currentPage = page;
        if (arrowNavigation) updateArrowVisibility(page);
        updatePagination(page);
      }, { passive: true });

      // Pause auto-rotation on hover
      block.addEventListener('mouseenter', () => {
        if (autoRotate) {
          stopAutoRotate();
        }
      });

      block.addEventListener('mouseleave', () => {
        if (autoRotate) {
          startAutoRotate();
        }
      });

    } catch (error) {
      console.error('Error loading content fragments or user location:', error);
    }
  })();
}


