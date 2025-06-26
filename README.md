# TaskNest

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://kusuma-tasknet.netlify.app/)

A modern task management application built with React and TypeScript, featuring both board-based task management and comprehensive dashboard views for managers and employees.

## Features

### Data Persistence Status
- 📋 Board Views: Integrated with Local Storage
  - Boards, columns, and tasks persist across sessions
  - Changes saved automatically

- 📊 Dashboard Views: Sample Data Only
  - Uses static sample data
  - Future implementation with local storage planned

### Core Features
- 📋 Board-based Task Management
  - Create and manage multiple boards
  - Organize tasks into columns
  - Drag and drop task management
  - Assign tasks to team members
  - Set priorities and due dates

- 📊 Manager Dashboard
  - Team performance overview
  - Project progress tracking
  - Resource allocation visualization
  - Time tracking analytics
  - Team member metrics

- 👤 Employee Dashboard
  - Personal task overview
  - Task completion tracking
  - Assigned tasks management
  - Time tracking
  - Notifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tasknest.git
cd tasknest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will start at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard components
│   ├── boards/          # Board-related components
│   └── ui/              # Base UI components
├── pages/               # Page-level components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## Navigation

The application offers three main navigation paths:

1. **Board View** (Default)
   - Main page showing all boards
   - Create new boards
   - View and manage existing boards
   - Access manager/employee dashboards from header

2. **Board Detail View**
   - Access by clicking on a board
   - Shows tasks organized in columns
   - Drag and drop task management
   - Create, edit, and delete tasks

3. **Dashboard Views**
   - Manager Dashboard
     - Team overview and analytics
     - Project progress
     - Resource allocation
   
   - Employee Dashboard
     - Personal task overview
     - Time tracking
     - Notifications

## Development

### Available Scripts

- `npm start` - Starts the development server
- `npm test` - Runs the test suite
- `npm run build` - Builds the app for production
- `npm run eject` - Removes single build dependency

### Development Tools

- React 18+
- TypeScript
- React Router v6
- Tailwind CSS
- Radix UI
- Lucide React Icons
- Recharts (for dashboard visualizations)
- Local Storage (for board data)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
