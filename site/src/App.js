// @flow
import React, { PureComponent } from 'react';
import { LayoutProvider, RootLayout, LayoutState } from 'react-layout-core';
import EditPlugin from 'react-layout-plugin-edit';
import RefsPlugin from 'react-layout-plugin-refs';
import HoverPlugin, { HoverDisplay } from '../../src';

const createStyle = (color) => ({
  padding: 15,
  backgroundColor: color
});

const items = {
  root: { key: 'root', type: 'div', props: { style: createStyle('red') }, children: [{ key: 'a' }, { key: 'b' }] },
  a: { key: 'a', type: 'div', props: { style: createStyle('blue') }, parent: 'root'  },
  b: { key: 'b', type: 'div', props: { style: createStyle('green') }, parent: 'root'  },
};

type Props = {};

type State = {
  layoutState: LayoutState
};

class App extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      layoutState: LayoutState.fromRaw(items)
    };
  }

  onLayoutChange = (layoutState: LayoutState) => {
    this.setState({ layoutState });
  }

  render() {
    return (
      <LayoutProvider
        layoutState={this.state.layoutState}
        plugins={[EditPlugin, RefsPlugin, HoverPlugin]}
        onChange={this.onLayoutChange}
      >
        <div>
          <RootLayout />
          <HoverDisplay />
        </div>
      </LayoutProvider>
    );
  }
}

export default App;
