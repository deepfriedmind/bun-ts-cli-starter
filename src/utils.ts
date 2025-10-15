import { colors } from 'consola/utils'
import { renderFilled } from 'oh-my-logo'
import packageJson from '../package.json' with { type: 'json' }

/**
 * Generate an ASCII art logo
 *
 * @param text - The text to convert into ASCII art.
 * @returns The ASCII art representation of the text, or the original text if generation fails.
 */
export async function generateLogo(text = '') {
  try {
    const result = await renderFilled(text, {
      font: 'slick',
      letterSpacing: 0,
      palette: ['#FA769F', '#A9E8FD'],
    })
    return result ?? text
  } catch {
    return text
  }
}

/**
 * Format the given text as inline code with a black background and bright white foreground.
 *
 * @param text - The text to format as inline code.
 * @returns The formatted string with inline code styling.
 */
export function inlineCode(text = '') {
  return `${colors.bgBlack(colors.whiteBright(text))}`
}

/**
 * Determines if the current module is the main entry point
 * Handles various execution scenarios including direct execution,
 * symlinked binaries, and module imports
 *
 * @returns boolean indicating if the current module is the main entry point
 */
export function isMainModule() {
  const argvPath = (process.argv[1] ?? '') || ''
  const argvFileName = (argvPath.split('/').pop() ?? '') || ''

  // Check if import.meta.url matches the executed file path
  if (argvPath && import.meta.url === `file://${argvPath}`) {
    return true
  }

  // Check if import.meta.url ends with the filename
  if (argvFileName && import.meta.url.endsWith(argvFileName)) {
    return true
  }

  // Check if being run via linked binary (npm link creates a symlink in bin directory)
  if (argvPath) {
    const binaryName = packageJson.name
    const isBinaryPath = argvPath.includes(binaryName)
    return isBinaryPath
  }

  return false
}
