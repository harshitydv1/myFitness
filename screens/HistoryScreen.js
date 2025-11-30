import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import HistoryCard from '../components/HistoryCard';
import CustomButton from '../components/CustomButton';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

const HistoryScreen = () => {
    const { history, clearHistory } = useWorkoutHistory();

    const handleClearHistory = () => {
        Alert.alert(
            'Clear History',
            'Are you sure you want to delete all workout history? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        const success = await clearHistory();
                        if (success) {
                            Alert.alert('Success', 'Workout history cleared');
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Workout History</Text>
                {history.length > 0 && (
                    <TouchableOpacity onPress={handleClearHistory}>
                        <Ionicons name="trash-outline" size={24} color={COLORS.danger} />
                    </TouchableOpacity>
                )}
            </View>

            {/* History List */}
            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <HistoryCard workout={item} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📋</Text>
                        <Text style={styles.emptyTitle}>No Workout History</Text>
                        <Text style={styles.emptyText}>
                            Complete your first workout to see it here
                        </Text>
                    </View>
                }
            />

            {history.length > 0 && (
                <View style={styles.footer}>
                    <CustomButton
                        title="Clear All History"
                        onPress={handleClearHistory}
                        variant="danger"
                    />
                </View>
            )}
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
    title: {
        fontSize: FONT_SIZES['3xl'],
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    listContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING['2xl'] * 2,
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: SPACING.lg,
    },
    emptyTitle: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.sm,
    },
    emptyText: {
        fontSize: FONT_SIZES.base,
        color: COLORS.light.textSecondary,
        textAlign: 'center',
    },
    footer: {
        padding: SPACING.lg,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: COLORS.light.border,
    },
});

export default HistoryScreen;
