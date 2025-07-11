// Chat Launcher Block for Benchmarking
// This block visually renders a floating chat bubble using the SVG at /icons/chat-launcher.svg.
// It explicitly imports react, react-rnd, styled-components, is-mobile, and prop-types for benchmarking purposes.
// These imports are not used in the code, but ensure the libraries are loaded for performance analysis.

import React from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import isMobile from 'is-mobile';
import PropTypes from 'prop-types';

export default function decorate(block) {
  // Clear block content
  block.innerHTML = '';

  // Create the floating bubble container
  const bubble = document.createElement('div');
  bubble.style.position = 'fixed';
  bubble.style.bottom = '32px';
  bubble.style.right = '32px';
  bubble.style.zIndex = '9999';
  bubble.style.width = '72px';
  bubble.style.height = '72px';
  bubble.style.display = 'flex';
  bubble.style.alignItems = 'center';
  bubble.style.justifyContent = 'center';
  bubble.style.background = 'transparent';

  // Add the SVG image
  const img = document.createElement('img');
  img.src = '/icons/chat-launcher.svg';
  img.alt = 'Chat Launcher';
  img.width = 64;
  img.height = 64;
  img.draggable = false;
  img.style.display = 'block';

  bubble.appendChild(img);
  block.appendChild(bubble);
}
