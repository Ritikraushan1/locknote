import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

const HeaderButton = ({ onPress, label, color }) => {
    const { colors } = useTheme();

    return (
        <Pressable onPress={onPress}>
            <Text
                style={[
                    styles.text,
                    { color: color || colors.primary },
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default HeaderButton;
