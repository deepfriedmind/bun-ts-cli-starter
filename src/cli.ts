import { spinner } from '@clack/prompts'
import { Command } from 'commander'
import { consola } from 'consola'
import { box, colors } from 'consola/utils'
import terminalLink from 'terminal-link'
import packageJson from '../package.json' with { type: 'json' }
import type { CliOptions } from './types'
import { generateLogo, inlineCode } from './utils'

/**
 * Create and configure the Commander.js program
 */
export function createProgram(): Command {
  const program = new Command()

  program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'display version number')
    .helpOption('-h, --help', 'show this help message')

  program.option('-V, --verbose', 'enable verbose output', false)

  program.addHelpText(
    'after',
    `
Examples:
  $ npx ${packageJson.name}@latest --help
  $ npx ${packageJson.name}@latest --version
  $ npx ${packageJson.name}@latest --verbose
`,
  )

  return program
}

/**
 * Parse command line arguments and return options
 */
export function parseArguments(argv: string[] = process.argv): CliOptions {
  const program = createProgram()

  try {
    program.parse(argv)
    return program.opts()
  } catch (error: unknown) {
    handleParsingError(error)
  }
}

/**
 * Handle parsing errors and exit appropriately
 */
function handleParsingError(error: unknown): never {
  const typedError = error as { code?: string; message?: string }

  if (typedError.code === 'commander.helpDisplayed') {
    process.exit(0)
  }

  if (typedError.code === 'commander.version') {
    process.exit(0)
  }

  const errorMessage = typedError.message ?? 'Unknown error'
  consola.error(`Command line parsing error: ${errorMessage}`)
  consola.info('Use --help for usage information')
  process.exit(1)
}

/**
 * Display welcome message
 */
export function displayWelcome() {
  consola.log(
    box(generateLogo(packageJson.displayName), {
      style: { borderColor: 'magentaBright' },
    }),
  )
  consola.info("I'm an info message.")
  consola.success("I'm a success message.")
  consola.log(
    colors.magentaBright("I'm a generic log message with a custom color."),
  )
  consola.warn("I'm a warning message.")
  consola.error("I'm an error message.")
  consola.debug(
    `I'm a debug message. I'm only shown in ${inlineCode('-V/--verbose')} mode.\n`,
  )
  consola.log(
    `Source code on ${terminalLink(colors.blue('GitHub'), packageJson.homepage)}`,
  )
  const spin = spinner()
  const sleep = 3000
  spin.start("I'm a spinner")
  setTimeout(() => {
    spin.stop('Spinner done!')
  }, sleep)
}
