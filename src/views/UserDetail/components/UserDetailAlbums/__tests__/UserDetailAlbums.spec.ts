import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'

import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import UserDetailAlbums from '../UserDetailAlbums.vue'

const mockAlbums: IUserAlbum[] = [
  { id: 1, title: 'Album 1' },
  { id: 2, title: 'Album 2' },
]

describe('UserDetailAlbums.vue', () => {
  it('renders albums correctly when albums array is not empty', () => {
    const wrapper = shallowMount(UserDetailAlbums, {
      props: {
        albums: mockAlbums,
      },
    })
    const albumElements = wrapper.findAll('[data-test="album"]')
    expect(albumElements.length).toBe(mockAlbums.length)
    albumElements.forEach((albumElement, index) => {
      expect(albumElement.text()).toBe(mockAlbums[index].title)
    })
    expect(wrapper.find('[data-test="no-albums"]').exists()).toBe(false)
  })

  it('renders "No albums" message when albums array is empty', () => {
    const wrapper = shallowMount(UserDetailAlbums, {
      props: {
        albums: [],
      },
    })
    expect(wrapper.find('[data-test="no-albums"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="no-albums"]').text()).toBe('No albums')
  })
})
