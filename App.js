import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';

import { ProfileProvider } from './hooks/useProfile';

export default function App() {
    return (
        <ProfileProvider>
            <StatusBar style="auto" />
            <AppNavigator />
        </ProfileProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
