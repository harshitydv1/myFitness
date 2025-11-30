import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import BMICalculatorScreen from '../screens/BMICalculatorScreen';
import WaterTrackerScreen from '../screens/WaterTrackerScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { useProfile } from '../hooks/useProfile';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { profile, loading, hasProfile } = useProfile();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            setIsReady(true);
        }
    }, [loading]);

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {!hasProfile() ? (
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                ) : (
                    <>
                        <Stack.Screen name="Main" component={BottomTabNavigator} />
                        <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
                        <Stack.Screen name="BMICalculator" component={BMICalculatorScreen} />
                        <Stack.Screen name="WaterTracker" component={WaterTrackerScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
