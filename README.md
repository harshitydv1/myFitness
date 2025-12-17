# MyFitness - Complete Fitness Tracking Application

A modern, feature-rich fitness tracking mobile application built with React Native and Expo. Track your workouts, monitor water intake, calculate BMI, and maintain your fitness journey with comprehensive progress analytics.

## 🌟 Features

### 🏠 **Home Dashboard**

- Personalized greeting with time-based messages
- Today's progress overview (workouts, water intake, streak)
- Quick action buttons for instant access
- Motivational quotes to keep you inspired
- Real-time statistics display

### 💪 **Workout Management**

- **10+ Predefined Workouts** across multiple categories
- **Interactive Workout Timer** with pause/resume functionality
- **Category Filtering**: Full Body, Abs, Chest & Arms, Legs, Yoga
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Exercise Details** with duration and calorie information
- **Workout Completion Tracking** with timestamps

### 📊 **Progress Tracking**

- **Workout History** with detailed logs
- **Streak Tracking** (current and longest streaks)
- **Calorie Tracking** across all workouts
- **BMI Calculator** with color-coded health categories
- **Water Intake Monitor** with daily goals (8 glasses/day)
- **Statistical Analytics** for long-term progress

### 👤 **Profile Management**

- **Complete User Profile** (name, age, weight, height)
- **Editable Profile Information** with form validation
- **Progress Statistics** overview
- **BMI Integration** with latest calculations
- **Logout Functionality** with data clearing option

### 🎨 **Modern UI/UX**

- **Warm Color Palette** (Orange, Gold, Sky Blue themes)
- **Gradient Backgrounds** for enhanced visual appeal
- **Card-Based Design** with shadows and animations
- **Responsive Layout** for different screen sizes
- **Intuitive Navigation** with bottom tabs

## 🛠️ Technology Stack

- **Framework**: React Native with Expo SDK
- **Language**: JavaScript (ES6+)
- **Navigation**: React Navigation v6 (Stack + Bottom Tabs)
- **Storage**: AsyncStorage for local data persistence
- **Styling**: Custom theme system with gradients
- **Icons**: Expo Vector Icons (Ionicons)
- **Components**: Custom reusable component library

## 📱 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/harshitydv1/myFitness.git
   cd myFitness
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your device**:
   - **Mobile**: Scan QR code with Expo Go app
   - **iOS Simulator**: Press `i` in terminal
   - **Android Emulator**: Press `a` in terminal

## 📁 Project Architecture

```
myFitness/
├── 📱 App.js                   # Main application entry point
├── ⚙️ app.json                 # Expo configuration
├── 📦 package.json             # Dependencies and scripts
├── 🔧 babel.config.js          # Babel transpiler config
├── 🎨 tailwind.config.js       # Tailwind CSS configuration
├── 🚀 start.sh                 # Quick start script
│
├── 🖼️ assets/                  # Static assets
│
├── 🧩 components/              # Reusable UI components
│   ├── CustomButton.js         # Styled button component
│   ├── CustomInput.js          # Form input component
│   ├── Header.js               # Screen header component
│   ├── WorkoutCard.js          # Workout display card
│   ├── HistoryCard.js          # History item display
│   └── StatCard.js             # Statistics display card
│
├── 🎯 constants/               # App-wide constants
│   └── theme.js                # Color themes and styling
│
├── 📊 data/                    # Static data files
│   └── workouts.json           # Predefined workout library
│
├── 🎣 hooks/                   # Custom React hooks
│   ├── useProfile.js           # User profile management
│   ├── useWorkoutHistory.js    # Workout tracking logic
│   ├── useWaterTracker.js      # Water intake tracking
│   ├── useBMI.js               # BMI calculations
│   └── useLocalStorage.js      # Storage utilities
│
├── 🧭 navigation/              # Navigation configuration
│   ├── AppNavigator.js         # Main navigation stack
│   └── BottomTabNavigator.js   # Bottom tab navigation
│
├── 📱 screens/                 # Application screens
│   ├── OnboardingScreen.js     # User setup flow
│   ├── HomeScreen.js           # Dashboard/home screen
│   ├── WorkoutsScreen.js       # Workout library
│   ├── WorkoutDetailsScreen.js # Individual workout view
│   ├── HistoryScreen.js        # Workout history
│   ├── ProfileScreen.js        # User profile & settings
│   ├── BMICalculatorScreen.js  # BMI calculation tool
│   └── WaterTrackerScreen.js   # Water intake tracker
│
└── 🛠️ utils/                   # Utility functions
    ├── storage.js              # AsyncStorage helpers
    └── calculations.js         # Math & date utilities
```

## 🎯 Core Features Deep Dive

### 🏃‍♂️ **Workout System**

- **Categories**: Full Body, Abs, Chest & Arms, Legs, Yoga
- **Difficulty Levels**: Color-coded (Beginner: Green, Intermediate: Orange, Advanced: Red)
- **Timer Functionality**: Built-in workout timer with pause/resume
- **Progress Tracking**: Automatic completion logging with timestamps
- **Calorie Estimation**: Estimated calories burned per workout

### 📈 **Analytics & Progress**

- **Streak Tracking**: Current and longest workout streaks
- **Historical Data**: Complete workout history with date/time
- **Statistics**: Total workouts, calories burned, consistency metrics
- **BMI Monitoring**: Track BMI changes over time
- **Water Goals**: Daily hydration tracking (8 glasses target)

### 🎨 **Design System**

- **Color Palette**: Warm orange (#E2852E), Gold (#F0C674), Sky Blue (#87CEEB)
- **Typography**: System fonts with consistent sizing scale
- **Components**: Reusable, themed components with gradient backgrounds
- **Spacing**: Consistent spacing system (4, 8, 16, 24, 32, 48px)
- **Shadows**: Subtle shadow system for depth

## 💾 Data Management

### Storage Architecture

All data is stored locally using AsyncStorage with the following keys:

- `@fittrack_user_profile`: User information (name, age, weight, height)
- `@fittrack_workout_history`: Array of completed workouts
- `@fittrack_water_intake`: Daily water consumption data
- `@fittrack_bmi_results`: BMI calculation history
- `@fittrack_last_water_date`: Last water tracking date for auto-reset

### Data Structure Examples

```javascript
// User Profile
{
  name: "John Doe",
  age: 25,
  weight: 70,
  height: 175
}

// Workout History Entry
{
  id: "uuid",
  workoutId: "workout_1",
  name: "Full Body HIIT",
  duration: 30,
  calories: 300,
  date: "2025-11-30T10:30:00Z",
  difficulty: "Intermediate"
}

// Water Intake
{
  glasses: 6,
  lastUpdate: "2025-11-30",
  goal: 8
}
```

## 🔧 Development Guide

### Available Scripts

```bash
# Start development server
npm start

# Start with specific platform
npm run android
npm run ios
npm run web

# Build for production
npm run build

# Clear cache and restart
npm run clear-cache
```

### Adding New Workouts

1. Edit `data/workouts.json`
2. Follow existing structure:

```javascript
{
  "id": "unique_id",
  "name": "Workout Name",
  "description": "Brief description",
  "duration": 30,
  "calories": 250,
  "difficulty": "Beginner|Intermediate|Advanced",
  "category": "Full Body|Abs|Chest & Arms|Legs|Yoga",
  "image": "🏃‍♂️",
  "exercises": [...]
}
```

### Customizing Theme

Update `constants/theme.js` to modify colors, spacing, or typography:

```javascript
export const COLORS = {
  primary: "#E2852E", // Main orange
  secondary: "#F0C674", // Gold
  info: "#87CEEB", // Sky blue
  // ... other colors
};
```

## 🚀 Deployment

### Building for Production

1. **Expo Build Service**:

   ```bash
   expo build:android
   expo build:ios
   ```

2. **Local Builds** (Expo CLI v6+):
   ```bash
   npx expo run:android --variant release
   npx expo run:ios --configuration Release
   ```

### App Store Preparation

- Update `app.json` with proper metadata
- Prepare app icons and splash screens
- Test on physical devices
- Review platform-specific guidelines

## 📝 API Reference

### Custom Hooks

#### `useProfile()`

```javascript
const {
  profile, // Current user profile
  loading, // Loading state
  saveProfile, // Save new profile
  updateProfile, // Update existing profile
  hasProfile, // Check if profile exists
  logout, // Clear all data and logout
  reload, // Reload profile from storage
} = useProfile();
```

#### `useWorkoutHistory()`

```javascript
const {
  history, // Array of workout history
  addWorkout, // Add new workout
  clearHistory, // Clear all history
  getStats, // Get workout statistics
} = useWorkoutHistory();
```

#### `useWaterTracker()`

```javascript
const {
  waterIntake, // Current glasses consumed
  addGlass, // Add one glass
  removeGlass, // Remove one glass
  dailyGoal, // Daily goal (8 glasses)
  percentage, // Progress percentage
} = useWaterTracker();
```

#### `useBMI()`

```javascript
const {
  bmiHistory, // Array of BMI calculations
  addBMI, // Add new BMI calculation
  getLatestBMI, // Get most recent BMI
  clearHistory, // Clear BMI history
} = useBMI();
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**:

   ```bash
   npx expo start --clear
   ```

2. **AsyncStorage errors**:

   - Clear app data or reinstall on device
   - Check for storage quota limits

3. **Navigation issues**:

   - Ensure proper screen registration
   - Check navigation stack structure

4. **Build errors**:
   - Update Expo CLI: `npm install -g @expo/cli`
   - Clear node_modules: `rm -rf node_modules && npm install`


## 📞 Contact

- **Developer**: Harshit
- **GitHub**: [@harshitydv1](https://github.com/harshitydv1)
- **Repository**: [MyFitness](https://github.com/harshitydv1/myFitness)
