import { atom } from 'recoil';

export const playlistIdState = atom({
  key: 'playlistId',
  default: '4LnTQT9pZuyXG96WS9RNzU',
});

export const playlistState = atom({
  key: 'playlist',
  default: null,
});
