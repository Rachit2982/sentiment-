
export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
}

export enum Platform {
    Twitter = 'Twitter',
    Reddit = 'Reddit',
}

export interface Post {
  platform: Platform;
  username: string;
  content: string;
  sentiment: Sentiment;
  timestamp: number;
}

export type SentimentDistribution = {
    name: Sentiment;
    value: number;
};

export interface TimeSeriesData {
    time: string;
    [Sentiment.POSITIVE]: number;
    [Sentiment.NEGATIVE]: number;
    [Sentiment.NEUTRAL]: number;
}
