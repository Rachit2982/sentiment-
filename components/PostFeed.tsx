
import React from 'react';
import type { Post } from '../types';
import { Platform, Sentiment } from '../types';
import TwitterIcon from './icons/TwitterIcon';
import RedditIcon from './icons/RedditIcon';
import LoadingSpinner from './LoadingSpinner';

interface PostFeedProps {
  posts: Post[];
  isAnalyzing: boolean;
  hashtag: string;
}

const sentimentStyles = {
  [Sentiment.POSITIVE]: 'border-l-4 border-positive',
  [Sentiment.NEGATIVE]: 'border-l-4 border-negative',
  [Sentiment.NEUTRAL]: 'border-l-4 border-neutral',
};

const PlatformIcon: React.FC<{ platform: Platform }> = ({ platform }) => {
  switch (platform) {
    case Platform.Twitter:
      return <TwitterIcon className="w-5 h-5 text-sky-500" />;
    case Platform.Reddit:
      return <RedditIcon className="w-5 h-5 text-orange-500" />;
    default:
      return null;
  }
};

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm ${sentimentStyles[post.sentiment]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <PlatformIcon platform={post.platform} />
          <span className="font-semibold text-gray-700 dark:text-gray-300">{post.username}</span>
        </div>
        <span className="text-xs text-gray-400">{new Date(post.timestamp).toLocaleTimeString()}</span>
      </div>
      <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
    </div>
  );
};


const PostFeed: React.FC<PostFeedProps> = ({ posts, isAnalyzing, hashtag }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Live Feed</h3>
      <div className="h-96 pr-2 -mr-2 overflow-y-auto space-y-3">
        {isAnalyzing && posts.length === 0 && <LoadingSpinner message={`Fetching posts for #${hashtag}...`} />}
        {!isAnalyzing && posts.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p>Start analysis to see the live feed.</p>
          </div>
        )}
        {posts.map((post) => (
          <PostItem key={post.timestamp + post.username} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
