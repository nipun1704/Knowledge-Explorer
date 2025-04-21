import { useState } from 'react';

const TopicForm = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate input
    if (!topic.trim()) {
      setError('Please enter a historical topic');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(topic);
      setTopic(''); // Clear form on success
    } catch (err) {
      setError('Failed to submit topic. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="topic" className="block text-gray-700 text-sm font-bold mb-2">
          Historical Topic
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            if (error) setError(''); // Clear error when user starts typing
          }}
          placeholder="Enter a historical topic (e.g., Ancient Rome, World War II)"
          className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Explore Topic'}
      </button>
    </form>
  );
};

export default TopicForm; 