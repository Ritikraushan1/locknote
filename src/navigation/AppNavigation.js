import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/useTheme';

import HomeScreen from '../screens/HomeScreen';
import NoteEditorScreen from '../screens/NoteEditorScreen';
import TrashScreen from '../screens/TrashScreen';
import AboutScreen from '../screens/AboutScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const { isDark, colors } = useTheme();

    const MyTheme = {
        ...(isDark ? DarkTheme : DefaultTheme),
        colors: {
            ...(isDark ? DarkTheme : DefaultTheme).colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.card,
            text: colors.text,
            border: colors.border,
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={colors.card}
            />
            <Stack.Navigator
                screenOptions={{
                    headerTitleStyle: {
                        fontWeight: '600',
                    },
                    headerStyle: {
                        backgroundColor: colors.card,
                    },
                    headerTintColor: colors.text,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Editor"
                    component={NoteEditorScreen}
                    options={{ title: 'New Note' }}
                />

                <Stack.Screen
                    name="Trash"
                    component={TrashScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="About"
                    component={AboutScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Privacy"
                    component={PrivacyPolicyScreen}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}