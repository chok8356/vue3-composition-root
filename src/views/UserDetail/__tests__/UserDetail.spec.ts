import { flushPromises, shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { getAlbumPhotosInjectionKey } from '../components/UserDetailAlbumPhotos/ports/GetAlbumPhotosDelegate'
import UserDetailAlbumPhotos from '../components/UserDetailAlbumPhotos/UserDetailAlbumPhotos.vue'
import UserDetailAlbums from '../components/UserDetailAlbums/UserDetailAlbums.vue'
import UserDetailInfo from '../components/UserDetailInfo/UserDetailInfo.vue'
import { getUserAlbumsInjectionKey } from '../ports/GetUserAlbumsDelegate'
import { getUserInjectionKey } from '../ports/GetUserDelegate'
import { type IUserAlbum } from '../types/IUserAlbum'
import { type IUserDetailInfo } from '../types/IUserDetailInfo'
import UserDetail from '../UserDetail.vue'

const mockRouterPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    push: mockRouterPush,
  })),
}))

const user: IUserDetailInfo = {
  email: 'john.doe@example.com',
  id: 1,
  name: 'John Doe',
  phone: '123-456-7890',
}

const albums: IUserAlbum[] = [
  { id: 101, title: 'Album 1' },
  { id: 102, title: 'Album 2' },
]

describe('UserDetail.vue', () => {
  it('renders loading state correctly', () => {
    const mockGetUser = vi.fn().mockResolvedValue(null)
    const mockGetUserAlbums = vi.fn().mockResolvedValue([])
    const wrapper = shallowMount(UserDetail, {
      global: {
        provide: {
          [getUserAlbumsInjectionKey as symbol]: mockGetUserAlbums,
          [getUserInjectionKey as symbol]: mockGetUser,
        },
      },
      props: {
        albumId: null,
        userId: user.id,
      },
    })
    expect(wrapper.find('[data-test="loading-user-info"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="loading-user-info"]').text()).toBe('Loading info...')
  })

  it('renders user info and albums correctly when data is loaded', async () => {
    const mockGetUser = vi.fn().mockResolvedValue(user)
    const mockGetUserAlbums = vi.fn().mockResolvedValue(albums)
    const wrapper = shallowMount(UserDetail, {
      global: {
        provide: {
          [getUserAlbumsInjectionKey as symbol]: mockGetUserAlbums,
          [getUserInjectionKey as symbol]: mockGetUser,
        },
      },
      props: {
        albumId: null,
        userId: user.id,
      },
    })
    await flushPromises()
    expect(wrapper.findComponent(UserDetailInfo).exists()).toBe(true)
    expect(wrapper.findComponent(UserDetailAlbums).exists()).toBe(true)
    expect(wrapper.findComponent(UserDetailInfo).props()).toEqual({ user })
    expect(wrapper.findComponent(UserDetailAlbums).props()).toEqual({ albums })
    expect(wrapper.find('[data-test="loading-user-info"]').exists()).toBe(false)
  })

  it('renders "No info" message when no user data is available', async () => {
    const mockGetUser = vi.fn().mockResolvedValue(null)
    const mockGetUserAlbums = vi.fn().mockResolvedValue([])
    const wrapper = shallowMount(UserDetail, {
      global: {
        provide: {
          [getUserAlbumsInjectionKey as symbol]: mockGetUserAlbums,
          [getUserInjectionKey as symbol]: mockGetUser,
        },
      },
      props: {
        albumId: null,
        userId: user.id,
      },
    })
    await flushPromises()
    expect(wrapper.find('[data-test="no-user-info"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="no-user-info"]').text()).toBe('No info')
  })

  it('renders album photos component correctly when albumId and albums are present', async () => {
    const mockGetUser = vi.fn().mockResolvedValue(user)
    const mockGetUserAlbums = vi.fn().mockResolvedValue(albums)
    const mockGetAlbumPhotos = vi.fn().mockResolvedValue([])
    const wrapper = shallowMount(UserDetail, {
      global: {
        provide: {
          [getAlbumPhotosInjectionKey as symbol]: mockGetAlbumPhotos,
          [getUserAlbumsInjectionKey as symbol]: mockGetUserAlbums,
          [getUserInjectionKey as symbol]: mockGetUser,
        },
      },
      props: {
        albumId: albums[0].id,
        userId: user.id,
      },
    })
    await flushPromises()
    expect(wrapper.findComponent(UserDetailAlbumPhotos).exists()).toBe(true)
    expect(wrapper.findComponent(UserDetailAlbumPhotos).props()).toEqual({
      albumId: albums[0].id,
      availableAlbumIds: [albums[0].id, albums[1].id],
    })
  })

  it('close album photos component correctly push to UserDetail route', async () => {
    const mockGetUser = vi.fn().mockResolvedValue(user)
    const mockGetUserAlbums = vi.fn().mockResolvedValue(albums)
    const mockGetAlbumPhotos = vi.fn().mockResolvedValue([])
    const wrapper = shallowMount(UserDetail, {
      global: {
        provide: {
          [getAlbumPhotosInjectionKey as symbol]: mockGetAlbumPhotos,
          [getUserAlbumsInjectionKey as symbol]: mockGetUserAlbums,
          [getUserInjectionKey as symbol]: mockGetUser,
        },
      },
      props: {
        albumId: albums[0].id,
        userId: user.id,
      },
    })
    await flushPromises()
    wrapper.findComponent(UserDetailAlbumPhotos).vm.$emit('close')
    expect(mockRouterPush).toHaveBeenCalledWith({ name: 'UserDetail', params: { userId: user.id } })
  })
})
