import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';
import { formatDate, formatTime } from '../utils/calculations';

/**
 * History card component for displaying completed workout
 * @param {Object} props - Component props
 */
const HistoryCard = ({ workout }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={32} color={COLORS.success} />
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{workout.name}</Text>
                <Text style={styles.date}>
                    {formatDate(workout.completedAt)} • {formatTime(workout.completedAt)}
                </Text>

                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statIcon}>⏱️</Text>
                        <Text style={styles.statText}>{workout.duration} min</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statIcon}>🔥</Text>
                        <Text style={styles.statText}>{workout.calories} cal</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        ...SHADOWS.sm,
    },
    iconContainer: {
        marginRight: SPACING.md,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '600',
        color: COLORS.light.text,
        marginBottom: SPACING.xs,
    },
    date: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.textSecondary,
        marginBottom: SPACING.sm,
    },
    stats: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statIcon: {
        fontSize: 14,
    },
    statText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.textSecondary,
        fontWeight: '500',
    },
});

export default HistoryCard;
