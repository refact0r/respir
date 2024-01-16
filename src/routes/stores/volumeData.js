import { writable } from 'svelte/store';

const initialAmbienceVolume = 0.8;
const initialSpeechVolume = 0.8;


export const ambienceVolume = writable(initialAmbienceVolume);
export const speechVolume = writable(initialSpeechVolume);
