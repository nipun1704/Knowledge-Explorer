const TimelineEvent = ({ date, title, description }) => {
  return (
    <div className="relative pl-8 pb-6 border-l-2 border-indigo-200 last:pb-0">
      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white" />
      <div>
        <span className="text-sm font-medium text-indigo-600">{date}</span>
        <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default TimelineEvent; 