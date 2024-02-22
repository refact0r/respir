import { persisted } from 'svelte-persisted-store';

export const defaultPreferences = {
	ambienceVolume: 0.8,
	speechVolume: 0.8
};
export const preferences = persisted('preferences', defaultPreferences);
