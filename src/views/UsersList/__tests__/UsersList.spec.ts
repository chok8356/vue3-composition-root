import { flushPromises, shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { getUsersInjectionKey } from '../ports/GetUsersDelegate'
import { type IUserList } from '../types/IUserList'
import UsersList from '../UsersList.vue'

const users: IUserList[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
]

describe('UsersList.vue', () => {
  it('fetches users list and displays them correctly', async () => {
    const mockGetUsers = vi.fn().mockResolvedValue(users)
    const wrapper = shallowMount(UsersList, {
      global: {
        provide: {
          [getUsersInjectionKey as symbol]: mockGetUsers,
        },
      },
    })
    await flushPromises()
    expect(mockGetUsers).toHaveBeenCalled()
    const userElement = wrapper.findAll('[data-test="user"]')
    expect(userElement.length).toBe(2)
    expect(userElement[0].text()).toContain(users[0].name)
    expect(userElement[1].text()).toContain(users[1].name)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
