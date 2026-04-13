import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useNoteStore } from '../store/useNoteStore';
import { useTheme } from '../theme/useTheme';
import NoteCard from '../components/NoteCard';
import Icon from '@react-native-vector-icons/ionicons';
import CustomAlert from '../components/CustomAlert';

export default function TrashScreen({ navigation }) {
    const deletedNotes = useNoteStore(state => state.deletedNotes);
    const fetchDeletedNotes = useNoteStore(state => state.fetchDeletedNotes);
    const restoreNote = useNoteStore(state => state.restoreNote);
    const permanentlyDeleteNote = useNoteStore(state => state.permanentlyDeleteNote);

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchDeletedNotes();
    }, [fetchDeletedNotes]);

    const styles = React.useMemo(() => getStyles(colors, insets), [colors, insets]);

    const toggleSelection = useCallback((id) => {
        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                const next = prev.filter((i) => i !== id);
                if (next.length === 0) setSelectionMode(false);
                return next;
            } else {
                return [...prev, id];
            }
        });
    }, []);

    const handlePress = useCallback((note) => {
        if (selectionMode) {
            toggleSelection(note.id);
        } else {
            // In trash, press acts as selection to encourage use-case (restoring)
            setSelectionMode(true);
            setSelectedIds([note.id]);
        }
    }, [selectionMode, toggleSelection]);

    const handleLongPress = useCallback((note) => {
        if (!selectionMode) {
            setSelectionMode(true);
            setSelectedIds([note.id]);
        }
    }, [selectionMode]);

    const handleRestoreSelected = async () => {
        for (const id of selectedIds) {
            await restoreNote(id);
        }
        setSelectionMode(false);
        setSelectedIds([]);
    };

    const handleDeleteSelected = () => {
        setShowAlert(true);
    };

    const confirmPermanentDelete = async () => {
        for (const id of selectedIds) {
            await permanentlyDeleteNote(id);
        }
        setShowAlert(false);
        setSelectionMode(false);
        setSelectedIds([]);
    };

    const renderItem = useCallback(({ item }) => (
        <NoteCard
            note={item}
            onPress={handlePress}
            onLongPress={handleLongPress}
            isSelected={selectedIds.includes(item.id)}
        />
    ), [handlePress, handleLongPress, selectedIds]);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => selectionMode ? setSelectionMode(false) : navigation.goBack()}
                    style={styles.iconButton}
                >
                    <Icon name={selectionMode ? "close" : "arrow-back"} size={24} color={colors.text} />
                </Pressable>
                
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                    {selectionMode ? `${selectedIds.length} selected` : 'Note Bin'}
                </Text>

                {selectionMode && (
                    <View style={styles.actions}>
                        <Pressable onPress={handleRestoreSelected} style={styles.iconButton}>
                            <Icon name="refresh-outline" size={24} color={colors.primary} />
                        </Pressable>
                        <Pressable onPress={handleDeleteSelected} style={styles.iconButton}>
                            <Icon name="trash-outline" size={24} color="#FF3B30" />
                        </Pressable>
                    </View>
                )}
            </View>

            <View style={styles.listContainer}>
                <FlashList
                    data={deletedNotes}
                    renderItem={renderItem}
                    estimatedItemSize={100}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={

                        <View style={styles.emptyContainer}>
                            <Icon name="trash-outline" size={60} color={colors.tagBg} />
                            <Text style={[styles.emptyText, { color: colors.subText }]}>
                                Your note bin is empty.
                            </Text>
                        </View>
                    }
                />
            </View>

            <CustomAlert
                visible={showAlert}
                title="Permanently Delete?"
                message="Are you sure? This note will be gone forever and cannot be recovered."
                confirmText="Burn"
                onCancel={() => setShowAlert(false)}
                onConfirm={confirmPermanentDelete}
            />
        </View>
    );
}

const getStyles = (colors, insets) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: insets.top,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            height: 60,
        },
        iconButton: {
            padding: 8,
        },
        headerTitle: {
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            marginLeft: 8,
        },
        actions: {
            flexDirection: 'row',
            gap: 16,
        },
        listContainer: {
            flex: 1,
        },
        listContent: {
            paddingHorizontal: 16,
            paddingBottom: 40,
        },
        emptyContainer: {

            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 150,
        },
        emptyText: {
            fontSize: 16,
            marginTop: 16,
        },
    });

