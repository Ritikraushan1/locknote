import { create } from 'zustand';
import * as repo from '../db/noteRepo';

export const useNoteStore = create((set) => ({
    notes: [],
    deletedNotes: [], // ✅ for Note Bin
    tags: [],

    // ✅ Fetch notes
    fetchNotes: async () => {
        const data = await repo.getNotes();
        set({ notes: data });
    },

    // ✅ Fetch Deleted
    fetchDeletedNotes: async () => {
        const data = await repo.getDeletedNotes();
        set({ deletedNotes: data });
    },

    // ✅ Restore
    restoreNote: async (id) => {
        await repo.restoreNote(id);
        const notes = await repo.getNotes();
        const deleted = await repo.getDeletedNotes();
        set({ notes, deletedNotes: deleted });
    },

    // ✅ Permanent Delete
    permanentlyDeleteNote: async (id) => {
        await repo.hardDeleteNote(id);
        const deleted = await repo.getDeletedNotes();
        set({ deletedNotes: deleted });
    },

    // ✅ Fetch all tags
    fetchTags: async () => {
        const data = await repo.getAllTags();
        set({ tags: data });
    },

    // ✅ Add note with tags
    addNote: async (note, tags = []) => {
        await repo.addNote(note, tags);

        set((state) => ({
            notes: [{ ...note, tags }, ...state.notes],
        }));
    },

    // ✅ Update note with tags
    updateNote: async (note, tags = []) => {
        await repo.updateNote(note, tags);

        set((state) => ({
            notes: state.notes.map((n) =>
                n.id === note.id ? { ...note, tags } : n
            ),
        }));
    },

    // ✅ Toggle Pin
    togglePin: async (id, isPinned) => {
        await repo.togglePin(id, isPinned);

        set((state) => {
            const updatedNotes = state.notes.map((n) =>
                n.id === id ? { ...n, is_pinned: isPinned ? 1 : 0 } : n
            );

            // Re-sort: pinned first, then updated_at
            const sortedNotes = updatedNotes.sort((a, b) => {
                if (a.is_pinned !== b.is_pinned) {
                    return b.is_pinned - a.is_pinned;
                }
                return b.updated_at - a.updated_at;
            });

            return { notes: sortedNotes };
        });
    },

    // ✅ Delete note
    deleteNote: async (id) => {
        await repo.deleteNote(id);

        set((state) => ({
            notes: state.notes.filter((n) => n.id !== id),
        }));
    },
}));