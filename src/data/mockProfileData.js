export const mockProfileData = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2024-01-15',
    avatar: null, // We'll use initials instead of an actual image
    role: 'Student'
  },
  progress: {
    totalQuizzesTaken: 12,
    averageScore: 85,
    topicsExplored: 5,
    learningStreak: 7, // days
    topicProgress: [
      { topic: 'World War II', progress: 75, quizzesTaken: 4 },
      { topic: 'Ancient Rome', progress: 60, quizzesTaken: 3 },
      { topic: 'Renaissance', progress: 40, quizzesTaken: 2 },
      { topic: 'Industrial Revolution', progress: 25, quizzesTaken: 2 },
      { topic: 'Cold War', progress: 10, quizzesTaken: 1 }
    ]
  },
  recentActivity: [
    {
      id: 1,
      type: 'quiz',
      topic: 'World War II',
      score: 90,
      date: '2024-04-19T14:30:00Z',
      details: 'Completed World War II Quiz #4'
    },
    {
      id: 2,
      type: 'topic',
      topic: 'Ancient Rome',
      date: '2024-04-18T10:15:00Z',
      details: 'Started learning about Ancient Rome'
    },
    {
      id: 3,
      type: 'quiz',
      topic: 'Ancient Rome',
      score: 85,
      date: '2024-04-17T16:45:00Z',
      details: 'Completed Ancient Rome Quiz #2'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'History Enthusiast',
      date: '2024-04-16T09:20:00Z',
      details: 'Completed 10 quizzes'
    },
    {
      id: 5,
      type: 'quiz',
      topic: 'Renaissance',
      score: 75,
      date: '2024-04-15T11:30:00Z',
      details: 'Completed Renaissance Quiz #1'
    }
  ],
  achievements: [
    {
      id: 1,
      title: 'History Enthusiast',
      description: 'Completed 10 quizzes',
      date: '2024-04-16',
      icon: '🎓'
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Achieved 90% or higher on a quiz',
      date: '2024-04-19',
      icon: '⚡'
    },
    {
      id: 3,
      title: 'Consistent Scholar',
      description: 'Maintained a 7-day learning streak',
      date: '2024-04-19',
      icon: '🔥'
    }
  ]
}; 