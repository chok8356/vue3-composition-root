import { flushPromises, shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import type { IAlbumPhoto } from '../types/IAlbumPhoto'

import { getAlbumPhotosInjectionKey } from '../ports/GetAlbumPhotosDelegate'
import UserDetailAlbumPhotos from '../UserDetailAlbumPhotos.vue'

const albumId = 101
const availableAlbumIds = [albumId]

const photos: IAlbumPhoto[] = [
  { id: 201, thumbnailUrl: 'url1', title: 'Photo 1', url: 'url1' },
  { id: 202, thumbnailUrl: 'url2', title: 'Photo 2', url: 'url2' },
]

describe('UserDetailAlbumPhotos.vue', () => {
  it('displays photos if present in selected album', async () => {
    const mockGetAlbumPhotos = vi.fn().mockResolvedValue(photos)
    const wrapper = shallowMount(UserDetailAlbumPhotos, {
      global: {
        provide: {
          [getAlbumPhotosInjectionKey as symbol]: mockGetAlbumPhotos,
        },
      },
      props: {
        albumId,
        availableAlbumIds,
      },
    })
    await flushPromises()
    expect(mockGetAlbumPhotos).toHaveBeenCalledWith(101, 1)
    expect(wrapper.findAll('[data-test="photo"]').length).toBe(2)
    expect(wrapper.findAll('[data-test="photo"]')[0].text()).toBe('201')
    expect(wrapper.findAll('[data-test="photo"]')[1].text()).toBe('202')
  })

  it('displays "No photos" message if no photos are present in selected album', async () => {
    const mockGetAlbumPhotos = vi.fn().mockResolvedValue([])
    const wrapper = shallowMount(UserDetailAlbumPhotos, {
      global: {
        provide: {
          [getAlbumPhotosInjectionKey as symbol]: mockGetAlbumPhotos,
        },
      },
      props: {
        albumId,
        availableAlbumIds,
      },
    })
    await flushPromises()
    expect(mockGetAlbumPhotos).toHaveBeenCalledWith(101, 1)
    const noPhotosElement = wrapper.find('[data-test="no-photos"]')
    expect(noPhotosElement.exists()).toBe(true)
    expect(noPhotosElement.text()).toBe('No photos')
  })

  it('displays "Loading photos..." while fetching photos', async () => {
    const mockGetAlbumPhotos = vi.fn().mockResolvedValue([])
    const wrapper = shallowMount(UserDetailAlbumPhotos, {
      global: {
        provide: {
          [getAlbumPhotosInjectionKey as symbol]: mockGetAlbumPhotos,
        },
      },
      props: {
        albumId,
        availableAlbumIds,
      },
    })
    expect(wrapper.find('[data-test="loading-photos"]').exists()).toBe(true)
    await flushPromises()
    expect(mockGetAlbumPhotos).toHaveBeenCalledWith(101, 1)
    expect(wrapper.find('[data-test="loading-photos"]').exists()).toBe(false)
  })

  it('fetches more photos when "Load more" button is clicked', async () => {
    const mockGetAlbumPhotos = vi
      .fn()
      .mockResolvedValueOnce([photos[0]])
      .mockResolvedValueOnce([photos[1]])
    const wrapper = shallowMount(UserDetailAlbumPhotos, {
      global: {
        provide: {
          [getAlbumPhotosInjectionKey as symbol]: mockGetAlbumPhotos,
        },
      },
      props: {
        albumId,
        availableAlbumIds,
      },
    })
    await flushPromises()
    expect(mockGetAlbumPhotos).toHaveBeenCalledWith(101, 1)
    expect(wrapper.findAll('[data-test="photo"]').length).toBe(1)
    expect(wrapper.findAll('[data-test="photo"]')[0].text()).toBe('201')
    await wrapper.find('[data-test="load-more"]').trigger('click')
    await flushPromises()
    expect(mockGetAlbumPhotos).toHaveBeenCalledWith(101, 2)
    expect(wrapper.findAll('[data-test="photo"]').length).toBe(2)
    expect(wrapper.findAll('[data-test="photo"]')[1].text()).toBe('202')
  })

  it('navigates back to user detail when "Close" button is clicked', async () => {
    const mockGetAlbumPhotos = vi.fn().mockResolvedValue(photos)
    const wrapper = shallowMount(UserDetailAlbumPhotos, {
      global: {
        provide: {
          [getAlbumPhotosInjectionKey as symbol]: mockGetAlbumPhotos,
        },
      },
      props: {
        albumId,
        availableAlbumIds,
      },
    })
    await flushPromises()
    expect(mockGetAlbumPhotos).toHaveBeenCalledWith(101, 1)
    await wrapper.find('[data-test="close"]').trigger('click')
    expect(wrapper.emitted('close')).toBeDefined()
  })
})
