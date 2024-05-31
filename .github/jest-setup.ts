import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
