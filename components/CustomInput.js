import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';

/**
 * Reusable custom input component
 * @param {Object} props - Component props
 */
const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    unit = '',
    error = '',
    style = {},
    ...rest
}) => {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, error ? styles.inputError : null]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#94a3b8"
                    keyboardType={keyboardType}
                    {...rest}
                />
                {unit && <Text style={styles.unit}>{unit}</Text>}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: FONT_SIZES.base,
        fontWeight: '600',
        color: COLORS.light.text,
        marginBottom: SPACING.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.light.border,
        paddingHorizontal: SPACING.md,
    },
    input: {
        flex: 1,
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZES.base,
        color: COLORS.light.text,
    },
    inputError: {
        borderColor: COLORS.danger,
    },
    unit: {
        fontSize: FONT_SIZES.base,
        color: COLORS.light.textSecondary,
        fontWeight: '600',
        marginLeft: SPACING.xs,
    },
    errorText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.danger,
        marginTop: SPACING.xs,
    },
});

export default CustomInput;
