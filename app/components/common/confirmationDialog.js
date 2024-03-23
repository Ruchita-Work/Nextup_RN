import { faCheck, faCheckCircle, faCheckToSlot, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Pressable, View, Dimensions } from 'react-native';
import { Button, Image, Text } from 'react-native-ui-lib';
import { customTheme } from '../../constants';
import { hp, wp } from '../../utils/responsive';
import { appImages } from '../../constants/appImages';

export const ConfirmationDialog = ({
    open, onClose, onConfirm,
    title = "Want to log out?",
    body = "You won’t be able to continue your journey logged out.",
    confirmText = "Yes, log me out",
    cancelText = "No, stay here",
}) => {
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                onRequestClose={() => {
                    onClose(!open);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FontAwesomeIcon icon={faWarning} color={customTheme.colors.secondary} size={40} />
                        <Text style={{
                            color: customTheme.colors.light,
                            fontSize: customTheme.fontSizes.size_16
                        }}>{title ?? ''}</Text>
                        <Text style={{
                            color: customTheme.colors.light,
                            fontSize: customTheme.fontSizes.size_12,
                            opacity: 0.8,
                            textAlign: 'center',
                            marginVertical: customTheme.spacings.spacing_8
                        }}>{body ?? ''}</Text>
                        <Pressable
                            style={{
                                backgroundColor: customTheme.colors.secondary,
                                paddingVertical: customTheme.spacings.spacing_12,
                                borderRadius: customTheme.spacings.spacing_20,
                                width: Dimensions.get('screen').width - customTheme.spacings.spacing_48,
                                marginVertical: customTheme.spacings.spacing_8,


                            }}
                            onPress={onConfirm}
                        >
                            <Text style={{
                                color: customTheme.colors.primary,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontFamily: customTheme.fontFamily.robotoBold
                            }}>{confirmText ?? ''}</Text>

                        </Pressable>
                        <Pressable
                            onPress={onClose}
                            style={{
                                backgroundColor: '#332000',
                                paddingVertical: customTheme.spacings.spacing_12,
                                borderRadius: customTheme.spacings.spacing_20,
                                width: Dimensions.get('screen').width - customTheme.spacings.spacing_48,
                                marginVertical: customTheme.spacings.spacing_8,


                            }}
                        >
                            <Text style={styles.textStyle}>{cancelText ?? ''}</Text>
                        </Pressable>

                    </View>

                </View>
            </Modal>
        </>
    );
};

// COnfirmation Ok dialog

export const RecordingConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Make sure your Camera is in position?",
    body = "You won’t be able to continue your journey logged out.",
    confirmText = "Yes, log me out",
    cancelText = "No, stay here",
}) => {
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                onRequestClose={() => {
                    onClose(!open);
                }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {
                        backgroundColor: '#10141C'
                    }]}>
                        <Image
                            source={appImages.checkCircle}
                            height={hp(8)}
                            width={hp(8)}
                            style={{
                                marginBottom: hp(2.5)
                            }}
                        />
                        <Text large-3xl-600 center white>
                            {
                                title
                            }
                        </Text>
                        <Text center marginT-16 small-x style={{
                            opacity: 0.8
                        }}>
                            Have someone film you or place your camera in a position that can see you and the space
                        </Text>
                        <Button
                            size='large'
                            label='Got It'
                            labelStyle={{
                                fontWeight: 'bold'
                            }}
                            onPress={onConfirm}
                            style={{
                                backgroundColor: '#000533',
                                marginTop: hp(4.5),
                                width: '100%',
                                paddingVertical: hp(2.6),

                            }} />
                    </View>




                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: customTheme.colors.primary,
        borderRadius: 20,
        padding: 35,
        width: Dimensions.get('screen').width - wp(4),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

