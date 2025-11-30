import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import WorkoutCard from '../components/WorkoutCard';
import { COLORS, SPACING, FONT_SIZES, WORKOUT_CATEGORIES } from '../constants/theme';
import workoutsData from '../data/workouts.json';

const WorkoutsScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredWorkouts =
        selectedCategory === 'All'
            ? workoutsData
            : workoutsData.filter((workout) => workout.category === selectedCategory);

    const handleWorkoutPress = (workout) => {
        navigation.navigate('WorkoutDetails', { workout });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Workouts</Text>
                <Text style={styles.subtitle}>Choose your workout for today</Text>
            </View>

            {/* Category Filter */}
            <View style={styles.categoriesContainer}>
                <FlatList
                    horizontal
                    data={WORKOUT_CATEGORIES}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedCategory(item)}
                            style={[
                                styles.categoryButton,
                                selectedCategory === item && styles.categoryButtonActive,
                            ]}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === item && styles.categoryTextActive,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Workouts List */}
            <FlatList
                data={filteredWorkouts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.workoutsList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <WorkoutCard workout={item} onPress={() => handleWorkoutPress(item)} />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🏋️</Text>
                        <Text style={styles.emptyText}>No workouts found</Text>
                        <Text style={styles.emptySubtext}>Try selecting a different category</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light.background,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
    },
    title: {
        fontSize: FONT_SIZES['3xl'],
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    subtitle: {
        fontSize: FONT_SIZES.base,
        color: COLORS.light.textSecondary,
        marginTop: 4,
    },
    categoriesContainer: {
        marginVertical: SPACING.md,
    },
    categoriesList: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.sm,
    },
    categoryButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.light.border,
    },
    categoryButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        color: COLORS.light.text,
    },
    categoryTextActive: {
        color: '#ffffff',
    },
    workoutsList: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING['2xl'],
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: SPACING.md,
    },
    emptyText: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '600',
        color: COLORS.light.text,
        marginBottom: SPACING.xs,
    },
    emptySubtext: {
        fontSize: FONT_SIZES.base,
        color: COLORS.light.textSecondary,
    },
});

export default WorkoutsScreen;
