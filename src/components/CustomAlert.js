import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
} from 'react-native';
import { useTheme } from '../theme/useTheme';

const { width } = Dimensions.get('window');

const CustomAlert = ({ visible, title, message, onCancel, onConfirm, confirmText = 'Delete', type = 'destruct' }) => {
    const { colors } = useTheme();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={[styles.alertBox, { backgroundColor: colors.card }]}>
                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                    <Text style={[styles.message, { color: colors.subText }]}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
                            onPress={onCancel}
                        >
                            <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.button,
                                styles.confirmButton,
                                { backgroundColor: type === 'destruct' ? '#FF3B30' : colors.primary }
                            ]}
                            onPress={onConfirm}
                        >
                            <Text style={[styles.buttonText, { color: '#fff' }]}>{confirmText}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    alertBox: {
        width: width * 0.85,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        borderWidth: 1,
    },
    confirmButton: {
        // dynamic backgroundColor
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CustomAlert;
