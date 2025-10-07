import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SportsLeagueCard from '../../app/components/SportsLeagueCard.vue'
import type { League } from '#shared/types/league'

describe('SportsLeagueCard component', () => {
  const mockLeague: League = {
    idLeague: '1',
    strLeague: 'Premier League',
    strSport: 'Soccer',
    strLeagueAlternate: 'EPL'
  }

  it('should render league name', () => {
    const wrapper = mount(SportsLeagueCard, {
      props: { league: mockLeague }
    })

    expect(wrapper.text()).toContain('Premier League')
  })

  it('should render sport name', () => {
    const wrapper = mount(SportsLeagueCard, {
      props: { league: mockLeague }
    })

    expect(wrapper.text()).toContain('Soccer')
  })

  it('should render alternative name when provided', () => {
    const wrapper = mount(SportsLeagueCard, {
      props: { league: mockLeague }
    })

    expect(wrapper.text()).toContain('EPL')
  })

  it('should not render alternative name when null', () => {
    const leagueWithoutAlternate: League = {
      ...mockLeague,
      strLeagueAlternate: null
    }

    const wrapper = mount(SportsLeagueCard, {
      props: { league: leagueWithoutAlternate }
    })

    expect(wrapper.text()).not.toContain('Alternative:')
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(SportsLeagueCard, {
      props: { league: mockLeague }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([mockLeague])
  })

  it('should have role="button" for accessibility', () => {
    const wrapper = mount(SportsLeagueCard, {
      props: { league: mockLeague }
    })

    const cardElement = wrapper.find('[role="button"]')
    expect(cardElement.exists()).toBe(true)
  })

  it('should have tabindex="0" for keyboard navigation', () => {
    const wrapper = mount(SportsLeagueCard, {
      props: { league: mockLeague }
    })

    const cardElement = wrapper.find('[tabindex="0"]')
    expect(cardElement.exists()).toBe(true)
  })

  it('should display view badge text', () => {
    const wrapper = mount(SportsLeagueCard, {
      props: { league: mockLeague }
    })

    expect(wrapper.text()).toContain('Click to view badge')
  })
})