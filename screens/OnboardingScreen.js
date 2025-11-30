import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useProfile } from "../hooks/useProfile";
import { COLORS, SPACING, FONT_SIZES } from "../constants/theme";

const OnboardingScreen = ({ navigation }) => {
  const { saveProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (
      !formData.age ||
      parseInt(formData.age) < 1 ||
      parseInt(formData.age) > 120
    ) {
      newErrors.age = "Please enter a valid age";
    }

    if (!formData.weight || parseFloat(formData.weight) < 1) {
      newErrors.weight = "Please enter a valid weight";
    }

    if (!formData.height || parseFloat(formData.height) < 1) {
      newErrors.height = "Please enter a valid height";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const profile = {
      name: formData.name.trim(),
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      createdAt: new Date().toISOString(),
    };

    const success = await saveProfile(profile);
    if (success) {
      // Navigation handled automatically by AppNavigator state update
    } else {
      Alert.alert("Error", "Failed to save profile. Please try again.");
    }
  };

  return (
    <LinearGradient
      colors={["#E2852E", "#F4A460", "#F0C674"]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.emoji}>💪</Text>
            <Text style={styles.title}>Welcome to FitTrack</Text>
            <Text style={styles.subtitle}>
              Let's get to know you better to personalize your fitness journey
            </Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="What's your name?"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter your name"
              error={errors.name}
              style={styles.input}
            />

            <CustomInput
              label="How old are you?"
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
              placeholder="Enter your age"
              keyboardType="numeric"
              unit="years"
              error={errors.age}
              style={styles.input}
            />

            <CustomInput
              label="What's your weight?"
              value={formData.weight}
              onChangeText={(text) =>
                setFormData({ ...formData, weight: text })
              }
              placeholder="Enter your weight"
              keyboardType="decimal-pad"
              unit="kg"
              error={errors.weight}
              style={styles.input}
            />

            <CustomInput
              label="What's your height?"
              value={formData.height}
              onChangeText={(text) =>
                setFormData({ ...formData, height: text })
              }
              placeholder="Enter your height"
              keyboardType="decimal-pad"
              unit="cm"
              error={errors.height}
              style={styles.input}
            />

            <CustomButton
              title="Get Started"
              onPress={handleSubmit}
              icon="🚀"
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING["2xl"] * 2,
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES["3xl"],
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: "#e0e7ff",
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: SPACING.lg,
  },
  input: {
    marginBottom: SPACING.md,
  },
  button: {
    marginTop: SPACING.md,
  },
});

export default OnboardingScreen;
