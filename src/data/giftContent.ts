/**
 * giftContent.ts
 *
 * Edit all personal text, names, and settings here.
 * This is the only file you need to change to personalise the website.
 */

import type { GiftContent } from '../types/memory'

export const giftContent: GiftContent = {
  recipientName: 'Menyim',

  senderName: 'Xevorine',

  openingTitle: 'A little something for you',

  openingSubtitle: 'Click to open 🌸',

  personalMessage: `Hi Menyim,

Thank you for being part of these little moments.
I wanted to keep them here in one place, so they do not get lost over time.

Every photo on this page holds a small memory.
Some are ordinary, some are funny, and some are simply nice to look back on.

I hope this little collection makes you smile.`,

  finalMessage: 'Every moment with you is a small memory to keep.',

  albumUrl: 'https://drive.google.com/drive/folders/1iMkImsCALu-9Yzzs3cjZCKkt3joTe6q9?usp=sharing',

  // Set to true once you've placed a file at public/audio/background-music.mp3
  audioEnabled: false,

  audioSrc: '/audio/background-music.mp3',
}
