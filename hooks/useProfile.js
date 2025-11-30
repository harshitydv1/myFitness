import React, { createContext, useState, useEffect, useContext } from "react";
import { storeData, getData, clearAll, STORAGE_KEYS } from "../utils/storage";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile from storage on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getData(STORAGE_KEYS.USER_PROFILE);
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (profileData) => {
    try {
      await storeData(STORAGE_KEYS.USER_PROFILE, profileData);
      setProfile(profileData);
      return true;
    } catch (error) {
      console.error("Error saving profile:", error);
      return false;
    }
  };

  const updateProfile = async (updates) => {
    try {
      const updatedProfile = { ...profile, ...updates };
      await storeData(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      setProfile(updatedProfile);
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

  const hasProfile = () => {
    return (
      profile !== null &&
      profile.name &&
      profile.age &&
      profile.weight &&
      profile.height
    );
  };

  const logout = async () => {
    try {
      await clearAll();
      setProfile(null);
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        saveProfile,
        updateProfile,
        hasProfile,
        logout,
        reload: loadProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
