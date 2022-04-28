import { darkTheme } from '$lib/useDarkTheme';
import { lightTheme } from '$lib/useLightTheme';


import { buttonTheme } from '$lib/useButtonTheme';
import { primaryButtonTheme } from '$lib/usePrimaryButtonTheme';


export const currentTheme = (node: HTMLElement, params: { darkMode: boolean }) => {
    
    if (params.darkMode) {
        darkTheme(node);
    } else {
        lightTheme(node);
    }

    // buttonTheme(node);
    // primaryButtonTheme(node);

    return {
        update(params: { darkMode: boolean }) {
            if (params.darkMode) {
                darkTheme(node);
            } else {
                lightTheme(node);
            }
        }
    };
};