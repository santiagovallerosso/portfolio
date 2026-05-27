const { animateCounter } = require('./script.js');

describe('animateCounter', () => {
    let mockElement;

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should animate a simple number counter to completion', () => {
        mockElement = { textContent: '100' };

        animateCounter(mockElement);

        // Fast-forward to the end (50 steps * 20ms = 1000ms)
        jest.advanceTimersByTime(1000);

        expect(mockElement.textContent).toBe('100');
    });

    it('should incrementally update the counter value', () => {
        mockElement = { textContent: '100' };

        animateCounter(mockElement);

        // Advance 1 step (20ms) -> Increment should be 100 / 50 = 2
        jest.advanceTimersByTime(20);
        expect(mockElement.textContent).toBe('2');

        // Advance 10 more steps -> Increment by 20 -> 22 total
        jest.advanceTimersByTime(200);
        expect(mockElement.textContent).toBe('22');
    });

    it('should preserve + symbol', () => {
        mockElement = { textContent: '50+' };

        animateCounter(mockElement);

        jest.advanceTimersByTime(20); // First tick
        expect(mockElement.textContent).toBe('1+');

        jest.advanceTimersByTime(1000); // Complete
        expect(mockElement.textContent).toBe('50+');
    });

    it('should preserve % symbol', () => {
        mockElement = { textContent: '99%' };

        animateCounter(mockElement);

        jest.advanceTimersByTime(1000); // Complete
        expect(mockElement.textContent).toBe('99%');
    });

    it('should clear interval when finished', () => {
        mockElement = { textContent: '10' };

        // Spy directly on the global object for clearInterval
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

        animateCounter(mockElement);

        // Advance time to allow the interval logic to run until current >= finalValue
        jest.runAllTimers();

        expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it('should handle non-numeric inputs by returning early', () => {
        mockElement = { textContent: 'abc' };
        const setIntervalSpy = jest.spyOn(global, 'setInterval');

        animateCounter(mockElement);

        expect(setIntervalSpy).not.toHaveBeenCalled();
    });
});
