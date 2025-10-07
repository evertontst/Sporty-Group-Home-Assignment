import { describe, it, expect } from 'vitest'

describe('useSeasonBadge composable', () => {
  it('should exist and be a function', async () => {
    const { useSeasonBadge } = await import('../../app/composables/useSeasonBadge')
    expect(typeof useSeasonBadge).toBe('function')
  })
})