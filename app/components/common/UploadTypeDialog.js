import React from 'react';
import { ActionSheet } from 'react-native-ui-lib';

export default function UpdloadTypeDialog({
  isVisible,
  onClose,
  handlePick,
  handleScan,
}) {
  return (
    <ActionSheet
      title={'Choose an option'}
      cancelButtonIndex={3}
      useNativeIOS
      destructiveButtonIndex={3}
      visible={isVisible}
      onDismiss={onClose}
      options={[
        { label: 'Open Camera', onPress: () => handleScan() },
        { label: 'Open Gallery', onPress: () => handlePick() },
        { label: 'Cancel', onPress: () => console.log('cancel') },
      ]}
    />
  );
}
