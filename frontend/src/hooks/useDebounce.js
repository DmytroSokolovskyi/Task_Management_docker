import {useCallback, useRef} from "react";

export const useDebounce = (cb, delay) => {
    const timer = useRef(null);

    const debouncedCallback = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            // eslint-disable-next-line node/no-callback-literal
            cb(...args);
        }, delay);
    }, [cb, delay]);

    return debouncedCallback;
};
