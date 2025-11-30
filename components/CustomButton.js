import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/theme';

/**
 * Reusable custom button component
 * @param {Object} props - Component props
 * @param {string} props.title - Button text
 * @param {Function} props.onPress - Press handler
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'outline', 'danger'
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {string} props.icon - Optional icon (emoji or component)
 * @param {Object} props.style - Additional styles
 */
const CustomButton = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    icon = null,
    style = {},
}) => {
    const getButtonStyle = () => {
        const baseStyle = {
            paddingVertical: SPACING.md,
            paddingHorizontal: SPACING.lg,
            borderRadius: BORDER_RADIUS.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 50,
        };

        switch (variant) {
            case 'primary':
                return {
                    ...baseStyle,
                    backgroundColor: disabled ? '#94a3b8' : COLORS.primary,
                };
            case 'secondary':
                return {
                    ...baseStyle,
                    backgroundColor: disabled ? '#94a3b8' : COLORS.secondary,
                };
            case 'outline':
                return {
                    ...baseStyle,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: disabled ? '#94a3b8' : COLORS.primary,
                };
            case 'danger':
                return {
                    ...baseStyle,
                    backgroundColor: disabled ? '#94a3b8' : COLORS.danger,
                };
            default:
                return baseStyle;
        }
    };

    const getTextStyle = () => {
        const baseStyle = {
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center',
        };

        if (variant === 'outline') {
            return {
                ...baseStyle,
                color: disabled ? '#94a3b8' : COLORS.primary,
            };
        }

        return {
            ...baseStyle,
            color: '#ffffff',
        };
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[getButtonStyle(), style]}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? COLORS.primary : '#ffffff'} />
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    {icon && <Text style={{ fontSize: 20 }}>{icon}</Text>}
                    <Text style={getTextStyle()}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;
