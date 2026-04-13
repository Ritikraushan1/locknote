import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    Animated,
    Dimensions,
    Linking,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useTheme } from '../theme/useTheme';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

const SideDrawer = ({ visible, onClose, onNavigate }) => {
    const { colors } = useTheme();
    const styles = getStyles(colors);

    // Simple fade-in for overlay
    const [overlayOpacity] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        if (visible) {
            Animated.timing(overlayOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(overlayOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const handleFeedback = () => {
        const url = 'https://play.google.com/store/apps/details?id=com.locknote';
        Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    };

    const MenuItem = ({ icon, label, onPress, color }) => (
        <Pressable
            style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: colors.tagBg },
            ]}
            onPress={onPress}
        >
            <Icon name={icon} size={22} color={color || colors.text} />
            <Text style={[styles.menuText, { color: colors.text }]}>{label}</Text>
        </Pressable>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* OVERLAY */}
                <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
                    <Pressable style={styles.absoluteFull} onPress={onClose} />
                </Animated.View>

                {/* DRAWER CONTENT */}
                <Animated.View style={[styles.drawer, { backgroundColor: colors.card }]}>
                    <View style={styles.header}>
                        <Text style={[styles.headerTitle, { color: colors.primary }]}>NoteLock</Text>
                        <Text style={[styles.headerSub, { color: colors.subText }]}>Secure your thoughts</Text>
                    </View>

                    <View style={styles.menuList}>
                        <MenuItem
                            icon="document-text-outline"
                            label="All Notes"
                            onPress={() => {
                                onNavigate('Home');
                                onClose();
                            }}
                        />
                        <MenuItem
                            icon="trash-outline"
                            label="Note Bin"
                            onPress={() => {
                                onNavigate('Trash');
                                onClose();
                            }}
                        />
                        <View style={styles.divider} />
                        <MenuItem
                            icon="information-circle-outline"
                            label="About NoteLock"
                            onPress={() => {
                                onNavigate('About');
                                onClose();
                            }}
                        />
                        <MenuItem
                            icon="shield-outline"
                            label="Privacy Policy"
                            onPress={() => {
                                onNavigate('Privacy');
                                onClose();
                            }}
                        />
                        <MenuItem
                            icon="star-outline"
                            label="Rate NoteLock"
                            onPress={() => {
                                handleFeedback();
                                onClose();
                            }}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.versionText, { color: colors.subText }]}>v1.0.0</Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};



const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
        },
        absoluteFull: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        drawer: {
            width: DRAWER_WIDTH,
            height: '100%',
            paddingTop: 60,
            paddingHorizontal: 20,
            elevation: 16,
            shadowColor: '#000',
            shadowOffset: { width: 4, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
        },
        header: {
            marginBottom: 40,
        },
        headerTitle: {
            fontSize: 28,
            fontWeight: '800',
            letterSpacing: -0.5,
        },
        headerSub: {
            fontSize: 14,
            marginTop: 4,
        },
        menuList: {
            flex: 1,
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: 12,
            marginBottom: 4,
        },
        menuText: {
            fontSize: 16,
            fontWeight: '500',
            marginLeft: 16,
        },
        divider: {
            height: 1,
            backgroundColor: colors.border,
            marginVertical: 16,
            marginHorizontal: 12,
        },
        footer: {
            paddingBottom: 20,
            alignItems: 'center',
        },
        versionText: {
            fontSize: 12,
        },
    });

export default SideDrawer;
