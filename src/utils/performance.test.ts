
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { updateSectionOffsets, handleScrollCache } from './validation';

describe('Performance Optimization: Cache Layout Metrics', () => {
    let mockElement: any;

    beforeEach(() => {
        // Setup mock document
        mockElement = {
            id: 'inicio',
            className: 'hero-cinematic'
        };

        const globalAny = global as any;
        globalAny.document = {
            getElementById: vi.fn().mockImplementation((id) => id === 'hero' ? null : null),
            querySelector: vi.fn().mockImplementation((sel) => sel === '.hero-cinematic' ? mockElement : null)
        };
    });

    afterEach(() => {
        vi.restoreAllMocks();
        const globalAny = global as any;
        delete globalAny.document;
    });

    it('should query layout properties exactly once during initialization', () => {
        // We set up spies on the mock object itself to ensure properties are read
        let offsetTopReads = 0;
        let offsetHeightReads = 0;

        Object.defineProperty(mockElement, 'offsetTop', {
            get: function() { offsetTopReads++; return 100; },
            configurable: true
        });

        Object.defineProperty(mockElement, 'offsetHeight', {
            get: function() { offsetHeightReads++; return 800; },
            configurable: true
        });

        // 1. Initial calculation
        updateSectionOffsets();

        expect(offsetTopReads).toBe(1);
        expect(offsetHeightReads).toBe(1);

        // 2. Value is successfully cached
        const cachedVal = handleScrollCache();
        expect(cachedVal).toBe(900); // 100 + 800

        // 3. Repeated queries (simulating scroll tick) hit the cache, not the DOM
        for(let i=0; i<100; i++) {
            handleScrollCache();
        }

        // Verification: The actual DOM properties were never accessed again
        expect(offsetTopReads).toBe(1);
        expect(offsetHeightReads).toBe(1);
    });
});
