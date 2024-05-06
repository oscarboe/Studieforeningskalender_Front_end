import { useCallback, useRef } from 'react';

export default function useThrottle(callback: () => void, delay: number) {
	const lastCallRef = useRef<number>(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const throttledFunction = useCallback(() => {
		const now = Date.now();
		const timeSinceLastCall = now - lastCallRef.current;

		if (timeSinceLastCall > delay) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
			callback();
			lastCallRef.current = now;
		} else if (!timeoutRef.current) {
			timeoutRef.current = setTimeout(() => {
				callback();
				lastCallRef.current = Date.now();
				timeoutRef.current = null;
			}, delay - timeSinceLastCall);
		}
	}, [callback, delay]);

	return throttledFunction;
}
