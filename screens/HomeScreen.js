import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../hooks/useProfile';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import { useWaterTracker } from '../hooks/useWaterTracker';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';
import { getGreeting } from '../utils/calculations';

const HomeScreen = ({ navigation }) => {
    const { profile } = useProfile();
    const { getStats } = useWorkoutHistory();
    const { waterIntake, dailyGoal } = useWaterTracker();

    const stats = getStats();
    const greeting = getGreeting();

    const quickActions = [
        {
            id: 1,
            title: 'Start Workout',
            icon: 'fitness',
            color: ['#6366f1', '#8b5cf6'],
            onPress: () => navigation.navigate('Workouts'),
        },
        {
            id: 2,
            title: 'Water Intake',
            icon: 'water',
            color: ['#3b82f6', '#06b6d4'],
            onPress: () => navigation.navigate('WaterTracker'),
        },
        {
            id: 3,
            title: 'BMI Calculator',
            icon: 'calculator',
            color: ['#10b981', '#059669'],
            onPress: () => navigation.navigate('BMICalculator'),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>{greeting} 👋</Text>
                        <Text style={styles.name}>{profile?.name || 'User'}</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <Ionicons name="person-circle" size={40} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Daily Progress Card */}
                <LinearGradient
                    colors={['#6366f1', '#8b5cf6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.progressCard}
                >
                    <Text style={styles.progressTitle}>Today's Progress</Text>
                    <View style={styles.progressStats}>
                        <View style={styles.progressStat}>
                            <Text style={styles.progressValue}>{stats.totalWorkouts}</Text>
                            <Text style={styles.progressLabel}>Total Workouts</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.progressStat}>
                            <Text style={styles.progressValue}>{waterIntake}ml</Text>
                            <Text style={styles.progressLabel}>Water</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.progressStat}>
                            <Text style={styles.progressValue}>{stats.streak.current}</Text>
                            <Text style={styles.progressLabel}>Day Streak</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        {quickActions.map((action) => (
                            <TouchableOpacity
                                key={action.id}
                                onPress={action.onPress}
                                activeOpacity={0.8}
                                style={styles.actionCard}
                            >
                                <LinearGradient
                                    colors={action.color}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.actionGradient}
                                >
                                    <Ionicons name={action.icon} size={32} color="#ffffff" />
                                    <Text style={styles.actionTitle}>{action.title}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Motivational Quote */}
                <View style={styles.quoteCard}>
                    <Text style={styles.quoteIcon}>💡</Text>
                    <Text style={styles.quoteText}>
                        "The only bad workout is the one that didn't happen."
                    </Text>
                    <Text style={styles.quoteAuthor}>- Unknown</Text>
                </View>

                {/* Stats Overview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Stats</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>🏋️</Text>
                            <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
                            <Text style={styles.statLabel}>Total Workouts</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>🔥</Text>
                            <Text style={styles.statValue}>{stats.totalCalories}</Text>
                            <Text style={styles.statLabel}>Calories Burned</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light.background,
    },
    scrollContent: {
        paddingBottom: SPACING.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    greeting: {
        fontSize: FONT_SIZES.base,
        color: COLORS.light.textSecondary,
    },
    name: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginTop: 4,
    },
    profileButton: {
        padding: 4,
    },
    progressCard: {
        marginHorizontal: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        ...SHADOWS.md,
    },
    progressTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: SPACING.md,
    },
    progressStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    progressStat: {
        alignItems: 'center',
        flex: 1,
    },
    progressValue: {
        fontSize: FONT_SIZES['3xl'],
        fontWeight: 'bold',
        color: '#ffffff',
    },
    progressLabel: {
        fontSize: FONT_SIZES.sm,
        color: '#e0e7ff',
        marginTop: 4,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    section: {
        marginTop: SPACING.lg,
        paddingHorizontal: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.md,
    },
    actionsGrid: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    actionCard: {
        flex: 1,
        borderRadius: BORDER_RADIUS.lg,
        ...SHADOWS.md,
    },
    actionGradient: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        alignItems: 'center',
        minHeight: 100,
        justifyContent: 'center',
    },
    actionTitle: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: '#ffffff',
        marginTop: SPACING.sm,
        textAlign: 'center',
    },
    quoteCard: {
        marginHorizontal: SPACING.lg,
        marginTop: SPACING.lg,
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        ...SHADOWS.sm,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    quoteIcon: {
        fontSize: 24,
        marginBottom: SPACING.sm,
    },
    quoteText: {
        fontSize: FONT_SIZES.base,
        color: COLORS.light.text,
        fontStyle: 'italic',
        lineHeight: 24,
        marginBottom: SPACING.xs,
    },
    quoteAuthor: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.textSecondary,
        textAlign: 'right',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    statIcon: {
        fontSize: 32,
        marginBottom: SPACING.xs,
    },
    statValue: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.textSecondary,
        textAlign: 'center',
    },
});

export default HomeScreen;
