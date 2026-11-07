import type { Theme } from '../index.js';

export declare const themes: Record<string, () => Promise<{ default: Theme }>>;
