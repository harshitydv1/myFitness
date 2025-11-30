/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} - BMI value
 */
export const calculateBMI = (weight, height) => {
    if (!weight || !height || weight <= 0 || height <= 0) {
        return 0;
    }
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10; // Round to 1 decimal place
};

/**
 * Get BMI category based on BMI value
 * @param {number} bmi - BMI value
 * @returns {Object} - Category info with name and color
 */
export const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
        return { name: 'Underweight', color: '#3b82f6', emoji: '⚠️' };
    } else if (bmi >= 18.5 && bmi < 25) {
        return { name: 'Normal', color: '#10b981', emoji: '✅' };
    } else if (bmi >= 25 && bmi < 30) {
        return { name: 'Overweight', color: '#f59e0b', emoji: '⚠️' };
    } else {
        return { name: 'Obese', color: '#ef4444', emoji: '🚨' };
    }
};

/**
 * Calculate total calories burned from workout history
 * @param {Array} history - Array of workout history items
 * @returns {number} - Total calories
 */
export const calculateTotalCalories = (history) => {
    if (!history || !Array.isArray(history)) return 0;
    return history.reduce((total, workout) => total + (workout.calories || 0), 0);
};

/**
 * Calculate workout streak (consecutive days with workouts)
 * @param {Array} history - Array of workout history items
 * @returns {Object} - Streak info with current and longest streak
 */
export const calculateStreak = (history) => {
    if (!history || !Array.isArray(history) || history.length === 0) {
        return { current: 0, longest: 0 };
    }

    // Sort by date descending
    const sorted = [...history].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    // Get unique dates
    const uniqueDates = [...new Set(sorted.map(w => {
        const date = new Date(w.completedAt);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }))];

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    // Check if there's a workout today or yesterday
    const mostRecentDate = uniqueDates[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;

    if (mostRecentDate !== todayStr && mostRecentDate !== yesterdayStr) {
        return { current: 0, longest: 0 };
    }

    currentStreak = 1;

    // Calculate streaks
    for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = new Date(uniqueDates[i - 1].split('-').map(Number));
        const currDate = new Date(uniqueDates[i].split('-').map(Number));

        const diffTime = Math.abs(prevDate - currDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            tempStreak++;
            currentStreak = tempStreak;
        } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
        }
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    return { current: currentStreak, longest: longestStreak };
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if today
    if (d.toDateString() === today.toDateString()) {
        return 'Today';
    }

    // Check if yesterday
    if (d.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }

    // Check if this week
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    if (d > weekAgo) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[d.getDay()];
    }

    // Otherwise return formatted date
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

/**
 * Format time to readable string (e.g., "2:30 PM")
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted time string
 */
export const formatTime = (date) => {
    const d = new Date(date);
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
};

/**
 * Get greeting based on time of day
 * @returns {string} - Greeting message
 */
export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};

/**
 * Check if two dates are the same day
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {boolean} - True if same day
 */
export const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
};

/**
 * Get workouts completed today
 * @param {Array} history - Workout history
 * @returns {number} - Count of today's workouts
 */
export const getTodayWorkouts = (history) => {
    if (!history || !Array.isArray(history)) return 0;
    const today = new Date();
    return history.filter(workout => isSameDay(workout.completedAt, today)).length;
};
