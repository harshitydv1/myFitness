import { useState, useEffect } from 'react';
import { storeData, getData, STORAGE_KEYS } from '../utils/storage';
import { calculateTotalCalories, calculateStreak, getTodayWorkouts } from '../utils/calculations';

/**
 * Custom hook for managing workout history
 * @returns {Object} - History data and functions
 */
export const useWorkoutHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load history from storage on mount
    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await getData(STORAGE_KEYS.WORKOUT_HISTORY);
            setHistory(data || []);
        } catch (error) {
            console.error('Error loading history:', error);
        } finally {
            setLoading(false);
        }
    };

    const addWorkout = async (workout) => {
        try {
            const newWorkout = {
                ...workout,
                completedAt: new Date().toISOString(),
                id: Date.now().toString(),
            };
            const updatedHistory = [newWorkout, ...history];
            await storeData(STORAGE_KEYS.WORKOUT_HISTORY, updatedHistory);
            setHistory(updatedHistory);
            return true;
        } catch (error) {
            console.error('Error adding workout:', error);
            return false;
        }
    };

    const clearHistory = async () => {
        try {
            await storeData(STORAGE_KEYS.WORKOUT_HISTORY, []);
            setHistory([]);
            return true;
        } catch (error) {
            console.error('Error clearing history:', error);
            return false;
        }
    };

    const getStats = () => {
        return {
            totalWorkouts: history.length,
            totalCalories: calculateTotalCalories(history),
            streak: calculateStreak(history),
            todayWorkouts: getTodayWorkouts(history),
        };
    };

    return {
        history,
        loading,
        addWorkout,
        clearHistory,
        getStats,
        reload: loadHistory,
    };
};
