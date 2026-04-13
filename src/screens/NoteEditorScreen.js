import React, { useState, useLayoutEffect, useEffect, useCallback, useMemo } from 'react';
import {
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    Text,
} from 'react-native';
import { useTheme } from '../theme/useTheme';
import { useNoteStore } from '../store/useNoteStore';
import TagItem from '../components/TagItem';
import HeaderButton from '../components/HeaderButton';

export default function NoteEditorScreen({ route, navigation }) {
    const { colors } = useTheme();
    const addNote = useNoteStore(state => state.addNote);
    const updateNote = useNoteStore(state => state.updateNote);
    const allTags = useNoteStore(state => state.tags);
    const fetchTags = useNoteStore(state => state.fetchTags);

    const existingNote = route.params?.note;

    const [title, setTitle] = useState(existingNote?.title || '');
    const [content, setContent] = useState(existingNote?.content || '');
    const [tagInput, setTagInput] = useState('');
    const [selectedTags, setSelectedTags] = useState(existingNote?.tags || []);

    const styles = useMemo(() => getStyles(colors), [colors]);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    // ✅ Suggestions Logic: Filter allTags based on tagInput
    const suggestions = useMemo(() => {
        const query = tagInput.trim().toLowerCase();
        if (!query) return [];
        return allTags
            ?.map(t => t.name)
            .filter(name => 
                name.toLowerCase().includes(query) && 
                !selectedTags.includes(name)
            ) || [];
    }, [tagInput, allTags, selectedTags]);

    const addTag = useCallback((tagToUse) => {
        const tag = (typeof tagToUse === 'string' ? tagToUse : tagInput).trim();
        if (!tag) return;
        if (!selectedTags.includes(tag)) {
            setSelectedTags(prev => [...prev, tag]);
        }
        setTagInput('');
    }, [tagInput, selectedTags]);

    const removeTag = useCallback((tag) => {
        setSelectedTags(prev => prev.filter((t) => t !== tag));
    }, []);

    const handleSave = useCallback(async () => {
        if (!title.trim() && !content.trim()) {
            navigation.goBack();
            return;
        }

        const timestamp = Date.now();

        if (existingNote) {
            await updateNote(
                {
                    ...existingNote,
                    title,
                    content,
                    updated_at: timestamp,
                },
                selectedTags
            );
        } else {
            await addNote(
                {
                    id: timestamp.toString(),
                    title,
                    content,
                    created_at: timestamp,
                    updated_at: timestamp,
                },
                selectedTags
            );
        }
        navigation.goBack();
    }, [title, content, selectedTags, existingNote, updateNote, addNote, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton
                    label="Save"
                    onPress={handleSave}
                />
            ),
        });
    }, [navigation, handleSave]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TextInput
                placeholder="Title"
                placeholderTextColor={colors.subText}
                value={title}
                onChangeText={setTitle}
                style={styles.titleInput}
            />

            {/* SELECTED TAGS AREA: Wrapping section for active tags */}
            {selectedTags.length > 0 && (
                <View style={styles.selectedTagsContainer}>
                    {selectedTags.map((tag, index) => (
                        <TagItem
                            key={`selected-${index}`}
                            name={tag}
                            isSelected
                            onPress={() => removeTag(tag)}
                        />
                    ))}
                </View>
            )}

            <TextInput
                placeholder="Add tag..."
                placeholderTextColor={colors.subText}
                value={tagInput}
                onChangeText={setTagInput}
                onSubmitEditing={() => addTag()}
                style={styles.tagInput}
            />

            {/* SUGGESTIONS BAR: Horizontal scroll for existing tag matches */}
            {suggestions.length > 0 && (
                <View style={styles.suggestionsWrapper}>
                    <Text style={[styles.suggestionLabel, { color: colors.subText }]}>Suggestions:</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.suggestionsContainer}
                    >
                        {suggestions.map((tag, index) => (
                            <TagItem
                                key={`suggest-${index}`}
                                name={tag}
                                onPress={() => addTag(tag)}
                                style={styles.suggestionItem}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}

            <TextInput
                placeholder="Start writing..."
                placeholderTextColor={colors.subText}
                value={content}
                onChangeText={setContent}
                style={styles.contentInput}
                multiline
                textAlignVertical="top"
            />
        </KeyboardAvoidingView>
    );
}

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 16,
        },
        titleInput: {
            fontSize: 22,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 10,
        },
        selectedTagsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6,
            marginBottom: 12,
        },
        tagInput: {
            borderBottomWidth: 1,
            borderColor: colors.border,
            color: colors.text,
            marginBottom: 8,
            paddingVertical: 6,
            fontSize: 14,
        },
        suggestionsWrapper: {
            marginBottom: 16,
        },
        suggestionLabel: {
            fontSize: 10,
            textTransform: 'uppercase',
            fontWeight: '700',
            marginBottom: 6,
            marginLeft: 2,
        },
        suggestionsContainer: {
            paddingRight: 16,
            gap: 8,
        },
        suggestionItem: {
            marginRight: 0,
        },
        contentInput: {
            flex: 1,
            fontSize: 16,
            color: colors.text,
            lineHeight: 24,
            paddingTop: 10,
        },
    });