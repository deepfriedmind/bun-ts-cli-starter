import { mock } from 'bun:test'
import { CONSOLA_LEVELS } from '../src/constants'

/**
 * Store the actual consola level value separately to avoid recursion
 */
let consolaLevel: number = CONSOLA_LEVELS.DEFAULT

/**
 * Mock consola instance for testing
 */
export const consolaMock = {
  debug: mock(() => {
    // Mock implementation
  }),
  error: mock(() => {
    // Mock implementation
  }),
  info: mock(() => {
    // Mock implementation
  }),
  level: CONSOLA_LEVELS.DEFAULT as number,
  log: mock(() => {
    // Mock implementation
  }),
  success: mock(() => {
    // Mock implementation
  }),
  warn: mock(() => {
    // Mock implementation
  }),
}

/**
 * Create a getter/setter for consola level to properly track changes
 */
Object.defineProperty(consolaMock, 'level', {
  configurable: true,
  get: () => consolaLevel,
  set: (value: number) => {
    consolaLevel = value
  },
})

/**
 * Mock process.exit to prevent actual exit during tests
 */
const originalExit = process.exit
export let exitCode: number | null = null

/**
 * Setup process.exit mock
 */
export function setupProcessExitMock(): void {
  exitCode = null
  process.exit = mock((code?: number) => {
    exitCode = code ?? 0
    throw new Error(`Process exit with code: ${exitCode}`)
  })
}

/**
 * Restore process.exit to original
 */
export function restoreProcessExitMock(): void {
  process.exit = originalExit
}

/**
 * Create spinner mock for testing displayWelcome spinner behavior
 */
export function createSpinnerMock() {
  return mock(() => ({
    start: mock(() => {
      // Mock implementation
    }),
    stop: mock(() => {
      // Mock implementation
    }),
  }))
}

/**
 * Create terminal-link mock
 */
export function createTerminalLinkMock() {
  return {
    __esModule: true,
    default: mock(() => 'GitHub Link'),
  }
}
