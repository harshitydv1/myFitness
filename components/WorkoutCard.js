import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';
import { DIFFICULTY_COLORS } from '../constants/theme';

/**
 * Workout card component for displaying workout preview
 * @param {Object} props - Component props
 */
const WorkoutCard = ({ workout, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Text style={styles.emoji}>{workout.image}</Text>

                    <View style={styles.info}>
                        <Text style={styles.name} numberOfLines={1}>
                            {workout.name}
                        </Text>
                        <Text style={styles.description} numberOfLines={2}>
                            {workout.description}
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

                    <View
                        style={[
                            styles.difficultyBadge,
                            { backgroundColor: DIFFICULTY_COLORS[workout.difficulty] || COLORS.info },
                        ]}
                    >
                        <Text style={styles.difficultyText}>{workout.difficulty}</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.md,
    },
    gradient: {
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
    },
    content: {
        padding: SPACING.md,
        minHeight: 140,
    },
    emoji: {
        fontSize: 40,
        marginBottom: SPACING.sm,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: FONT_SIZES.xl,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: SPACING.xs,
    },
    description: {
        fontSize: FONT_SIZES.sm,
        color: '#e0e7ff',
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
        fontSize: 16,
    },
    statText: {
        fontSize: FONT_SIZES.sm,
        color: '#ffffff',
        fontWeight: '600',
    },
    difficultyBadge: {
        position: 'absolute',
        top: SPACING.md,
        right: SPACING.md,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
    },
    difficultyText: {
        fontSize: FONT_SIZES.xs,
        color: '#ffffff',
        fontWeight: '600',
    },
});

export default WorkoutCard;
