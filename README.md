# 🎓 CEM CSI Event Manager

Maintainer: [Jaysmit Chaudhari](https://github.com/KRlPER)

**CEM CSI Event Manager** is a mobile application built with **React Native (Expo)** to help college committees (especially CSI) efficiently manage student data, events, and communication.  
It enables organizers to create, manage, and track events while allowing students to register, update their profiles, and participate seamlessly.

---

## ✨ Features (Planned & Ongoing)

- 🔐 **User Authentication** (Firebase Authentication for Students & Leads)
- 🧑‍🎓 **Student Module** – Register, update profile, and explore events
- 🧑‍💼 **Leads Module** – Create and manage events, teams, and volunteers
- 📅 **Event Management System** – Create, update, and view event details
- 👥 **Team & Volunteer Management** – Add students to teams easily
- 🔔 **Notifications System** – Real-time updates for new events or changes
- 📊 **Dashboard Analytics** *(Upcoming)* – Attendance & engagement reports
- 🎨 **Modern UI** – Smooth navigation with custom drawers and screens
- ⚙️ **Firebase Integration** – Real-time data storage and authentication

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Framework** | React Native (Expo SDK) |
| **Frontend** | React Navigation, Custom Components, Drawer Navigation |
| **Backend** | Firebase Realtime Database / Firestore |
| **Auth** | Firebase Authentication |
| **UI Enhancements** | React Native Paper / Elements, Icons |
| **State Management** | React Context / Hooks |
| **Tools** | EAS (Expo Application Services) |


---

## 📂 Project Structure

```
CEM/
├── assets/ # Images, icons, and static resources
├── components/ # Shared components
│ ├── CustomDrawerContent.js
│ └── LeadsHomeDrawer.js
│
├── pages/ # Application screens
│ ├── AddStudentsToTeamScreen.js
│ ├── CreateEventScreen.js
│ ├── CreateProfile.js
│ ├── EventDetailsScreen.js
│ ├── LeadsHome.js
│ ├── LeadsLoginScreen.js
│ ├── LeadsSignupScreen.js
│ ├── ProfileDetailsScreen.js
│ ├── ProfileScreen.js
│ ├── SignupScreen.js
│ └── StudentScreen.js
│
├── App.js # Root file with navigation setup
├── firebaseConfig.js # Firebase setup
├── app.json # Expo configuration
├── babel.config.js # Babel setup
├── eas.json # EAS build configuration
├── index.js # Entry point
└── .gitignore

```
