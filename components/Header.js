import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

/**
 * Reusable header component
 * @param {Object} props - Component props
 */
const Header = ({
    title,
    showBack = false,
    onBack,
    rightComponent = null,
    style = {},
}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.leftContainer}>
                {showBack && (
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.light.text} />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
            {rightComponent && <View style={styles.rightContainer}>{rightComponent}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.light.background,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    backButton: {
        marginRight: SPACING.sm,
        padding: SPACING.xs,
    },
    title: {
        fontSize: FONT_SIZES['2xl'],
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    rightContainer: {
        marginLeft: SPACING.sm,
    },
});

export default Header;
