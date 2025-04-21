const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'quiz':
        return '📝';
      case 'topic':
        return '📚';
      case 'achievement':
        return '🏆';
      default:
        return '📌';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="text-2xl">{getActivityIcon(activity.type)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-900 truncate">
            {activity.details}
          </p>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {formatDate(activity.date)}
          </span>
        </div>
        {activity.type === 'quiz' && activity.score && (
          <p className="text-sm text-gray-600 mt-1">
            Score: {activity.score}%
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityItem; 