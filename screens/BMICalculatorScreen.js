import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useProfile } from '../hooks/useProfile';
import { useBMI } from '../hooks/useBMI';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';

const BMICalculatorScreen = ({ navigation }) => {
    const { profile } = useProfile();
    const { saveBMI, getBMICategory } = useBMI();

    const [weight, setWeight] = useState(profile?.weight?.toString() || '');
    const [height, setHeight] = useState(profile?.height?.toString() || '');
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (profile) {
            setWeight(profile.weight?.toString() || '');
            setHeight(profile.height?.toString() || '');
        }
    }, [profile]);

    const calculateBMI = async () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
            return;
        }

        const bmiResult = await saveBMI(weightNum, heightNum);
        if (bmiResult) {
            setResult(bmiResult);
        }
    };

    const getBMIColor = (bmi) => {
        if (bmi < 18.5) return '#3b82f6';
        if (bmi < 25) return '#10b981';
        if (bmi < 30) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.light.text} />
                </TouchableOpacity>
                <Text style={styles.title}>BMI Calculator</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                {/* Input Section */}
                <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Enter Your Details</Text>

                    <CustomInput
                        label="Weight"
                        value={weight}
                        onChangeText={setWeight}
                        placeholder="Enter weight"
                        keyboardType="decimal-pad"
                        unit="kg"
                    />

                    <CustomInput
                        label="Height"
                        value={height}
                        onChangeText={setHeight}
                        placeholder="Enter height"
                        keyboardType="decimal-pad"
                        unit="cm"
                    />

                    <CustomButton
                        title="Calculate BMI"
                        onPress={calculateBMI}
                        icon="📊"
                    />
                </View>

                {/* Result Section */}
                {result && (
                    <View style={styles.resultSection}>
                        <LinearGradient
                            colors={[getBMIColor(result.bmi), getBMIColor(result.bmi) + 'CC']}
                            style={styles.resultCard}
                        >
                            <Text style={styles.resultEmoji}>{result.emoji}</Text>
                            <Text style={styles.resultBMI}>{result.bmi}</Text>
                            <Text style={styles.resultCategory}>{result.category}</Text>
                        </LinearGradient>

                        {/* BMI Scale */}
                        <View style={styles.scaleContainer}>
                            <Text style={styles.scaleTitle}>BMI Categories</Text>

                            <View style={styles.scaleItem}>
                                <View style={[styles.scaleIndicator, { backgroundColor: '#3b82f6' }]} />
                                <Text style={styles.scaleText}>Underweight</Text>
                                <Text style={styles.scaleRange}>{'< 18.5'}</Text>
                            </View>

                            <View style={styles.scaleItem}>
                                <View style={[styles.scaleIndicator, { backgroundColor: '#10b981' }]} />
                                <Text style={styles.scaleText}>Normal</Text>
                                <Text style={styles.scaleRange}>18.5 - 24.9</Text>
                            </View>

                            <View style={styles.scaleItem}>
                                <View style={[styles.scaleIndicator, { backgroundColor: '#f59e0b' }]} />
                                <Text style={styles.scaleText}>Overweight</Text>
                                <Text style={styles.scaleRange}>25 - 29.9</Text>
                            </View>

                            <View style={styles.scaleItem}>
                                <View style={[styles.scaleIndicator, { backgroundColor: '#ef4444' }]} />
                                <Text style={styles.scaleText}>Obese</Text>
                                <Text style={styles.scaleRange}>≥ 30</Text>
                            </View>
                        </View>
                    </View>
                )}

                {!result && (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderIcon}>📊</Text>
                        <Text style={styles.placeholderText}>
                            Enter your weight and height to calculate your BMI
                        </Text>
                    </View>
                )}
            </View>
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
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    content: {
        flex: 1,
        padding: SPACING.lg,
    },
    inputSection: {
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.md,
    },
    resultSection: {
        flex: 1,
    },
    resultCard: {
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    resultEmoji: {
        fontSize: 64,
        marginBottom: SPACING.md,
    },
    resultBMI: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: SPACING.xs,
    },
    resultCategory: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: '600',
        color: '#ffffff',
    },
    scaleContainer: {
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
    },
    scaleTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.md,
    },
    scaleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    scaleIndicator: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: SPACING.sm,
    },
    scaleText: {
        flex: 1,
        fontSize: FONT_SIZES.base,
        color: COLORS.light.text,
    },
    scaleRange: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.light.textSecondary,
        fontWeight: '500',
    },
    placeholderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderIcon: {
        fontSize: 80,
        marginBottom: SPACING.lg,
    },
    placeholderText: {
        fontSize: FONT_SIZES.base,
        color: COLORS.light.textSecondary,
        textAlign: 'center',
        paddingHorizontal: SPACING.xl,
    },
});

export default BMICalculatorScreen;
