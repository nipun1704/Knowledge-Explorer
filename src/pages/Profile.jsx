import { mockProfileData } from '../data/mockProfileData';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import ActivityItem from '../components/ActivityItem';

const Profile = () => {
  const { user, progress, recentActivity, achievements } = mockProfileData;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {getInitials(user.name)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2 flex items-center">
                <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {user.role}
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="md:col-span-2">
            <Card title="Learning Progress" className="mb-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">{progress.totalQuizzesTaken}</div>
                  <div className="text-sm text-gray-600">Quizzes Taken</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">{progress.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>
              <div className="space-y-4">
                {progress.topicProgress.map((topic, index) => (
                  <ProgressBar
                    key={index}
                    label={topic.topic}
                    progress={topic.progress}
                  />
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card title="Recent Activity">
              <div className="space-y-1">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </Card>
          </div>

          {/* Achievements */}
          <div className="md:col-span-1">
            <Card title="Achievements">
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 