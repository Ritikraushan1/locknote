import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useNoteStore } from '../store/useNoteStore';
import { useTheme } from '../theme/useTheme';
import NoteCard from '../components/NoteCard';
import FAB from '../components/FAB';
import CustomAlert from '../components/CustomAlert';
import MainHeader from '../components/MainHeader';
import SideDrawer from '../components/SideDrawer';

export default function HomeScreen({ navigation }) {
    const notes = useNoteStore(state => state.notes);
    const fetchNotes = useNoteStore(state => state.fetchNotes);
    const deleteNote = useNoteStore(state => state.deleteNote);
    const togglePin = useNoteStore(state => state.togglePin);

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const styles = React.useMemo(() => getStyles(colors, insets), [colors, insets]);

    // ✅ Optimized Filtering Logic
    const filteredNotes = React.useMemo(() => {
        const query = searchQuery.toLowerCase();
        return notes.filter((note) => {
            return (
                note.title?.toLowerCase().includes(query) ||
                note.content?.toLowerCase().includes(query) ||
                note.tags?.some((t) => t.toLowerCase().includes(query))
            );
        });
    }, [notes, searchQuery]);

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
            navigation.navigate('Editor', { note });
        }
    }, [selectionMode, navigation, toggleSelection]);

    const handleLongPress = useCallback((note) => {
        if (!selectionMode) {
            setSelectionMode(true);
            setSelectedIds([note.id]);
        }
    }, [selectionMode]);

    const handlePinSelected = async () => {
        for (const id of selectedIds) {
            const note = notes.find((n) => n.id === id);
            await togglePin(id, note.is_pinned === 0);
        }
        setSelectionMode(false);
        setSelectedIds([]);
    };

    const handleDeleteSelected = () => {
        setShowAlert(true);
    };

    const confirmDelete = async () => {
        for (const id of selectedIds) {
            await deleteNote(id);
        }
        setShowAlert(false);
        setSelectionMode(false);
        setSelectedIds([]);
    };

    const cancelSelection = () => {
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
            <SideDrawer
                visible={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onNavigate={(route) => navigation.navigate(route)}
            />

            <MainHeader
                selectionMode={selectionMode}
                selectedCount={selectedIds.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onPinPress={handlePinSelected}
                onDeletePress={handleDeleteSelected}
                onCancelSelection={cancelSelection}
                onMenuPress={() => setIsDrawerOpen(true)}
            />


            <FlashList
                data={filteredNotes}
                renderItem={renderItem}
                estimatedItemSize={100}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {searchQuery ? 'No notes match your search.' : 'No notes yet. Tap + to create one!'}
                        </Text>
                    </View>
                }
            />


            {!selectionMode && <FAB onPress={() => navigation.navigate('Editor')} />}

            <CustomAlert
                visible={showAlert}
                title="Delete Notes?"
                message={`Are you sure you want to delete ${selectedIds.length} selected note(s)? This action cannot be undone.`}
                onCancel={() => setShowAlert(false)}
                onConfirm={confirmDelete}
            />
        </View>
    );
}

const getStyles = (colors, insets) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: Math.max(insets.top, 10), // Ensures it stays below status bar
        },
        listContent: {
            paddingHorizontal: 16,
            paddingBottom: 100, // Extra space to clear the FAB
        },
        emptyContainer: {

            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            paddingHorizontal: 40,
        },
        emptyText: {
            color: colors.subText,
            fontSize: 16,
            textAlign: 'center',
        },
    });