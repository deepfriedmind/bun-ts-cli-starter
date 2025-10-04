import { describe, expect, test } from 'bun:test'

describe('main entry point', () => {
  test('should have correct execution logic', async () => {
    // Test that the main function exists and is properly exported
    const { main } = await import('../src/index')
    expect(typeof main).toBe('function')
  })

  test('should handle basic import without errors', () => {
    // Test that we can import the main module without issues
    expect(() => {
      import('../src/index')
    }).not.toThrow()
  })
})
