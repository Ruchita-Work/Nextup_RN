import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-ui-lib';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { customTheme } from '../constants';

class AppLoader extends React.Component {
  render() {
    const { onRequestClose, type, visible, loadingMessage } = this.props;
    return (
      <Modal
        animated
        animationType={'fade'}
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
        {...this.props}>
        <View style={styles.container}>
          <ActivityIndicator
            animating
            size={30}
            color={customTheme.colors.light}
          />
          <Text white>{loadingMessage ?? 'Loading...'} </Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppLoader.propTypes = {
  onRequestClose: PropTypes.func,
};

AppLoader.defaultProps = {
  onRequestClose: () => { },
};

export default AppLoader;
