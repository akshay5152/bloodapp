# BloodApp

A comprehensive **blood donation and management application** built with **React 19**, **TypeScript**, and **Capacitor**. BloodApp helps connect blood donors with recipients, track donations, and manage blood inventory efficiently.

## 🎯 Overview

BloodApp is a mobile-first web application that streamlines the blood donation process. It provides donors with tools to track their donation history, schedule appointments, and connect with local blood banks, while recipients can search for available blood and request donations from verified donors.

## ✨ Key Features

- **📱 Mobile-First Design**: Responsive design optimized for mobile devices using Capacitor
- **📊 Charts & Analytics**: Interactive blood donation statistics with Chart.js
- **🔐 Secure Authentication**: User authentication and authorization
- **📍 Donor Locator**: Find nearby blood donors and blood banks
- **📅 Appointment Scheduling**: Schedule and manage donation appointments
- **📋 Donation History**: Track personal donation records
- **🗂️ Blood Inventory Management**: Real-time blood type and quantity tracking
- **🔔 Notifications**: Stay updated with donation requests and appointments
- **🌐 Cross-Platform**: Web and native mobile support via Capacitor

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | [React 19](https://react.dev/) |
| **Bundler** | [Create React App](https://create-react-app.dev/) |
| **Language** | TypeScript 4.9 |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Charts** | [Chart.js 4.5](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) |
| **Mobile** | [Capacitor 7.4](https://capacitorjs.com/) (Android support) |
| **Testing** | Jest + React Testing Library |
| **Styling** | CSS + Tailwind CSS (optional) |

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16.x or higher
- **npm** or **yarn**
- **Android SDK** (for native Android build with Capacitor)
- **Java Development Kit (JDK)** v11 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshay5152/bloodapp.git
   cd bloodapp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run test suite in watch mode |
| `npm run eject` | Eject from Create React App (irreversible) |

## 📱 Mobile Development with Capacitor

### Build for Android

```bash
# Copy web assets to Capacitor
npx cap copy

# Open Android Studio
npx cap open android
```

### Build & Deploy Android APK

```bash
# Build release APK
./gradlew assembleRelease

# Install on device
adb install -r android/app/release/app-release.apk
```

## 📊 Key Components

- **DonationMap**: Locate nearby blood donors and banks
- **AppointmentScheduler**: Schedule and manage appointments
- **BloodInventory**: Track blood types and quantities
- **DonationHistory**: View personal donation records
- **Analytics Dashboard**: View donation statistics with interactive charts
- **UserProfile**: Manage user information and preferences

## 🔌 API Integration

BloodApp expects a backend API for:
- User authentication
- Donor/recipient management
- Blood inventory data
- Appointment scheduling
- Notification system

Configure your API endpoint in environment variables.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Tests include:
- Component tests with React Testing Library
- Unit tests for utility functions
- Integration tests for critical flows

## 🎨 Styling & Customization

- **Responsive Layout**: Mobile-first CSS approach
- **Color Scheme**: Customizable via CSS variables
- **Tailwind CSS Ready**: Can be integrated for utility-first styling

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

## 📚 Documentation & Resources

- [React Documentation](https://react.dev/)
- [Capacitor Documentation](https://capacitorjs.com/docs/)
- [Chart.js Guide](https://www.chartjs.org/docs/latest/)
- [React Router Docs](https://reactrouter.com/docs)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 💬 Support

For issues, questions, or suggestions, please open an [GitHub Issue](https://github.com/akshay5152/bloodapp/issues).

---

**Built by**: Akshay  
**Last Updated**: 2026  
**Maintained**: ✅ Active
