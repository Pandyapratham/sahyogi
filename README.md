# Sahayogi - Senior Support Platform

Sahayogi is a web application that connects seniors with volunteers who can provide assistance with daily tasks, companionship, and more. This platform aims to help seniors maintain their independence and improve their quality of life.

## Features

- **User Authentication**: Separate flows for elderly users and volunteers
- **Help Request Management**: Create, track, and manage help requests
- **Volunteer Matching**: Find and connect with verified volunteers
- **Profile Management**: Customize profiles and preferences
- **Accessibility Features**: Designed with seniors in mind, including font size options and high contrast mode
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **UI Components**: HeroUI
- **State Management**: React Context API
- **Routing**: React Router
- **Data Persistence**: localStorage (for demo purposes)
- **Icons**: Iconify with Lucide icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sahayogi.git
   cd sahayogi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/          # React context providers
├── data/              # Mock data and helper functions
├── layouts/           # Page layout components
├── pages/             # Page components
│   ├── auth/          # Authentication pages
│   ├── elderly/       # Elderly user pages
│   └── volunteer/     # Volunteer pages
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## User Flows

### Elderly Users

1. Register/Login as a senior
2. Create help requests
3. Browse and connect with volunteers
4. Track request status
5. Manage profile and preferences

### Volunteers

1. Register/Login as a volunteer
2. Browse available help requests
3. Accept requests and provide assistance
4. Track active and completed tasks
5. Manage profile, skills, and availability

## Demo Accounts

For demonstration purposes, you can use these pre-configured accounts:

- **Elderly User**:
  - Email: elderly@example.com
  - Password: password

- **Volunteer**:
  - Email: volunteer@example.com
  - Password: password

## Accessibility Features

- Larger font sizes and controls
- High contrast mode option
- Simple, intuitive navigation
- Consistent layout and design
- Keyboard navigation support
- Screen reader friendly elements

## Future Enhancements

- Real-time messaging between seniors and volunteers
- Location-based matching
- Background checks for volunteers
- Mobile app versions
- Integration with healthcare providers
- Emergency assistance features

## License

This project is licensed under the MIT License - see the LICENSE file for details.
