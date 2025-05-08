import { Gift } from '../types';
import birthdayVideo from './data/janani.mp4'; 
import birthdayAudio from './data/cringe.mp3'; 

// Gift data configuration
// The girlfriend's birthday is May 9, 2025
export const gifts: Gift[] = [
  {
    id: 'birthday-greeting',
    title: '🎂 Happy Birthday, AMMU!',
    content: 'Listen to my special birthday message for you...',
    audio: birthdayAudio,
    type: 'audio',
    unlockTime: '2025-05-09T00:00:00'
  },
  {
    id: 'romantic-moment',
    title: 'A Special Memory',
    content: 'My Vazhithunaiye',
    video: birthdayVideo,
    type: 'video',
    unlockTime: '2025-05-09T06:00:00'
  },
  {
    id: 'message-prompt',
    title: 'Tell Me Anything...',
    content: "If there's anything you'd like to share or ask with me today, I'm all ears and heart! 💖",
    type: 'message',
    hasInput: true,
    inputLabel: 'Your message',
    submitLabel: 'Send to My Love',
    unlockTime: '2025-05-09T18:00:00'
  },
  {
    id: 'bucket-wish-1',
    title: 'Your First Wish',
    content: 'What\'s your #1 bucket-wish?',
    type: 'wish',
    hasInput: true,
    inputLabel: 'My biggest wish is...',
    submitLabel: 'Make a Wish',
    unlockTime: '2025-05-10T06:00:00'
  },
  {
    id: 'bucket-wish-2',
    title: 'Another Wish',
    content: 'One more bucket-wish for me to grant...',
    type: 'wish',
    hasInput: true,
    inputLabel: 'I wish for...',
    submitLabel: 'Make a Wish',
    unlockTime: '2025-05-10T18:00:00'
  },
  {
    id: 'bucket-wish-3',
    title: 'Dream Big',
    content: 'Your final bucket-wish—dream big!',
    type: 'wish',
    hasInput: true,
    inputLabel: 'My biggest dream is...',
    submitLabel: 'Make a Wish',
    unlockTime: '2025-05-09T06:00:00'
  },
  {
    id: 'final-surprise',
    title: '🎉 One Last Thing...',
    content: 'The last surprise is waiting for you... ❤',
    type: 'message',
    unlockTime: '2025-05-11T11:11:00'
  }
];