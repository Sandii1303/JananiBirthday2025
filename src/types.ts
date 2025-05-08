export interface Gift {
  id: string;
  title: string;
  content?: string;
  image?: string;
  audio?: string;
  video?: string;
  type: 'message' | 'wish' | 'media' | 'audio' | 'video';
  hasInput?: boolean;
  inputLabel?: string;
  submitLabel?: string;
  unlockTime: string; // ISO date string
}