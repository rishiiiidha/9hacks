# NTL App

The NTL App is an exclusive mobile application built with React Native for NTL members, providing monthly insights, dynamic project management, and personalized performance ratings. The app serves associates, members, and syndicates by offering a platform for project review, approval, and display.

## Key Features

### Role-Based Access
- **Associates & Members**:
  - View monthly performance insights and past data.
  - Access personalized suggestions and reviews.
  - Manage and update projects directly within the app.
- **Syndicates**:
  - Approve or reject submitted projects in real-time.
  - Approved projects can be  dynamically added to NTL’s website and displayed on the app for members to view.

### Project Management
- **Dynamic Project Approval**: Syndicates can approve projects, making them instantly available on the NTL platform and accessible to all members.
- **Display of Approved Projects**: All approved projects are showcased for easy visibility, ensuring transparency and keeping all members updated.

### Data Insights & History
- **Monthly Insights**: Tap on a month to view detailed insights, including performance reviews, dates, and personalized feedback.
- **Historical Data Access**: Members can retrieve and review past performance data, enabling easy tracking of progress over time.

### Real-Time Data and Design
- **Dynamic Data Fetching**: Integrates data dynamically from a remote API, that gets the updated data.
- **Ratings Visualization**: Displays performance ratings with star icons for intuitive understanding.

## Additional Capabilities

- **Project Showcase**: Highlights top projects from lab participants, allowing associates and members to display accomplishments.
- **Role-Based Insights**: Different levels of access and insight visibility based on user role (associate, member, syndicate), ensuring appropriate information access and decision-making.

This application is built with React Native, optimized for iOS and Android, and is designed with a focus on seamless interaction and real-time updates for an enhanced user experience.




## Tech Stack

- **Frontend**: React Native, Expo
- **Backend API**: Hosted RESTful API (for dynamic data fetching)
- **Icons and Styling**: FontAwesome for icons, custom styling for a polished UI
- **Local Storage**: JSON data used for offline content

## Setup Instructions

To run the NTL App locally, follow these steps:

### Prerequisites

1. **Node.js and npm** (Node v14 or higher)
2. **Expo CLI**:
    ```bash
    npm install -g expo-cli
    ```
3. **Android Studio or Xcode** (Optional for emulators)

### Steps to Set Up

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/ntl-app.git
    ```
   Replace `yourusername` with your GitHub username or the repository URL.

2. **Navigate to Project Directory**
    ```bash
    cd ntl-app
    ```

3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add necessary environment variables, such as API endpoints and keys.

5. **Start the Development Server**
    ```bash
    expo start
    ```
   This starts the Expo development server and opens the Expo DevTools in your browser.

6. **Run on Device or Emulator**
   - **Using Expo Go**: Scan the QR code shown in Expo DevTools.
   - **Using Emulator**:
     - **iOS** (Mac with Xcode): Press `i` in the Expo CLI.
     - **Android**: Press `a` in the Expo CLI.

### Additional Commands

- **Linting**: Check code quality with ESLint.
    ```bash
    npm run lint
    ```
- **Testing**: Run unit tests (if configured).
    ```bash
    npm test
    ```

### Troubleshooting

- **Clear Cache**:
    ```bash
    expo start -c
    ```
- **Reinstall Dependencies**:
    ```bash
    rm -rf node_modules && npm install
    ```

