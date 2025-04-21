# Historical Image Gallery & Quiz Application

A modern React application that combines historical image exploration with interactive quizzes. Built with Vite and React, this application offers a seamless user experience with features like dark mode, responsive design, and interactive quizzes.

![Application Preview](public/preview.png)

## 🎯 Project Overview

This project is built as part of the End Term React Project, demonstrating proficiency in modern frontend development using React.js and related technologies.

## ✨ Features

- 🖼️ **Interactive Image Gallery**
  - Responsive grid layout
  - Search functionality with real-time results
  - Image attribution and details
  - Lightbox view for images
  - API integration for dynamic content

- 📝 **Interactive Quiz System**
  - Topic-based quizzes with dynamic loading
  - Real-time feedback and scoring
  - Progress tracking
  - Form validation
  - API integration for quiz data

- 📱 **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly interface
  - Cross-browser compatibility

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd vite-project
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables
```env
VITE_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 (Functional Components + Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Code Quality**: ESLint
- **Version Control**: Git & GitHub

## 📁 Project Structure

```
vite-project/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   └── HistoryCard.jsx
│   ├── pages/         # Page components
│   │   ├── Gallery.jsx
│   │   ├── Quiz.jsx
│   │   └── Home.jsx
│   ├── context/       # React context providers
│   │   └── ThemeContext.jsx
│   └── App.jsx        # Main application component
├── public/            # Static assets
└── package.json       # Project dependencies
```

## 🎨 Features in Detail

### Image Gallery
- Search through historical images with API integration
- Filter by categories
- View image details and attribution
- Responsive grid layout
- Lightbox view for full-size images
- Error handling and loading states

### Quiz System
- Multiple choice questions with API integration
- Topic-based quizzes
- Score tracking with Context API
- Progress indicators
- Form validation
- Immediate feedback


## deployed link - https://knowledgeexplore.netlify.app/





