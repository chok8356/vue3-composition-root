import type { UsersListDeps } from '@/views/UsersList/UsersListDeps'

import { Ok } from '@thames/monads'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import type { IUser } from './types/IUser'

import UsersList from './UsersList.vue'

const users: IUser[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
]

const deps: UsersListDeps = {
  getUsers: vi.fn().mockResolvedValue(Ok(users)),
}

describe('UsersList.vue', () => {
  it('fetches users list and displays them correctly', async () => {
    const wrapper = shallowMount(UsersList, {
      props: {
        deps,
      },
    })
    await flushPromises()

    expect(deps.getUsers).toHaveBeenCalled()

    const userElement = wrapper.findAll('[data-test="user"]')

    expect(userElement.length).toBe(2)
    expect(userElement[0].text()).toContain('John Doe')
    expect(userElement[1].text()).toContain('Jane Doe')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
