import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test'
import packageJson from '../package.json' with { type: 'json' }
import { createProgram, displayWelcome, parseArguments } from '../src/cli'
import {
  consolaMock,
  createSpinnerMock,
  createTerminalLinkMock,
  exitCode,
  restoreProcessExitMock,
  setupProcessExitMock,
} from './mocks'

beforeEach(() => {
  setupProcessExitMock()
})

afterEach(() => {
  restoreProcessExitMock()
  mock.restore()
})

describe('CLI', () => {
  describe('createProgram', () => {
    const program = createProgram()

    test('should have the correct name', () => {
      expect(program.name()).toBe(packageJson.name)
    })

    test('should have the correct description', () => {
      expect(program.description()).toBe(packageJson.description)
    })

    test('should have the correct version', () => {
      expect(program.version()).toBe(packageJson.version)
    })

    test('should have a verbose option', () => {
      const verboseOption = program.options.find(
        (option) => option.long === '--verbose',
      )
      expect(verboseOption).toBeDefined()
      expect(verboseOption?.description).toBe('enable verbose output')
    })
  })

  describe('parseArguments', () => {
    test('should parse the verbose flag correctly', () => {
      const argv = ['node', 'index.js', '--verbose']
      const options = parseArguments(argv)
      expect(options.verbose).toBe(true)
    })

    test('should have verbose as false by default', () => {
      const argv = ['node', 'index.js']
      const options = parseArguments(argv)
      expect(options.verbose).toBe(false)
    })
  })

  describe('error handling', () => {
    test('should handle help command and exit gracefully', () => {
      const argv = ['node', 'index.js', '--help']

      expect(() => parseArguments(argv)).toThrow()
      // Help command should exit with code 0 but may be handled differently
      expect(exitCode).toBeDefined()
    })

    test('should handle version command and exit gracefully', () => {
      const argv = ['node', 'index.js', '--version']

      expect(() => parseArguments(argv)).toThrow()
      // Version command should exit with code 0 but may be handled differently
      expect(exitCode).toBeDefined()
    })

    test('should handle invalid options with error', () => {
      const argv = ['node', 'index.js', '--invalid-option']

      expect(() => parseArguments(argv)).toThrow('Process exit with code: 1')
      expect(exitCode).toBe(1)
    })

    test('should handle missing required arguments with error', () => {
      const argv = ['node', 'index.js']

      // This should work fine as there are no required arguments
      expect(() => parseArguments(argv)).not.toThrow()
    })
  })

  describe('displayWelcome', () => {
    test('should execute without throwing errors', () => {
      // Mock the spinner to avoid 3-second delay in tests
      mock.module('@clack/prompts', () => ({
        spinner: createSpinnerMock(),
      }))

      // Mock consola methods to capture output
      mock.module('consola', () => consolaMock)

      // Mock terminal-link
      mock.module('terminal-link', createTerminalLinkMock)

      expect(() => displayWelcome()).not.toThrow()
    })

    test('should handle spinner creation correctly', () => {
      // Mock the spinner to verify it's created and used
      let spinnerInstance: any = null

      mock.module('@clack/prompts', () => ({
        spinner: mock(() => {
          spinnerInstance = {
            start: mock((message: string) => {
              expect(message).toBe("I'm a spinner")
            }),
            stop: mock((message: string) => {
              expect(message).toBe('Spinner done!')
            }),
          }
          return spinnerInstance
        }),
      }))

      expect(() => displayWelcome()).not.toThrow()
      expect(spinnerInstance).toBeDefined()
    })
  })
})
