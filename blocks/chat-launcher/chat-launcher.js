// Chat Launcher Block for Benchmarking
// This block visually renders a floating chat bubble using the SVG at /icons/chat-launcher.svg.
// It explicitly imports react, react-rnd, styled-components, is-mobile, and prop-types for benchmarking purposes.
// These imports are not used in the code, but ensure the libraries are loaded for performance analysis.

import React from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import isMobile from 'is-mobile';
import PropTypes from 'prop-types';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  console.log('Decorating chat-launcher block');
  // Clear block content
  block.innerHTML = '';

  // Create the floating bubble container
  const bubble = document.createElement('div');
  bubble.style.position = 'fixed';
  bubble.style.bottom = '32px';
  bubble.style.right = '32px';
  bubble.style.zIndex = '2147483647'; // max z-index
  bubble.style.width = '72px';
  bubble.style.height = '72px';
  bubble.style.display = 'flex';
  bubble.style.alignItems = 'center';
  bubble.style.justifyContent = 'center';
  bubble.style.background = 'transparent';
  bubble.style.pointerEvents = 'auto';

  // Add the icon span
  const iconSpan = document.createElement('span');
  iconSpan.className = 'icon icon-chat-launcher';
  bubble.appendChild(iconSpan);

  // Ensure the icon is decorated (img injected)
  decorateIcons(bubble);

  block.appendChild(bubble);
}
