import type { UserDetailDeps } from '@/views/UserDetail/UserDetailDeps'

import { Err, Ok } from '@thames/monads'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import type { IUserAlbum } from './types/IUserAlbum'
import type { IUserDetailInfo } from './types/IUserDetailInfo'

import UserDetailAlbumPhotos from './components/UserDetailAlbumPhotos/UserDetailAlbumPhotos.vue'
import UserDetailAlbums from './components/UserDetailAlbums/UserDetailAlbums.vue'
import UserDetailInfo from './components/UserDetailInfo/UserDetailInfo.vue'
import UserDetail from './UserDetail.vue'

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

describe('userDetail.vue', () => {
  it('request on mounted', () => {
    const deps: UserDetailDeps = {
      getUserAlbums: vi.fn().mockResolvedValue(Ok([])),
      getUserDetailInfo: vi.fn().mockResolvedValue(Ok(user)),
      UserDetailAlbumPhotos: {
        getAlbumPhotos: vi.fn().mockResolvedValue(Ok([])),
      },
    }
    shallowMount(UserDetail, {
      props: {
        albumId: undefined,
        deps,
        userId: user.id,
      },
    })
    expect(deps.getUserDetailInfo).toHaveBeenCalledTimes(1)
    expect(deps.getUserDetailInfo).toHaveBeenCalledWith(1)
    expect(deps.getUserAlbums).toHaveBeenCalledTimes(1)
    expect(deps.getUserAlbums).toHaveBeenCalledWith(1)
  })

  it('renders loading state correctly', () => {
    const deps: UserDetailDeps = {
      getUserAlbums: vi.fn().mockResolvedValue(Ok([])),
      getUserDetailInfo: vi.fn().mockResolvedValue(Ok(user)),
      UserDetailAlbumPhotos: {
        getAlbumPhotos: vi.fn().mockResolvedValue(Ok([])),
      },
    }
    const wrapper = shallowMount(UserDetail, {
      props: {
        albumId: undefined,
        deps,
        userId: user.id,
      },
    })
    expect(wrapper.find('[data-test="loading-user-info"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="loading-user-info"]').text()).toBe('Loading info...')
  })

  it('renders user info and albums correctly when data is loaded', async () => {
    const deps: UserDetailDeps = {
      getUserAlbums: vi.fn().mockResolvedValue(Ok(albums)),
      getUserDetailInfo: vi.fn().mockResolvedValue(Ok(user)),
      UserDetailAlbumPhotos: {
        getAlbumPhotos: vi.fn().mockResolvedValue(Ok([])),
      },
    }
    const wrapper = shallowMount(UserDetail, {
      props: {
        albumId: undefined,
        deps,
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
    const deps: UserDetailDeps = {
      getUserAlbums: vi.fn().mockResolvedValue(Ok([])),
      getUserDetailInfo: vi.fn().mockResolvedValue(Err('error')),
      UserDetailAlbumPhotos: {
        getAlbumPhotos: vi.fn().mockResolvedValue(Ok([])),
      },
    }
    const wrapper = shallowMount(UserDetail, {
      props: {
        albumId: undefined,
        deps,
        userId: user.id,
      },
    })
    await flushPromises()
    expect(wrapper.find('[data-test="no-user-info"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="no-user-info"]').text()).toBe('No info')
  })

  it('renders album photos component correctly when albumId and albums are present', async () => {
    const deps: UserDetailDeps = {
      getUserAlbums: vi.fn().mockResolvedValue(Ok(albums)),
      getUserDetailInfo: vi.fn().mockResolvedValue(Ok(user)),
      UserDetailAlbumPhotos: {
        getAlbumPhotos: vi.fn().mockResolvedValue(Ok([])),
      },
    }
    const wrapper = shallowMount(UserDetail, {
      props: {
        albumId: albums[0].id,
        deps,
        userId: user.id,
      },
    })
    await flushPromises()
    expect(wrapper.findComponent(UserDetailAlbumPhotos).exists()).toBe(true)
    expect(wrapper.findComponent(UserDetailAlbumPhotos).props('albumId')).toBe(albums[0].id)
    expect(wrapper.findComponent(UserDetailAlbumPhotos).props('availableAlbumIds')).toEqual([
      albums[0].id,
      albums[1].id,
    ])
  })

  it('close album photos component correctly push to UserDetail route', async () => {
    const deps: UserDetailDeps = {
      getUserAlbums: vi.fn().mockResolvedValue(Ok(albums)),
      getUserDetailInfo: vi.fn().mockResolvedValue(Ok(user)),
      UserDetailAlbumPhotos: {
        getAlbumPhotos: vi.fn().mockResolvedValue(Ok([])),
      },
    }
    const wrapper = shallowMount(UserDetail, {
      props: {
        albumId: albums[0].id,
        deps,
        userId: user.id,
      },
    })
    await flushPromises()
    wrapper.findComponent(UserDetailAlbumPhotos).vm.$emit('close')
    expect(mockRouterPush).toHaveBeenCalledWith({ name: 'UserDetail', params: { userId: user.id } })
  })
})
