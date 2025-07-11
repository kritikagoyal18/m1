// Chat Launcher Block for Benchmarking
// This block visually renders a floating chat bubble using the SVG at /icons/chat-launcher.svg.
// It explicitly imports and minimally uses react, react-rnd, styled-components, is-mobile, and prop-types
// to ensure all relevant libraries are loaded for performance benchmarking. No interactivity is provided.

import React from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import isMobile from 'is-mobile';
import PropTypes from 'prop-types';

// Minimal usage of isMobile and PropTypes to ensure they are included in the bundle
const _isMobile = isMobile();
const Dummy = ({ children }) => <>{children}</>;
Dummy.propTypes = { children: PropTypes.node };

// Styled floating container for the bubble
const BubbleWrapper = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9999;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

// The main block function
export default function decorate(block) {
  // Clear block content
  block.innerHTML = '';

  // Create a root for React rendering
  const root = document.createElement('div');
  block.appendChild(root);

  // Minimal React component for the floating bubble
  function ChatLauncherBubble() {
    return (
      <Dummy>
        {/* Rnd is used to ensure react-rnd is loaded, but drag/resize is disabled */}
        <Rnd
          enableResizing={false}
          disableDragging
          style={{ zIndex: 9999, position: 'fixed' }}
          default={{ x: 0, y: 0, width: 72, height: 72 }}
        >
          <BubbleWrapper>
            <img
              src="/icons/chat-launcher.svg"
              alt="Chat Launcher"
              width={64}
              height={64}
              draggable={false}
              style={{ display: 'block' }}
            />
          </BubbleWrapper>
        </Rnd>
      </Dummy>
    );
  }

  // Render the React component into the block
  // Use React 18+ API if available, fallback to ReactDOM.render
  import('react-dom').then((ReactDOM) => {
    if (ReactDOM.createRoot) {
      ReactDOM.createRoot(root).render(<ChatLauncherBubble />);
    } else {
      ReactDOM.render(<ChatLauncherBubble />, root);
    }
  });
}
