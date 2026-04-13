import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import Icon from '@react-native-vector-icons/ionicons';
import { useTheme } from '../theme/useTheme';
import TagItem from './TagItem';

const NoteCard = React.memo(({ note, onPress, onLongPress, isSelected }) => {
    const { colors } = useTheme();
    const styles = React.useMemo(() => getStyles(colors, isSelected), [colors, isSelected]);

    return (
        <View style={styles.itemContainer}>
            <Pressable
                style={styles.card}
                onPress={() => onPress(note)}
                onLongPress={() => onLongPress(note)}
            >
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={1}>
                        {note.title || 'Untitled'}
                    </Text>
                    {note.is_pinned === 1 && (
                        <Icon name="push-outline" size={16} color={colors.primary} style={styles.pinIcon} />
                    )}
                </View>

                <Text style={styles.content} numberOfLines={2}>
                    {note.content}
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.date}>
                        {dayjs(note.updated_at).format('DD MMM YYYY')}
                    </Text>

                    <View style={styles.tagsContainer}>
                        {note.tags?.map((tag, index) => (
                            <TagItem key={index} name={tag} />
                        ))}
                    </View>
                </View>
            </Pressable>
        </View>
    );
});


const getStyles = (colors, isSelected) =>
    StyleSheet.create({
        itemContainer: {
            marginBottom: 10,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: isSelected ? 2 : 0,
            borderColor: colors.primary,
        },
        card: {
            backgroundColor: isSelected ? (colors.primary + '15') : colors.card, // 15 is hex for ~8% opacity
            padding: 14,
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        pinIcon: {
            transform: [{ rotate: '45deg' }],
        },
        title: {
            flex: 1,
            fontSize: 16,
            fontWeight: '600',
            color: colors.text,
        },
        content: {
            fontSize: 13,
            color: colors.subText,
            marginTop: 4,
        },
        footer: {
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        date: {
            fontSize: 11,
            color: colors.subText,
        },
        tagsContainer: {
            flexDirection: 'row',
            gap: 6,
        },
    });


export default NoteCard;
