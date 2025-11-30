# FitTrack - Fitness Tracking App

A complete, production-ready fitness tracking application built with React Native (Expo), featuring workout tracking, BMI calculation, water intake monitoring, and comprehensive progress analytics.

## 🚀 Features

- **Onboarding Flow**: Personalized user profile setup
- **Home Dashboard**: Daily progress summary with quick actions
- **Workout Library**: 10+ predefined workouts across 5 categories
- **Workout Tracking**: Timer, exercise progression, and completion tracking
- **History**: Complete workout history with date/time tracking
- **Profile Management**: Edit user info and view comprehensive stats
- **BMI Calculator**: Calculate and track BMI with color-coded results
- **Water Tracker**: Daily water intake monitoring with auto-reset
- **Progress Analytics**: Streak tracking, total workouts, calories burned

## 📱 Tech Stack

- **Framework**: React Native (Expo)
- **Language**: JavaScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Storage**: AsyncStorage (local data persistence)
- **Styling**: NativeWind/Tailwind CSS
- **UI Components**: Expo Vector Icons, Expo Linear Gradient

## 📁 Project Structure

```
MYFITNESS/
├── App.js                      # Main app entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── babel.config.js             # Babel configuration
├── tailwind.config.js          # Tailwind configuration
├── assets/                     # Images and icons
├── components/                 # Reusable components
│   ├── CustomButton.js
│   ├── CustomInput.js
│   ├── Header.js
│   ├── WorkoutCard.js
│   ├── HistoryCard.js
│   └── StatCard.js
├── constants/                  # Theme and constants
│   └── theme.js
├── data/                       # Static data
│   └── workouts.json
├── hooks/                      # Custom hooks
│   ├── useProfile.js
│   ├── useWorkoutHistory.js
│   ├── useWaterTracker.js
│   └── useBMI.js
├── navigation/                 # Navigation setup
│   ├── AppNavigator.js
│   └── BottomTabNavigator.js
├── screens/                    # App screens
│   ├── OnboardingScreen.js
│   ├── HomeScreen.js
│   ├── WorkoutsScreen.js
│   ├── WorkoutDetailsScreen.js
│   ├── HistoryScreen.js
│   ├── ProfileScreen.js
│   ├── BMICalculatorScreen.js
│   └── WaterTrackerScreen.js
└── utils/                      # Utility functions
    ├── storage.js
    └── calculations.js
```

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npx expo start
   ```

3. **Run on your device**:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 📊 Data Storage

All data is stored locally using AsyncStorage:
- **User Profile**: Name, age, weight, height
- **Workout History**: Completed workouts with timestamps
- **Water Intake**: Daily water consumption (auto-resets)
- **BMI Results**: BMI calculation history

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations
- Card-based UI with shadows
- Color-coded categories and stats
- Responsive layout
- Clean, intuitive navigation

## 📝 Workout Categories

1. **Full Body** - Complete body workouts
2. **Abs** - Core strengthening exercises
3. **Chest & Arms** - Upper body workouts
4. **Legs** - Lower body exercises
5. **Yoga** - Flexibility and mindfulness

## 🏆 Features Breakdown

### Onboarding
- User profile creation
- Input validation
- Smooth gradient design

### Home Screen
- Personalized greeting
- Today's progress summary
- Quick action buttons
- Motivational quotes
- Stats overview

### Workouts
- Category filtering
- 10 predefined workouts
- Detailed exercise instructions
- Workout timer
- Completion tracking

### History
- Chronological workout list
- Date/time display
- Clear history option
- Empty state handling

### Profile
- User information display
- Edit profile functionality
- Comprehensive stats (workouts, calories, streaks)
- BMI integration

### BMI Calculator
- Weight/height inputs
- Real-time calculation
- Color-coded results
- Category reference guide

### Water Tracker
- Visual intake display
- Progress bar
- Glass counter (8 glasses goal)
- Daily auto-reset
- Hydration tips

## 🔄 State Management

Custom hooks for data management:
- `useProfile`: User profile CRUD operations
- `useWorkoutHistory`: Workout tracking and stats
- `useWaterTracker`: Water intake with daily reset
- `useBMI`: BMI calculation and history

## 🎯 Future Enhancements

- Custom workout creation
- Exercise images/GIFs
- Dark mode toggle
- Workout reminders
- Export data functionality
- Social sharing
- Achievement badges
- Step counter integration (Expo Pedometer)

## 📄 License

This project is open source and available for personal and educational use.

## 👨‍💻 Development

Built with ❤️ using React Native and Expo.

---

**Note**: This is a frontend-only application. All data is stored locally on the device using AsyncStorage.
