
import React from 'react';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Analyzing...' }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
