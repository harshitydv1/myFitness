import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';

const WorkoutDetailsScreen = ({ route, navigation }) => {
    const { workout } = route.params;
    const { addWorkout } = useWorkoutHistory();
    const [timerVisible, setTimerVisible] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isResting, setIsResting] = useState(false);

    const startWorkout = () => {
        setTimerVisible(true);
        setCurrentExercise(0);
        setIsResting(false);
    };

    const completeWorkout = async () => {
        const success = await addWorkout({
            name: workout.name,
            category: workout.category,
            duration: workout.duration,
            calories: workout.calories,
        });

        if (success) {
            Alert.alert(
                'Workout Complete! 🎉',
                `Great job! You burned ${workout.calories} calories.`,
                [
                    {
                        text: 'View History',
                        onPress: () => navigation.navigate('History'),
                    },
                    {
                        text: 'Done',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        }
    };

    const closeTimer = () => {
        Alert.alert(
            'Exit Workout?',
            'Are you sure you want to stop this workout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Exit',
                    style: 'destructive',
                    onPress: () => setTimerVisible(false),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header with gradient */}
            <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.headerGradient}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#ffffff" />
                </TouchableOpacity>

                <Text style={styles.emoji}>{workout.image}</Text>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.description}>{workout.description}</Text>

                <View style={styles.headerStats}>
                    <View style={styles.headerStat}>
                        <Text style={styles.headerStatIcon}>⏱️</Text>
                        <Text style={styles.headerStatValue}>{workout.duration}</Text>
                        <Text style={styles.headerStatLabel}>minutes</Text>
                    </View>
                    <View style={styles.headerStat}>
                        <Text style={styles.headerStatIcon}>🔥</Text>
                        <Text style={styles.headerStatValue}>{workout.calories}</Text>
                        <Text style={styles.headerStatLabel}>calories</Text>
                    </View>
                    <View style={styles.headerStat}>
                        <Text style={styles.headerStatIcon}>📊</Text>
                        <Text style={styles.headerStatValue}>{workout.difficulty}</Text>
                        <Text style={styles.headerStatLabel}>level</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Exercises List */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Exercises ({workout.exercises.length})</Text>

                {workout.exercises.map((exercise, index) => (
                    <View key={index} style={styles.exerciseCard}>
                        <View style={styles.exerciseNumber}>
                            <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                        </View>

                        <View style={styles.exerciseContent}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <Text style={styles.exerciseInstructions}>{exercise.instructions}</Text>

                            <View style={styles.exerciseStats}>
                                <View style={styles.exerciseStat}>
                                    <Ionicons name="repeat" size={16} color={COLORS.primary} />
                                    <Text style={styles.exerciseStatText}>
                                        {exercise.reps} × {exercise.sets} sets
                                    </Text>
                                </View>
                                <View style={styles.exerciseStat}>
                                    <Ionicons name="time" size={16} color={COLORS.primary} />
                                    <Text style={styles.exerciseStatText}>{exercise.rest}s rest</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <CustomButton
                    title="Start Workout"
                    onPress={startWorkout}
                    icon="▶️"
                    style={styles.startButton}
                />
                <CustomButton
                    title="Mark as Complete"
                    onPress={completeWorkout}
                    variant="outline"
                />
            </View>

            {/* Timer Modal (Simplified) */}
            <Modal
                visible={timerVisible}
                animationType="slide"
                onRequestClose={closeTimer}
            >
                <LinearGradient
                    colors={['#6366f1', '#8b5cf6']}
                    style={styles.timerContainer}
                >
                    <TouchableOpacity onPress={closeTimer} style={styles.closeButton}>
                        <Ionicons name="close" size={32} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.timerTitle}>Workout in Progress</Text>
                    <Text style={styles.timerExercise}>
                        {workout.exercises[currentExercise]?.name}
                    </Text>

                    <View style={styles.timerInfo}>
                        <Text style={styles.timerInfoText}>
                            Exercise {currentExercise + 1} of {workout.exercises.length}
                        </Text>
                        <Text style={styles.timerReps}>
                            {workout.exercises[currentExercise]?.reps} × {workout.exercises[currentExercise]?.sets}
                        </Text>
                    </View>

                    <View style={styles.timerButtons}>
                        {currentExercise < workout.exercises.length - 1 ? (
                            <CustomButton
                                title="Next Exercise"
                                onPress={() => setCurrentExercise(currentExercise + 1)}
                                style={styles.timerButton}
                            />
                        ) : (
                            <CustomButton
                                title="Finish Workout"
                                onPress={() => {
                                    setTimerVisible(false);
                                    completeWorkout();
                                }}
                                style={styles.timerButton}
                            />
                        )}
                    </View>
                </LinearGradient>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light.background,
    },
    headerGradient: {
        paddingTop: 60,
        paddingBottom: SPACING.xl,
        paddingHorizontal: SPACING.lg,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: SPACING.lg,
        zIndex: 10,
    },
    emoji: {
        fontSize: 64,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    },
    workoutName: {
        fontSize: FONT_SIZES['3xl'],
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: SPACING.xs,
    },
    description: {
        fontSize: FONT_SIZES.base,
        color: '#e0e7ff',
        textAlign: 'center',
        marginBottom: SPACING.lg,
    },
    headerStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    headerStat: {
        alignItems: 'center',
    },
    headerStatIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    headerStatValue: {
        fontSize: FONT_SIZES.xl,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    headerStatLabel: {
        fontSize: FONT_SIZES.xs,
        color: '#e0e7ff',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.md,
    },
    exerciseCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        ...SHADOWS.sm,
    },
    exerciseNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
    },
    exerciseNumberText: {
        fontSize: FONT_SIZES.base,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    exerciseContent: {
        flex: 1,
    },
    exerciseName: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '600',
        color: COLORS.light.text,
        marginBottom: SPACING.xs,
    },
    exerciseInstructions: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.textSecondary,
        lineHeight: 20,
        marginBottom: SPACING.sm,
    },
    exerciseStats: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    exerciseStat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    exerciseStatText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.text,
        fontWeight: '500',
    },
    actionButtons: {
        padding: SPACING.lg,
        gap: SPACING.sm,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: COLORS.light.border,
    },
    startButton: {
        marginBottom: 0,
    },
    timerContainer: {
        flex: 1,
        padding: SPACING.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 60,
        right: SPACING.lg,
    },
    timerTitle: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: SPACING.lg,
    },
    timerExercise: {
        fontSize: FONT_SIZES['4xl'],
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: SPACING.xl,
    },
    timerInfo: {
        alignItems: 'center',
        marginBottom: SPACING['2xl'],
    },
    timerInfoText: {
        fontSize: FONT_SIZES.lg,
        color: '#e0e7ff',
        marginBottom: SPACING.sm,
    },
    timerReps: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '600',
        color: '#ffffff',
    },
    timerButtons: {
        width: '100%',
    },
    timerButton: {
        width: '100%',
    },
});

export default WorkoutDetailsScreen;
