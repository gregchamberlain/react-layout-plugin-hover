import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import hoist from 'hoist-non-react-statics';
import { Stack } from 'immutable';
import { withEditLayoutState } from 'react-layout-plugin-edit';

const Wrapper = (WrappedComponent, displayName) => {

  class HoverWrapper extends PureComponent {

    setNode = (node) => {
      this.unlisten(this.node);
      this.listen(node);
      this.node = node;
    }

    listen = (node) => {
      if (node) {
        node.addEventListener('mouseenter', this.onMouseEnter);
        node.addEventListener('mouseleave', this.onMouseLeave);
      }
    }

    unlisten = (node) => {
      if (node) {
        node.removeEventListener('mouseenter', this.onMouseEnter);
        node.removeEventListener('mouseleave', this.onMouseLeave);
      }
    }

    componentWillUnmound() {
      this.unlisten(this.node);
    }

    onMouseEnter = (e) => {
      let layoutState = this.props.layoutState;
      layoutState = layoutState.updateIn(['pluginState', 'hover'], (stack) => {
        if (stack) {
          return stack.push({ key: this.props['data-id'], node: e.target });
        } else {
          return Stack([{ key: this.props['data-id'], node: e.target }]);
        }
      });
      this.props.onChange(layoutState);
    }

    onMouseLeave = (e) => {
      let layoutState = this.props.layoutState;
      layoutState = layoutState.updateIn(['pluginState', 'hover'], (stack) => {
        if (stack) {
          return stack.pop();
        } else {
          return Stack();
        }
      });
      this.props.onChange(layoutState);
    }

    render() {
      const { pseudoRef, layoutState, onChange, ...props } = this.props;
      return (
        <WrappedComponent
          {...props}
          pseudoRef={(instance) => {
            this.setNode(findDOMNode(instance));
            if (typeof pseudoRef === 'function') pseudoRef(instance);
          }}
        />
      );
    }
  }

  hoist(HoverWrapper, WrappedComponent);
  HoverWrapper.displayName = `HoverWrapper(${displayName})`;
  return withEditLayoutState(HoverWrapper);

}

export default Wrapper;