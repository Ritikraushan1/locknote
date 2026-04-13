import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import { getDBConnection, createTable } from './src/db/database';

export default function App() {
  useEffect(() => {
    const initDB = async () => {
      const db = await getDBConnection();
      await createTable(db);
    };
    initDB();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}