import { Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { customTheme } from '../../constants';
import { Button } from 'react-native-ui-lib';
import { wp } from '../../utils/responsive';

const positionArray = [
  {
    id: '0',
    title: 'Forward',
    color: customTheme.colors.royalblue,
  },
  {
    id: '1',
    title: 'Center',
    color: customTheme.colors.yellow,
  },
  {
    id: '2',
    title: 'Gaurd',
    color: customTheme.colors.darkRed,
  },
];

const SelectPlayerPositionModal = ({ onPressPositionHandler, visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalMainView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{'Assign Player Position'}</Text>
          <Text style={styles.description}>
            {'You’ve added this player to your team, what is their position?'}
          </Text>
          {positionArray.map(item => {
            return (
              <Button
                label={item?.title}
                key={item.title}
                style={styles.positionButton(item)}
                onPress={() => onPressPositionHandler(item)}
              />
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default SelectPlayerPositionModal;

const styles = StyleSheet.create({
  positionButton: item => ({
    width: '100%',
    marginBottom: wp(5),
    backgroundColor: item?.color,
  }),
  modalMainView: {
    flex: 1,
    backgroundColor: customTheme.colors.overlayDark,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  modalView: {
    backgroundColor: customTheme.colors.neutral,
    borderRadius: 20,
    padding: wp(5),
    alignItems: 'center',
  },
  title: {
    color: customTheme.colors.white,
    fontSize: customTheme.fontSizes.size_22,
    fontWeight: '600',
  },
  description: {
    color: customTheme.colors.white,
    fontSize: customTheme.fontSizes.size_16,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: wp(5),
  },
});
