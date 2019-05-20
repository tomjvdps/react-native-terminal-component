import React from 'react';
// TODO: This is an antipattern.
import Terminal from './../';

export default class App extends React.Component {
  render() {
    // XXX: Check out Terminal's defaultProps for custom usage.
    return (
      <Terminal
        style={{
          flex: 1,
        }}
      />
    );
  }
}
