# 🚀 Expo + Next.js Starter

This is a monorepo project that uses **pnpm** as the package manager. It's designed as a simplified version of the T3 stack template, providing a lightweight starting point for full-stack React Native and Next.js applications.

## ℹ️ About This Template

This template leverages many of the TypeScript settings and structure from the T3 stack but is intentionally built with minimal dependencies. This gives developers the freedom to choose their preferred libraries for:

- **Database**: Choose your own ORM and database provider (Prisma, Drizzle, etc.)
- **Authentication**: Implement your preferred auth solution (Auth.js, Clerk, Supabase, etc.)
- **State Management**: Add your preferred state management library (Zustand, Jotai, Redux, etc.)
- **API Layer**: Use tRPC, REST, GraphQL, or any other API solution

The goal is to provide a solid foundation with strong TypeScript support while letting you build your application with the tools you prefer.

## 📦 Package Manager

This project **requires pnpm** and will prevent installation with npm or yarn.

### 🛠️ Installation

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

### 🏁 Getting Started

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm native          # Start Expo dev server
pnpm web           # Start Next.js dev server
```

### 🏷️ Package Naming Convention

In this template, we use `@acme` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name.

## 📱 Expo

Deploying your Expo application works slightly differently compared to Next.js on the web. Instead of "deploying" your app online, you need to submit production builds of your app to app stores, like [Apple App Store](https://www.apple.com/app-store) and [Google Play](https://play.google.com/store/apps). You can read the full [guide to distributing your app](https://docs.expo.dev/distribution/introduction), including best practices, in the Expo docs.

1. Let's start by setting up [EAS Build](https://docs.expo.dev/build/introduction), which is short for Expo Application Services. The build service helps you create builds of your app, without requiring a full native development setup. The commands below are a summary of [Creating your first build](https://docs.expo.dev/build/setup).

   ```bash
   # Install the EAS CLI
   pnpm add -g eas-cli

   # Log in with your Expo account
   eas login

   # Configure your Expo app
   cd apps/expo
   eas build:configure
   ```

2. After the initial setup, you can create your first build. You can build for Android and iOS platforms and use different [`eas.json` build profiles](https://docs.expo.dev/build-reference/eas-json) to create production builds or development, or test builds. Let's make a production build for iOS.

   ```bash
   eas build --platform ios --profile production
   ```

   > If you don't specify the `--profile` flag, EAS uses the `production` profile by default.

3. Now that you have your first production build, you can submit this to the stores. [EAS Submit](https://docs.expo.dev/submit/introduction) can help you send the build to the stores.

   ```bash
   eas submit --platform ios --latest
   ```

   > You can also combine build and submit in a single command, using `eas build ... --auto-submit`.

4. Before you can get your app in the hands of your users, you'll have to provide additional information to the app stores. This includes screenshots, app information, privacy policies, etc. _While still in preview_, [EAS Metadata](https://docs.expo.dev/eas/metadata) can help you with most of this information.

5. Once everything is approved, your users can finally enjoy your app. Let's say you spotted a small typo; you'll have to create a new build, submit it to the stores, and wait for approval before you can resolve this issue. In these cases, you can use EAS Update to quickly send a small bugfix to your users without going through this long process. Let's start by setting up EAS Update.

   The steps below summarize the [Getting started with EAS Update](https://docs.expo.dev/eas-update/getting-started/#configure-your-project) guide.

   ```bash
   # Add the `expo-updates` library to your Expo app
   cd apps/expo
   pnpm expo install expo-updates

   # Configure EAS Update
   eas update:configure
   ```

6. Before we can send out updates to your app, you have to create a new build and submit it to the app stores. For every change that includes native APIs, you have to rebuild the app and submit the update to the app stores. See steps 2 and 3.

7. Now that everything is ready for updates, let's create a new update for `production` builds. With the `--auto` flag, EAS Update uses your current git branch name and commit message for this update. See [How EAS Update works](https://docs.expo.dev/eas-update/how-eas-update-works/#publishing-an-update) for more information.

   ```bash
   cd apps/expo
   eas update --auto
   ```

   > Your OTA (Over The Air) updates must always follow the app store's rules. You can't change your app's primary functionality without getting app store approval. But this is a fast way to update your app for minor changes and bug fixes.

8. Done! Now that you have created your production build, submitted it to the stores, and installed EAS Update, you are ready for anything!

## 📚 References

## 🙏 Acknowledgements and Special Thanks

This project draws inspiration from the [T3 Turbo Stack](https://github.com/t3-oss/create-t3-turbo). Special thanks to the entire [T3 team](https://github.com/t3-oss) for their pioneering work in creating a type-safe, full-stack development experience. This template simplifies their approach while maintaining the core architectural principles.

The T3 Turbo Stack has been instrumental in shaping best practices for React Native and Next.js monorepos. We're grateful for their contributions to the developer community.

- [T3 Turbo GitHub Repository](https://github.com/t3-oss/create-t3-turbo)
- [T3 Stack Documentation](https://create.t3.gg/)
