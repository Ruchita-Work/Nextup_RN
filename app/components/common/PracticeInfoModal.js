import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { customTheme } from '../../constants';
import { Button, Text } from 'react-native-ui-lib';
import { hp, wp } from '../../utils/responsive';
import { appImages } from '../../constants/appImages';

const PracticeInfoModal = ({
  isVisible,
  buttons = [],
  title,
  description,
  setIsVisible,
}) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setIsVisible(false)}
        style={styles.backdrop}>
        <View style={styles.modalView}>
          <Image source={appImages.checkCircle} style={styles.image} />
          <Text large-xl-600 style={styles.title}>
            {title}
          </Text>
          <Text regular-400 center style={styles.description}>
            {description}
          </Text>
          {buttons.map(button => {
            return (
              <Button
                label={button?.title}
                key={button.title}
                style={styles.positionButton(button)}
                onPress={button?.onPress}
              />
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PracticeInfoModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: customTheme.colors.overlayDark,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  modalView: {
    backgroundColor: customTheme.colors.neutral,
    borderRadius: wp(5),
    padding: wp(5),
    alignItems: 'center',
  },
  positionButton: item => ({
    width: '100%',
    marginBottom: wp(5),
    backgroundColor: item?.color,
  }),
  title: { marginVertical: hp(1.5) },
  description: { marginBottom: hp(4) },
  image: { height: wp(12), width: wp(12) },
});
