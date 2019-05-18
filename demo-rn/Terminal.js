import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Alert,
  WebView,
  ActivityIndicator,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  terminal: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222CC',
  },
});

export default class Terminal extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.__onMessage = this.__onMessage.bind(this);
    this.state = {
      ready: false,
    };
  }
  __handleAction(type, data) {
    const {
      ready,
    } = this.state;
    // TODO: Where should these constants sit between projects?
    if (type === 'ACTION_TYPE_READY') {
      if (!ready) {
        return new Promise(resolve => this.setState(
          {
            ready: true,
          },
          resolve,
        ));
      }
      return Promise.reject(
        new Error(
          'Terminal is already initialized!',
        ),
      );
    }
    if (!ready) {
      return Promise.reject(
        new Error(
          `Received an action before the Terminal was initialized!`,
        ),
      );
    }
    return Promise.resolve();
  }
  __onMessage(e) {
    const {
      type,
      data,
    } = JSON.parse(e.nativeEvent.data);
    if (!type) {
      return Promise.reject(
        new Error(
          `Received an invalid action. Exepcted truthy type, received "${type}".`,
        ),
      );
    }
    return this.__handleAction(type, data);
  }
  render() {
    const {

    } = this.props;
    const {
      ready,
    } = this.state;
    return (
      <View
        style={styles.container}
      >
        <WebView
          ref="terminal"
          style={styles.container}
          source={{
            html: require('./terminal.min.js')(),
          }}
          originWhitelist={['*']}
          onMessage={this.__onMessage}
        />
        {(!ready) && (
          <View
            style={styles.loading}
          >
            <ActivityIndicator
            />
          </View>
        )}
      </View>
    );
  }
}
