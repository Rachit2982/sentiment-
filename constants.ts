
import { Sentiment } from './types';

export const POLL_INTERVAL_MS = 5000; // 5 seconds
export const MAX_POSTS = 50;
export const MAX_TIMESERIES_POINTS = 20;

export const LIGHT_THEME_CHART_COLORS = {
  [Sentiment.POSITIVE]: '#22c55e',
  [Sentiment.NEGATIVE]: '#ef4444',
  [Sentiment.NEUTRAL]: '#a1a1aa',
};

export const DARK_THEME_CHART_COLORS = {
  [Sentiment.POSITIVE]: '#4ade80',
  [Sentiment.NEGATIVE]: '#f87171',
  [Sentiment.NEUTRAL]: '#9ca3af',
};
