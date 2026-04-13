import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import Icon from '@react-native-vector-icons/ionicons';

export default function AboutScreen({ navigation }) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getStyles(colors, insets);

    const openZunaki = () => {
        Linking.openURL('https://zunaki.in').catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={colors.text} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.text }]}>About NoteLock</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.logoContainer}>
                    <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
                        <Icon name="lock-closed" size={40} color="#fff" />
                    </View>
                    <Text style={[styles.appName, { color: colors.text }]}>NoteLock</Text>
                    <Text style={[styles.appVersion, { color: colors.subText }]}>Version 1.0.0</Text>
                    <Text style={[styles.subTitle, { color: colors.subText }]}>
                        No login. No tracking. Your notes stay on your device.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Description</Text>
                    <Text style={[styles.description, { color: colors.text }]}>
                        Private offline notes app. Lock your notes, no login required. NoteLock is a simple and private notes app built for speed and security.
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.tagBg }]}>
                    <View style={styles.featureItem}>
                        <Icon name="checkmark-circle-outline" size={22} color={colors.primary} />
                        <Text style={[styles.featureText, { color: colors.text }]}>No login required</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="cloud-offline-outline" size={22} color={colors.primary} />
                        <Text style={[styles.featureText, { color: colors.text }]}>Works completely offline</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="lock-closed-outline" size={22} color={colors.primary} />
                        <Text style={[styles.featureText, { color: colors.text }]}>Lock your notes securely</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="flash-outline" size={22} color={colors.primary} />
                        <Text style={[styles.featureText, { color: colors.text }]}>Fast and distraction-free writing</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.description, { color: colors.text }]}>
                        {/* Your notes never leave your device unless you choose to back them up.{"\n\n"} */}
                        Built for people who value privacy and simplicity.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Developer</Text>
                    <Pressable onPress={() => Linking.openURL('https://linkedin.com/in/ritik-raushan-dev')}>
                        <Text style={[styles.description, { color: colors.text }]}>
                            Built with passion by <Text style={[styles.linkText, { color: colors.primary }]}>Ritik Raushan</Text>
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.subText }]}>© 2026 NoteLock Team</Text>
                    
                    <Pressable onPress={() => navigation.navigate('Privacy')} style={styles.privacyButton}>
                        <Text style={[styles.linkText, { color: colors.primary, fontSize: 13 }]}>Privacy Policy</Text>
                    </Pressable>

                    <Pressable onPress={openZunaki} style={styles.creditButton}>
                        <Text style={[styles.footerText, { color: colors.subText }]}>
                            Made with ❤️ by <Text style={[styles.linkText, { color: colors.primary }]}>Zunaki</Text>
                        </Text>
                    </Pressable>
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
        logoContainer: {
            alignItems: 'center',
            marginBottom: 40,
        },
        logoIcon: {
            width: 80,
            height: 80,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
            elevation: 8,
            shadowColor: colors.primary,
            shadowOpacity: 0.3,
            shadowRadius: 10,
        },
        appName: {
            fontSize: 24,
            fontWeight: '800',
        },
        appVersion: {
            fontSize: 14,
            marginTop: 4,
        },
        subTitle: {
            fontSize: 15,
            marginTop: 12,
            textAlign: 'center',
            paddingHorizontal: 20,
            lineHeight: 22,
            opacity: 0.8,
        },
        section: {
            marginBottom: 32,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '700',
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
        },
        description: {
            fontSize: 16,
            lineHeight: 26,
        },

        card: {
            padding: 20,
            borderRadius: 16,
            marginBottom: 40,
        },
        cardTitle: {
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 16,
        },
        featureItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            gap: 12,
        },
        featureText: {
            fontSize: 16,
        },
        footer: {
            alignItems: 'center',
            marginTop: 20,
            paddingBottom: 40,
        },
        footerText: {
            fontSize: 12,
            marginBottom: 4,
        },
        creditButton: {
            marginTop: 4,
        },
        privacyButton: {
            marginVertical: 12,
        },
        linkText: {
            fontWeight: '700',
            textDecorationLine: 'underline',
        },



    });

