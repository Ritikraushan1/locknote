import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useTheme } from '../theme/useTheme';

const FAB = ({ onPress, icon = 'add' }) => {
    const { colors } = useTheme();

    return (
        <Pressable
            style={[styles.fab, { backgroundColor: colors.primary }]}
            onPress={onPress}
        >
            <Icon name={icon} size={28} color="#fff" />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default FAB;
