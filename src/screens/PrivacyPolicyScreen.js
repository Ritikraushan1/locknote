import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import Icon from '@react-native-vector-icons/ionicons';

export default function PrivacyPolicyScreen({ navigation }) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getStyles(colors, insets);

    const Section = ({ title, content }) => (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>{title}</Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>{content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={colors.text} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Privacy Policy</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.lastUpdated, { color: colors.subText }]}>Last updated: April 13, 2026</Text>

                <Section 
                    title="1. No Data Collection"
                    content="NoteLock is an offline-first application. We do not collect, store, or transmit any of your personal information. We have no access to your notes, tags, or search history."
                />

                <Section 
                    title="2. Local Storage"
                    content="All data you create (notes, tags, and settings) is stored exclusively on your device's internal storage. We do not use cloud storage, external servers, or any multi-device synchronization by default."
                />

                <Section 
                    title="3. Security"
                    content="Your notes are as secure as your device. We recommend using your phone's built-in security features (PIN, fingerprint, or face recognition) to protect your device and the NoteLock app."
                />

                <Section 
                    title="4. No Tracking"
                    content="The app does not use any analytics, trackers, or cookies. We do not monitor how you use the app or what you write."
                />

                <Section 
                    title="5. External Links"
                    content="Our app may contain links to external websites (such as Zunaki.in). Please note that we do not have control over the privacy practices of these external sites."
                />

                <Section 
                    title="6. Contact"
                    content="If you have any questions about this Privacy Policy, please contact us through our website at zunaki.in."
                />

                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.subText }]}>Thank you for trusting NoteLock.</Text>
                </View>
            </ScrollView>
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
        },
        backButton: {
            padding: 4,
            marginRight: 16,
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: '600',
        },
        content: {
            padding: 24,
        },
        lastUpdated: {
            fontSize: 13,
            marginBottom: 24,
            fontStyle: 'italic',
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '700',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        sectionText: {
            fontSize: 15,
            lineHeight: 22,
        },
        footer: {
            marginTop: 40,
            paddingBottom: 40,
            alignItems: 'center',
        },
        footerText: {
            fontSize: 14,
            fontWeight: '500',
        },
    });
