
import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">How to Use</h2>
      <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
        <li>Enter a hashtag or topic you want to track in the search bar.</li>
        <li>Click "Start Analysis" to begin fetching and analyzing social media sentiment in real-time.</li>
        <li>Observe the charts for sentiment distribution and trends over time.</li>
        <li>Review the live feed for individual posts and their classified sentiment.</li>
        <li>Click "Stop Analysis" to end the session.</li>
      </ol>
    </div>
  );
};

export default Instructions;
