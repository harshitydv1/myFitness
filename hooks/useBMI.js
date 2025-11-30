import { useState, useEffect } from 'react';
import { storeData, getData, STORAGE_KEYS } from '../utils/storage';
import { calculateBMI, getBMICategory } from '../utils/calculations';

/**
 * Custom hook for managing BMI calculations and history
 * @returns {Object} - BMI data and functions
 */
export const useBMI = () => {
    const [bmiHistory, setBmiHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load BMI history from storage on mount
    useEffect(() => {
        loadBMIHistory();
    }, []);

    const loadBMIHistory = async () => {
        try {
            const data = await getData(STORAGE_KEYS.BMI_RESULTS);
            setBmiHistory(data || []);
        } catch (error) {
            console.error('Error loading BMI history:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveBMI = async (weight, height) => {
        try {
            const bmi = calculateBMI(weight, height);
            const category = getBMICategory(bmi);

            const newResult = {
                bmi,
                category: category.name,
                color: category.color,
                emoji: category.emoji,
                weight,
                height,
                date: new Date().toISOString(),
                id: Date.now().toString(),
            };

            const updatedHistory = [newResult, ...bmiHistory];
            await storeData(STORAGE_KEYS.BMI_RESULTS, updatedHistory);
            setBmiHistory(updatedHistory);

            return newResult;
        } catch (error) {
            console.error('Error saving BMI:', error);
            return null;
        }
    };

    const getLatestBMI = () => {
        return bmiHistory.length > 0 ? bmiHistory[0] : null;
    };

    const clearBMIHistory = async () => {
        try {
            await storeData(STORAGE_KEYS.BMI_RESULTS, []);
            setBmiHistory([]);
            return true;
        } catch (error) {
            console.error('Error clearing BMI history:', error);
            return false;
        }
    };

    return {
        bmiHistory,
        loading,
        saveBMI,
        getLatestBMI,
        clearBMIHistory,
        calculateBMI,
        getBMICategory,
        reload: loadBMIHistory,
    };
};
