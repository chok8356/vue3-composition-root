import type { IUserDetailInfo } from '@/views/UserDetail/types/IUserDetailInfo'

import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import UserDetailInfo from '../UserDetailInfo.vue'

const mockUser: IUserDetailInfo = {
  email: 'john.doe@example.com',
  id: 12_345,
  name: 'John Doe',
  phone: '+1234567890',
}

describe('userDetailInfo.vue', () => {
  it('renders user information correctly', () => {
    const wrapper = shallowMount(UserDetailInfo, {
      props: {
        user: mockUser,
      },
    })
    expect(wrapper.find('[data-test="id"]').text()).toBe(String(mockUser.id))
    expect(wrapper.find('[data-test="name"]').text()).toBe(mockUser.name)
    expect(wrapper.find('[data-test="email"]').text()).toBe(mockUser.email)
    expect(wrapper.find('[data-test="phone"]').text()).toBe(mockUser.phone)
  })
})
