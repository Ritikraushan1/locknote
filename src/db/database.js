import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
    return SQLite.openDatabase({ name: 'notes.db', location: 'default' });
};

export const createTable = async (db) => {
    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS notes (
            id TEXT PRIMARY KEY,
            title TEXT,
            content TEXT,
            created_at INTEGER,
            updated_at INTEGER,
            is_deleted INTEGER DEFAULT 0,
            is_pinned INTEGER DEFAULT 0
        );
    `);


    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS tags (
            id TEXT PRIMARY KEY,
            name TEXT UNIQUE
        );
    `);

    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS note_tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            note_id TEXT,
            tag_id TEXT
        );
    `);
};