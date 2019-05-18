import React from 'react';
import {StyleSheet, WebView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <WebView
        style={styles.container}
        source={{
          html: require('./terminal.min.js'),
        }}
        originWhitelist={['*']}
      />
    );
  }
}
