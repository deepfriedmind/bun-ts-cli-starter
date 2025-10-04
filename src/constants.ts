/**
 * Exit codes
 */
export const EXIT_CODES = {
  GENERAL_ERROR: 1,
  SUCCESS: 0,
} as const

/**
 * Consola log levels
 * 0: Fatal and Error
 * 1: Warnings
 * 2: Normal logs
 * 3: Informational logs, success, fail, ready, start, ...
 * 4: Debug logs
 * 5: Trace logs
 * -999: Silent
 * +999: Verbose logs
 */
export const CONSOLA_LEVELS = {
  DEBUG: 4,
  DEFAULT: 3,
  FATAL_ERROR: 0,
  INFO: 3,
  NORMAL: 2,
  SILENT: -999,
  TRACE: 5,
  VERBOSE: 999,
  WARNINGS: 1,
} as const
