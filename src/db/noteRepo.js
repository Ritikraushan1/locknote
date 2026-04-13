import { getDBConnection } from './database';

//
// ✅ GET NOTES WITH TAGS
//
export const getNotes = async () => {
    const db = await getDBConnection();

    const results = await db.executeSql(`
        SELECT 
            n.*,
            GROUP_CONCAT(t.name) as tags
        FROM notes n
        LEFT JOIN note_tags nt ON n.id = nt.note_id
        LEFT JOIN tags t ON nt.tag_id = t.id
        WHERE n.is_deleted = 0
        GROUP BY n.id
        ORDER BY n.is_pinned DESC, n.updated_at DESC
    `);

    const raw = results[0].rows.raw();

    // 👉 convert "tag1,tag2" → array
    return raw.map(note => ({
        ...note,
        tags: note.tags ? note.tags.split(',') : [],
    }));
};

//
// ✅ ADD NOTE + TAGS
//
export const addNote = async (note, tags = []) => {
    const db = await getDBConnection();

    await db.executeSql(
        `INSERT INTO notes (id, title, content, created_at, updated_at, is_pinned)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [note.id, note.title, note.content, note.created_at, note.updated_at, note.is_pinned || 0]
    );

    await saveTagsForNote(db, note.id, tags);
};

//
// ✅ UPDATE NOTE + TAGS
//
export const updateNote = async (note, tags = []) => {
    const db = await getDBConnection();

    await db.executeSql(
        `UPDATE notes
         SET title = ?, content = ?, updated_at = ?
         WHERE id = ?`,
        [note.title, note.content, note.updated_at, note.id]
    );

    // 🔥 Reset tags and re-insert
    await db.executeSql(`DELETE FROM note_tags WHERE note_id = ?`, [note.id]);

    await saveTagsForNote(db, note.id, tags);
};

//
// ✅ DELETE NOTE (soft delete)
//
export const deleteNote = async (id) => {
    const db = await getDBConnection();

    await db.executeSql(
        'UPDATE notes SET is_deleted = 1 WHERE id = ?',
        [id]
    );
};

//
// 🔥 CORE LOGIC: SAVE TAGS
//
const saveTagsForNote = async (db, noteId, tags) => {
    for (let tagName of tags) {
        let tagId;

        // 1️⃣ Check if tag exists
        const res = await db.executeSql(
            'SELECT id FROM tags WHERE name = ?',
            [tagName]
        );

        if (res[0].rows.length > 0) {
            tagId = res[0].rows.item(0).id;
        } else {
            // 2️⃣ Create new tag
            tagId = Date.now().toString() + Math.random();

            await db.executeSql(
                'INSERT INTO tags (id, name) VALUES (?, ?)',
                [tagId, tagName]
            );
        }

        // 3️⃣ Link note ↔ tag
        await db.executeSql(
            'INSERT INTO note_tags (note_id, tag_id) VALUES (?, ?)',
            [noteId, tagId]
        );
    }
};

export const getAllTags = async () => {
    const db = await getDBConnection();
    const res = await db.executeSql('SELECT * FROM tags');
    return res[0].rows.raw();
};

export const togglePin = async (id, isPinned) => {
    const db = await getDBConnection();
    await db.executeSql(
        'UPDATE notes SET is_pinned = ? WHERE id = ?',
        [isPinned ? 1 : 0, id]
    );
};

export const getDeletedNotes = async () => {
    const db = await getDBConnection();
    const results = await db.executeSql(`
        SELECT 
            n.*,
            GROUP_CONCAT(t.name) as tags
        FROM notes n
        LEFT JOIN note_tags nt ON n.id = nt.note_id
        LEFT JOIN tags t ON nt.tag_id = t.id
        WHERE n.is_deleted = 1
        GROUP BY n.id
        ORDER BY n.updated_at DESC
    `);

    const raw = results[0].rows.raw();
    return raw.map(note => ({
        ...note,
        tags: note.tags ? note.tags.split(',') : [],
    }));
};

export const restoreNote = async (id) => {
    const db = await getDBConnection();
    await db.executeSql(
        'UPDATE notes SET is_deleted = 0 WHERE id = ?',
        [id]
    );
};

export const hardDeleteNote = async (id) => {
    const db = await getDBConnection();
    await db.executeSql('DELETE FROM notes WHERE id = ?', [id]);
    await db.executeSql('DELETE FROM note_tags WHERE note_id = ?', [id]);
};