export type FolderType = "analysis" | "outlook" | "backtesting" | "archive";
export type Bias = "BULLISH" | "BEARISH" | "NEUTRAL";

export interface PostItem {
  id: string;
  createdAt: string;
  folder: FolderType;
  title: string;
  instrument: string;
  ticker: string;
  timeframe: string;
  bias: Bias;
  description: string;
  imageUrl: string;
  author: string;
  pinned?: boolean;
}

export interface CommentItem {
  id: string;
  createdAt: string;
  postId: string;
  authorName: string;
  content: string;
  imageUrl?: string;
  isPinned: boolean;
}
