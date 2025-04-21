const ProgressBar = ({ progress, label, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-gray-600">{progress}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 