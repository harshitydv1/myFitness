import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';

/**
 * Stat card component for displaying statistics
 * @param {Object} props - Component props
 */
const StatCard = ({
    icon,
    iconColor = '#ffffff',
    value,
    label,
    gradientColors = ['#6366f1', '#8b5cf6'],
    style = {},
}) => {
    return (
        <View style={[styles.container, style]}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={28} color={iconColor} />
                </View>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.label}>{label}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.md,
    },
    gradient: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        minHeight: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: SPACING.xs,
    },
    value: {
        fontSize: FONT_SIZES['3xl'],
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: SPACING.xs,
    },
    label: {
        fontSize: FONT_SIZES.sm,
        color: '#e0e7ff',
        textAlign: 'center',
    },
});

export default StatCard;
