
import React from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface SearchControlProps {
  hashtag: string;
  setHashtag: (value: string) => void;
  isAnalyzing: boolean;
  onToggleAnalysis: () => void;
}

const SearchControl: React.FC<SearchControlProps> = ({ hashtag, setHashtag, isAnalyzing, onToggleAnalysis }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onToggleAnalysis();
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-grow w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">#</span>
          <input
            type="text"
            value={hashtag}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setHashtag(e.target.value)}
            placeholder="Enter campaign hashtag..."
            disabled={isAnalyzing}
            className="w-full pl-7 pr-4 py-2 text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={!hashtag.trim()}
          className={`w-full sm:w-auto px-6 py-2 font-semibold text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900
            ${isAnalyzing ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-primary hover:bg-primary-hover focus:ring-primary'}
            disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed`}
        >
          {isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
        </button>
      </form>
    </div>
  );
};

export default SearchControl;
