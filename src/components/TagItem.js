import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/useTheme';

const TagItem = React.memo(({ name, isSelected, onPress, style }) => {
    const { colors } = useTheme();

    const Content = (
        <View
            style={[
                styles.tag,
                {
                    backgroundColor: isSelected ? colors.primary : colors.tagBg,
                },
                style,
            ]}
        >
            <Text
                style={[
                    styles.tagText,
                    {
                        color: isSelected ? '#fff' : colors.tagText,
                    },
                ]}
            >
                {name}
            </Text>
        </View>
    );

    if (onPress) {
        return <Pressable onPress={onPress}>{Content}</Pressable>;
    }

    return Content;
});


const styles = StyleSheet.create({
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '500',
    },
});

export default TagItem;
