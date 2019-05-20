import React from 'react';
// TODO: This is an antipattern.
import Terminal from './Terminal';

export default class App extends React.Component {
  render() {
    return (
      <Terminal
        style={{
          flex: 1,
        }}
      />
    );
  }
}
