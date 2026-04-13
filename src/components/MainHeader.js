import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useTheme } from '../theme/useTheme';

const MainHeader = ({
    selectionMode,
    selectedCount,
    searchQuery,
    onSearchChange,
    onPinPress,
    onDeletePress,
    onCancelSelection,
    onMenuPress,
}) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);

    if (selectionMode) {
        return (
            <View style={[styles.container, styles.selectionContainer]}>
                <View style={styles.leftSection}>
                    <Pressable onPress={onCancelSelection} style={styles.iconButton}>
                        <Icon name="close" size={24} color={colors.text} />
                    </Pressable>
                    <Text style={[styles.selectionText, { color: colors.text }]}>
                        {selectedCount} selected
                    </Text>
                </View>

                <View style={styles.rightSection}>
                    <Pressable onPress={onPinPress} style={styles.iconButton}>
                        <Icon name="push-outline" size={24} color={colors.primary} />
                    </Pressable>
                    <Pressable onPress={onDeletePress} style={styles.iconButton}>
                        <Icon name="trash-outline" size={24} color="#FF3B30" />
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onMenuPress} style={styles.iconButton}>
                <Icon name="menu-outline" size={26} color={colors.text} />
            </Pressable>

            <View style={[styles.searchBar, { backgroundColor: colors.tagBg }]}>
                <Icon name="search-outline" size={20} color={colors.subText} style={styles.searchIcon} />
                <TextInput
                    placeholder="Search notes..."
                    placeholderTextColor={colors.subText}
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    style={[styles.searchInput, { color: colors.text }]}
                />
                {searchQuery.length > 0 && (
                    <Pressable onPress={() => onSearchChange('')}>
                        <Icon name="close-circle" size={18} color={colors.subText} />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 10,
            gap: 12,
        },
        selectionContainer: {
            justifyContent: 'space-between',
        },
        leftSection: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        rightSection: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
        },
        iconButton: {
            padding: 4,
        },
        selectionText: {
            fontSize: 18,
            fontWeight: '600',
        },
        searchBar: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            height: 44,
            borderRadius: 12,
            paddingHorizontal: 12,
        },
        searchIcon: {
            marginRight: 8,
        },
        searchInput: {
            flex: 1,
            fontSize: 16,
            height: '100%',
        },
    });

export default MainHeader;
