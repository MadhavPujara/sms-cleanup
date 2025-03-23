# Bulk SMS Deletion App

A mobile application built with Expo, React Native, and Node.js that allows users to delete multiple SMS messages at once. The app features a modern UI using Tailwind CSS and provides a seamless user experience for managing SMS messages.

## Features

- List all SMS messages
- Bulk selection and deletion
- Filter messages by sender, content, and date range
- Dark/Light mode support
- Message backup and restore
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bulk-sms-deletion.git
cd bulk-sms-deletion
```

2. Install dependencies:

```bash
cd app
npm install
```

3. Start the development server:

```bash
npx expo start
```

## Development

- iOS: Press `i` in the terminal or run `npx expo run:ios`
- Android: Press `a` in the terminal or run `npx expo run:android`
- Web: Press `w` in the terminal or run `npx expo run:web`

## Project Structure

```
bulk-sms-deletion/
├── app/                    # Expo app directory
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable components
│   ├── screens/           # App screens
│   ├── navigation/        # Navigation configuration
│   └── utils/             # Helper functions
├── server/                # Node.js backend
│   ├── src/
│   ├── routes/
│   └── config/
└── docs/                  # Documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Expo
- React Native
- NativeWind
- React Navigation
