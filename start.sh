#!/bin/bash

# Try to increase file descriptor limit to the maximum allowed
ulimit -n 65536 2>/dev/null || ulimit -n 10240 2>/dev/null || ulimit -n 4096

# Start Expo with clear cache to ensure clean state
npx expo start --clear
