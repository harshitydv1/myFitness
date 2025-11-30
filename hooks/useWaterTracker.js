import { useState, useEffect } from 'react';
import { storeData, getData, STORAGE_KEYS } from '../utils/storage';
import { isSameDay } from '../utils/calculations';

/**
 * Custom hook for managing water intake tracking
 * @returns {Object} - Water intake data and functions
 */
export const useWaterTracker = () => {
    const [waterIntake, setWaterIntake] = useState(0);
    const [lastDate, setLastDate] = useState(new Date().toISOString());
    const [loading, setLoading] = useState(true);

    const DAILY_GOAL = 2000; // ml
    const INCREMENT = 250; // ml

    // Load water data from storage on mount
    useEffect(() => {
        loadWaterData();
    }, []);

    const loadWaterData = async () => {
        try {
            const intake = await getData(STORAGE_KEYS.WATER_INTAKE);
            const date = await getData(STORAGE_KEYS.LAST_WATER_DATE);

            const today = new Date();
            const savedDate = date ? new Date(date) : new Date();

            // Reset if it's a new day
            if (!isSameDay(today, savedDate)) {
                setWaterIntake(0);
                setLastDate(today.toISOString());
                await storeData(STORAGE_KEYS.WATER_INTAKE, 0);
                await storeData(STORAGE_KEYS.LAST_WATER_DATE, today.toISOString());
            } else {
                // Sanitize loaded data
                const validIntake = typeof intake === 'number' && !isNaN(intake) ? intake : 0;
                setWaterIntake(validIntake);
                setLastDate(date || today.toISOString());

                // If data was corrupted, fix it in storage
                if (intake !== validIntake) {
                    await storeData(STORAGE_KEYS.WATER_INTAKE, validIntake);
                }
            }
        } catch (error) {
            console.error('Error loading water data:', error);
        } finally {
            setLoading(false);
        }
    };

    const addWater = async (amount = INCREMENT) => {
        try {
            // Ensure amount is a valid number
            const addAmount = typeof amount === 'number' ? amount : INCREMENT;

            // Sanitize current intake if it's corrupted
            const currentIntake = typeof waterIntake === 'number' && !isNaN(waterIntake) ? waterIntake : 0;

            const newIntake = currentIntake + addAmount;
            const today = new Date().toISOString();

            await storeData(STORAGE_KEYS.WATER_INTAKE, newIntake);
            await storeData(STORAGE_KEYS.LAST_WATER_DATE, today);

            setWaterIntake(newIntake);
            setLastDate(today);
            return true;
        } catch (error) {
            console.error('Error adding water:', error);
            return false;
        }
    };

    const resetWater = async () => {
        try {
            await storeData(STORAGE_KEYS.WATER_INTAKE, 0);
            await storeData(STORAGE_KEYS.LAST_WATER_DATE, new Date().toISOString());
            setWaterIntake(0);
            setLastDate(new Date().toISOString());
            return true;
        } catch (error) {
            console.error('Error resetting water:', error);
            return false;
        }
    };

    const getProgress = () => {
        return Math.min((waterIntake / DAILY_GOAL) * 100, 100);
    };

    const getGlasses = () => {
        return Math.floor(waterIntake / INCREMENT);
    };

    return {
        waterIntake,
        loading,
        addWater,
        resetWater,
        getProgress,
        getGlasses,
        dailyGoal: DAILY_GOAL,
        increment: INCREMENT,
        reload: loadWaterData,
    };
};
