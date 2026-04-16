# AarogyaSaathi

A React Native health app with a local mock data pipeline so the UI stays usable even when wearable data or backend services are unavailable.

# Getting Started

## Fast Setup For Android

If you only need the app running for a demo, install just these essentials:

1. Node.js LTS
2. Android Studio
3. Android SDK Platform 36
4. Android SDK Platform-Tools
5. Android Emulator, or a real Android phone with USB debugging enabled

Run the setup check first:

```sh
npm run verify:setup
```

If Android Studio is installed, the project is already configured to use its bundled JDK 17 for Gradle.

### Run on Emulator

```sh
npm start
npm run android
```

### Run on Real Phone

1. Enable Developer Options and USB debugging on the phone.
2. Connect the phone with a USB cable.
3. Confirm it is visible with `adb devices`.
4. Run:

```sh
npm start
npm run android
```

## App Behavior

The app uses local providers for health values and summary cards so the UI remains functional without Google Fit, Health Connect, wearable hardware, or backend APIs.

## If Android Setup Is Still Incomplete

Use the UI directly in a walkthrough or record a screen video from the app once it runs on any available emulator/device. The mock providers are intentionally isolated so the app can still present realistic values in a review.

## Step 1: Start Metro

First, run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window from the project root and build the Android app:

```sh
npm run android
```

If everything is set up correctly, you should see the app running in the Android Emulator or on your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, you can make changes.

Open [App.tsx](App.tsx) and make changes. When you save, Fast Refresh will update the app automatically.

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press <kbd>R</kbd> twice or use **Reload** from the Dev Menu.

## Congratulations! :tada:

You've successfully run and modified your React Native app.

### Now what?

- If you want to add this React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
