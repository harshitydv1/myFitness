import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useWaterTracker } from '../hooks/useWaterTracker';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';

const WaterTrackerScreen = ({ navigation }) => {
    const { waterIntake, addWater, getProgress, getGlasses, dailyGoal, increment } = useWaterTracker();

    const progress = getProgress();
    const glasses = getGlasses();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Water Tracker</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                {/* Water Display */}
                <LinearGradient
                    colors={['#3b82f6', '#06b6d4']}
                    style={styles.waterCard}
                >
                    <Text style={styles.waterEmoji}>💧</Text>
                    <Text style={styles.waterAmount}>{waterIntake}ml</Text>
                    <Text style={styles.waterGoal}>of {dailyGoal}ml goal</Text>

                    {/* Progress Bar */}
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progress)}% Complete</Text>
                </LinearGradient>

                {/* Glasses Count */}
                <View style={styles.glassesCard}>
                    <Text style={styles.glassesTitle}>Glasses Consumed</Text>
                    <View style={styles.glassesGrid}>
                        {[...Array(8)].map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.glassIcon,
                                    index < glasses && styles.glassIconFilled,
                                ]}
                            >
                                <Ionicons
                                    name={index < glasses ? 'water' : 'water-outline'}
                                    size={32}
                                    color={index < glasses ? '#06b6d4' : '#cbd5e1'}
                                />
                            </View>
                        ))}
                    </View>
                    <Text style={styles.glassesSubtext}>
                        {glasses} of 8 glasses (250ml each)
                    </Text>
                </View>

                {/* Add Water Button */}
                <CustomButton
                    title={`Add ${increment}ml`}
                    onPress={() => addWater(increment)}
                    icon="💧"
                    style={styles.addButton}
                />

                {/* Tips */}
                <View style={styles.tipsCard}>
                    <Text style={styles.tipsIcon}>💡</Text>
                    <Text style={styles.tipsTitle}>Hydration Tips</Text>
                    <Text style={styles.tipsText}>
                        • Drink water first thing in the morning{'\n'}
                        • Keep a water bottle with you{'\n'}
                        • Drink before, during, and after exercise{'\n'}
                        • Set reminders to drink water regularly
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    content: {
        flex: 1,
        padding: SPACING.lg,
    },
    waterCard: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    waterEmoji: {
        fontSize: 64,
        marginBottom: SPACING.md,
    },
    waterAmount: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: SPACING.xs,
    },
    waterGoal: {
        fontSize: FONT_SIZES.lg,
        color: '#e0f2fe',
        marginBottom: SPACING.lg,
    },
    progressBarContainer: {
        width: '100%',
        height: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: SPACING.sm,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 6,
    },
    progressText: {
        fontSize: FONT_SIZES.base,
        fontWeight: '600',
        color: '#ffffff',
    },
    glassesCard: {
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    glassesTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    glassesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: SPACING.md,
        marginBottom: SPACING.md,
    },
    glassIcon: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.light.background,
    },
    glassIconFilled: {
        backgroundColor: '#e0f2fe',
    },
    glassesSubtext: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.textSecondary,
        textAlign: 'center',
    },
    addButton: {
        marginBottom: SPACING.lg,
    },
    tipsCard: {
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        borderLeftWidth: 4,
        borderLeftColor: '#06b6d4',
    },
    tipsIcon: {
        fontSize: 32,
        marginBottom: SPACING.sm,
    },
    tipsTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.sm,
    },
    tipsText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.textSecondary,
        lineHeight: 22,
    },
});

export default WaterTrackerScreen;
