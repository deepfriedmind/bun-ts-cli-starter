import { consola } from 'consola'
import { displayWelcome, parseArguments } from './cli.ts'
import { CONSOLA_LEVELS, EXIT_CODES } from './constants.ts'
import { isMainModule } from './utils.ts'

/**
 * Main application function
 */
async function main() {
  try {
    const options = parseArguments()

    // Configure consola log level based on verbose flag
    consola.level = options.verbose
      ? CONSOLA_LEVELS.DEBUG
      : CONSOLA_LEVELS.DEFAULT

    await displayWelcome()
  } catch (error) {
    // Handle user cancellation gracefully
    if (error instanceof Error && error.name === 'ExitPromptError') {
      consola.info('\nOperation cancelled by user.')
      process.exit(EXIT_CODES.SUCCESS)
    }
  }
}

if (isMainModule()) {
  main().catch((error) => {
    const errorMessage = error instanceof Error ? error.message : String(error)
    consola.error(`Fatal error: ${errorMessage}`)
    process.exit(EXIT_CODES.GENERAL_ERROR)
  })
}

// Export main function for testing
export { main }
