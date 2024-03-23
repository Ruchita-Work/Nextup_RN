import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, customTheme } from '../../constants';

const SideBySideBarGraph = ({ pgsData }) => {
  const maxWidth = Math.max(...pgsData.map(el => Math.max(...el.value)));
  return (
    <>
      {pgsData.map((obj, index) => {
        const key = obj.name;
        const leftVal = obj.value[0];
        const rightVal = obj.value[1];
        return (
          <View key={index} style={styles.container}>
            <View style={styles.leftContainer}>
              {leftVal > 0 ? (
                <Text style={styles.leftLabel}>{leftVal}</Text>
              ) : null}
              {leftVal > 0 ? (
                <View
                  style={styles.bar({
                    width: `${80 * Math.pow(leftVal / maxWidth, 2)}%`,
                    color:
                      leftVal >= rightVal ? Colors.compareBar : Colors.emptyBar,
                  })}
                />
              ) : (
                <View
                  style={rightVal === null ? styles.nullBar : styles.blankBar}
                />
              )}
            </View>
            <View style={styles.keyContainer}>
              <Text style={styles.keyText}>{key}</Text>
            </View>

            <View style={styles.rightContainer}>
              {rightVal > 0 ? (
                <View
                  style={styles.bar({
                    width: `${80 * Math.pow(rightVal / maxWidth, 2)}%`,
                    color:
                      rightVal >= leftVal
                        ? Colors.compareRightBar
                        : Colors.emptyBar,
                  })}
                />
              ) : (
                <View
                  style={rightVal === null ? styles.nullBar : styles.blankBar}
                />
              )}
              {rightVal > 0 ? (
                <Text style={styles.rightLabel}>{rightVal}</Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </>
  );
};

export default SideBySideBarGraph;

const styles = StyleSheet.create({
  rightLabel: {
    fontSize: 14,
    color: Colors.compareRightBar,
    paddingLeft: 8,
    fontFamily: Fonts.Bold,
  },
  leftLabel: {
    fontSize: 14,
    color: Colors.compareBar,
    paddingRight: 6,
    fontFamily: Fonts.Bold,
  },
  nullBar: {
    width: '5%',
    backgroundColor: Colors.emptyBar,
    height: 12,
  },
  blankBar: {
    width: '90%',
    backgroundColor: Colors.emptyBar,
    height: 12,
  },
  bar: ({ color, width }) => ({
    width,
    backgroundColor: color,
    height: 12,
    maxWidth: '90%',
  }),
  rightContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  leftContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  keyContainer: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: customTheme.colors.light,
    fontSize: 12,
    fontFamily: Fonts.Bold,
  },
  container: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 3,
  },
});
