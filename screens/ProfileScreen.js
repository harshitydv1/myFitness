import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import StatCard from "../components/StatCard";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useProfile } from "../hooks/useProfile";
import { useWorkoutHistory } from "../hooks/useWorkoutHistory";
import { useBMI } from "../hooks/useBMI";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
  SHADOWS,
} from "../constants/theme";

const ProfileScreen = () => {
  const { profile, updateProfile, logout } = useProfile();
  const { getStats } = useWorkoutHistory();
  const { getLatestBMI } = useBMI();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    age: profile?.age?.toString() || "",
    weight: profile?.weight?.toString() || "",
    height: profile?.height?.toString() || "",
  });

  const stats = getStats();
  const latestBMI = getLatestBMI();

  const handleSave = async () => {
    const updates = {
      name: formData.name.trim(),
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
    };

    const success = await updateProfile(updates);
    if (success) {
      Alert.alert("Success", "Profile updated successfully");
      setEditMode(false);
    } else {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      age: profile?.age?.toString() || "",
      weight: profile?.weight?.toString() || "",
      height: profile?.height?.toString() || "",
    });
    setEditMode(false);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout? This will clear all your data.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            const success = await logout();
            if (!success) {
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient colors={["#E2852E", "#F4A460"]} style={styles.header}>
          <Text style={styles.headerEmoji}>👤</Text>
          <Text style={styles.headerName}>{profile?.name || "User"}</Text>
          <TouchableOpacity
            onPress={() => setEditMode(true)}
            style={styles.editButton}
          >
            <Ionicons name="create-outline" size={20} color="#ffffff" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon="barbell"
              value={stats.totalWorkouts}
              label="Total Workouts"
              gradientColors={["#E2852E", "#F4A460"]}
              style={styles.statCard}
            />
            <StatCard
              icon="flame"
              value={stats.totalCalories}
              label="Calories Burned"
              gradientColors={["#f59e0b", "#ef4444"]}
              style={styles.statCard}
            />
          </View>
          <View style={styles.statsGrid}>
            <StatCard
              icon="trophy"
              value={stats.streak.current}
              label="Current Streak"
              gradientColors={["#10b981", "#059669"]}
              style={styles.statCard}
            />
            <StatCard
              icon="calendar"
              value={stats.streak.longest}
              label="Longest Streak"
              gradientColors={["#87CEEB", "#4682B4"]}
              style={styles.statCard}
            />
          </View>
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{profile?.age} years</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{profile?.weight} kg</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Height</Text>
              <Text style={styles.infoValue}>{profile?.height} cm</Text>
            </View>
            {latestBMI && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>BMI</Text>
                  <Text style={[styles.infoValue, { color: latestBMI.color }]}>
                    {latestBMI.bmi} - {latestBMI.category}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View style={styles.logoutContent}>
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color={COLORS.danger}
                />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
              <Text style={styles.logoutSubtext}>
                Clear all data and return to setup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editMode}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.modalSave}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <CustomInput
              label="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter your name"
            />
            <CustomInput
              label="Age"
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
              placeholder="Enter your age"
              keyboardType="numeric"
              unit="years"
            />
            <CustomInput
              label="Weight"
              value={formData.weight}
              onChangeText={(text) =>
                setFormData({ ...formData, weight: text })
              }
              placeholder="Enter your weight"
              keyboardType="decimal-pad"
              unit="kg"
            />
            <CustomInput
              label="Height"
              value={formData.height}
              onChangeText={(text) =>
                setFormData({ ...formData, height: text })
              }
              placeholder="Enter your height"
              keyboardType="decimal-pad"
              unit="cm"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerEmoji: {
    fontSize: 64,
    marginBottom: SPACING.sm,
  },
  headerName: {
    fontSize: FONT_SIZES["3xl"],
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: SPACING.md,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: "#ffffff",
  },
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "bold",
    color: COLORS.light.text,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  infoLabel: {
    fontSize: FONT_SIZES.base,
    color: COLORS.light.textSecondary,
  },
  infoValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.light.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.light.border,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "bold",
    color: COLORS.light.text,
  },
  modalCancel: {
    fontSize: FONT_SIZES.base,
    color: COLORS.danger,
  },
  modalSave: {
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
    color: COLORS.primary,
  },
  modalContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  settingsCard: {
    backgroundColor: "#ffffff",
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  logoutButton: {
    paddingVertical: SPACING.sm,
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: 4,
  },
  logoutText: {
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
    color: COLORS.danger,
  },
  logoutSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.light.textSecondary,
    marginLeft: 32,
  },
});

export default ProfileScreen;
