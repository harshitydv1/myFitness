import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
    USER_PROFILE: '@fittrack_user_profile',
    WORKOUT_HISTORY: '@fittrack_workout_history',
    WATER_INTAKE: '@fittrack_water_intake',
    BMI_RESULTS: '@fittrack_bmi_results',
    LAST_WATER_DATE: '@fittrack_last_water_date',
};

/**
 * Store data in AsyncStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store (will be JSON stringified)
 * @returns {Promise<boolean>} - Success status
 */
export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (error) {
        console.error('Error storing data:', error);
        return false;
    }
};

/**
 * Get data from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<any|null>} - Retrieved value or null
 */
export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error getting data:', error);
        return null;
    }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<boolean>} - Success status
 */
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing data:', error);
        return false;
    }
};

/**
 * Clear all app data from AsyncStorage
 * @returns {Promise<boolean>} - Success status
 */
export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing storage:', error);
        return false;
    }
};

/**
 * Get multiple items from AsyncStorage
 * @param {string[]} keys - Array of storage keys
 * @returns {Promise<Object>} - Object with key-value pairs
 */
export const getMultiple = async (keys) => {
    try {
        const values = await AsyncStorage.multiGet(keys);
        const result = {};
        values.forEach(([key, value]) => {
            result[key] = value != null ? JSON.parse(value) : null;
        });
        return result;
    } catch (error) {
        console.error('Error getting multiple items:', error);
        return {};
    }
};
