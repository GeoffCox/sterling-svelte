import { writable } from "svelte/store";

export const notification = writable<string>(''); 

let timeoutId : NodeJS.Timeout | undefined = undefined;

export const sendNotification = (message: string) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
    }
    notification.set(`[${new Date().toISOString()}] ${message}`);
    
    timeoutId = setTimeout(() => {
        notification.set('');
    }, 3000);
}

export const themeStore = writable<string>('light');