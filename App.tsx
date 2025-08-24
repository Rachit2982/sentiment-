
import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import type { Post, SentimentDistribution, TimeSeriesData } from './types';
import { Sentiment } from './types';
import Header from './components/Header';
import SearchControl from './components/SearchControl';
import Instructions from './components/Instructions';
import SentimentChart from './components/SentimentChart';
import TimeSeriesChart from './components/TimeSeriesChart';
import PostFeed from './components/PostFeed';
import { generateAndAnalyzePosts } from './services/geminiService';
import { POLL_INTERVAL_MS, MAX_POSTS, MAX_TIMESERIES_POINTS } from './constants';

const App: React.FC = () => {
  type Theme = 'light' | 'dark';
  const [theme, setTheme] = useState<Theme>('dark');
  const [hashtag, setHashtag] = useState<string>('ReactJS');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [sentimentDistribution, setSentimentDistribution] = useState<SentimentDistribution[]>([]);
  const [sentimentOverTime, setSentimentOverTime] = useState<TimeSeriesData[]>([]);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const processNewPosts = useCallback((newPosts: Post[]) => {
      setPosts(prevPosts => {
        const combined = [...newPosts, ...prevPosts];
        return combined.slice(0, MAX_POSTS);
      });

      const counts = newPosts.reduce((acc, post) => {
        acc[post.sentiment] = (acc[post.sentiment] || 0) + 1;
        return acc;
      }, {} as Record<Sentiment, number>);

      setSentimentDistribution(prevDist => {
          // Create a new array with new objects to avoid state mutation
          return prevDist.map(distItem => ({
            name: distItem.name,
            value: distItem.value + (counts[distItem.name] || 0),
          }));
      });

      setSentimentOverTime(prevData => {
          const lastPoint = prevData[prevData.length - 1] || { [Sentiment.POSITIVE]: 0, [Sentiment.NEGATIVE]: 0, [Sentiment.NEUTRAL]: 0 };
          const newPoint: TimeSeriesData = {
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}),
              [Sentiment.POSITIVE]: lastPoint[Sentiment.POSITIVE] + (counts[Sentiment.POSITIVE] || 0),
              [Sentiment.NEGATIVE]: lastPoint[Sentiment.NEGATIVE] + (counts[Sentiment.NEGATIVE] || 0),
              [Sentiment.NEUTRAL]: lastPoint[Sentiment.NEUTRAL] + (counts[Sentiment.NEUTRAL] || 0),
          };
          const combined = [...prevData, newPoint];
          return combined.slice(-MAX_TIMESERIES_POINTS);
      });
  }, []);

  const fetchData = useCallback(async () => {
    if (!hashtag.trim()) return;
    try {
      const newPosts = await generateAndAnalyzePosts(hashtag, 5);
      if (newPosts.length > 0) {
        processNewPosts(newPosts);
      }
    } catch (error) {
      console.error("Failed to fetch and analyze posts:", error);
    }
  }, [hashtag, processNewPosts]);


  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Clear previous data
    setPosts([]);
    setSentimentDistribution(Object.values(Sentiment).map(s => ({name: s, value: 0})));
    setSentimentOverTime([]);

    fetchData(); // Fetch immediately
    intervalRef.current = window.setInterval(fetchData, POLL_INTERVAL_MS);
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleToggleAnalysis = () => {
    if (isAnalyzing) {
      stopAnalysis();
    } else {
      startAnalysis();
    }
  };
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-3 space-y-6">
             <SearchControl 
                hashtag={hashtag}
                setHashtag={setHashtag}
                isAnalyzing={isAnalyzing}
                onToggleAnalysis={handleToggleAnalysis}
            />
            <Instructions />
          </div>

          <div className="lg:col-span-1">
            <SentimentChart data={sentimentDistribution} theme={theme} />
          </div>

          <div className="lg:col-span-2">
             <TimeSeriesChart data={sentimentOverTime} theme={theme} />
          </div>
          
          <div className="lg:col-span-3">
            <PostFeed posts={posts} isAnalyzing={isAnalyzing} hashtag={hashtag} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
