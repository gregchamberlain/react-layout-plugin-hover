import React from 'react';
import { withLayoutState } from 'react-layout-core';

const HoverDisplay = ({ layoutState }) => {
  const stack = layoutState.getIn(['pluginState', 'hover']);
  if (!stack || !stack.first()) return null;
  const bounds = stack.first().node.getBoundingClientRect();
  const type = layoutState.getIn(['itemMap', stack.last().key, 'type']);
  return (
    <div style={{
      position: 'fixed',
      outline: '1px solid #35b5e5',
      outlineOffset: -1,
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
      pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 2,
        backgroundColor: '#35b5e5'
      }}>{type}</div>
    </div>
  );
};

export default withLayoutState(HoverDisplay);