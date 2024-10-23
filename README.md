# Follicle Calculator 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- **Consultation Assistance**: The app helps in performing calculations during hair transplant consultations.
- **PDF Export**: After the consultation, the app generates a PDF report that can be integrated into medical journals or provided to patients for post-operative documentation.
- **Surgical Assistance**: During the surgery, the app assists in organizing hair follicle extractions and allows the information to be displayed on an external monitor for the surgeon's convenience.

## Get started

Install dependencies

   ```bash
   npm install
   ```

Start the app

   ```bash
   npx expo start
   ```

Build the app online

   ```bash
   eas build
   ```
Build the app locally

   ```bash
    npx expo prebuild
   ```

### Create an APK from AAB

Install Java

Download bundle tool

   ```bash
   wget https://github.com/google/bundletool/releases/download/1.17.1/bundletool-all-1.17.1.jar
   ```

Generate APK 

   ```bash
   java -jar bundletool-all-1.17.1.jar build-apks --bundle={path/to/your-app}.aab --output=output.apks --mode=universal
   ```

Extract the APK

   ```bash
   unzip output.apks -d output-folder
   ```










