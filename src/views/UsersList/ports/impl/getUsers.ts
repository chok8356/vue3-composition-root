import type { IUserDto } from '@/views/UsersList/ports/impl/dto/IUserDto'
import type { IUserList } from '@/views/UsersList/types/IUserList'

import axios from 'axios'

export const getUsers = async (): Promise<IUserList[]> => {
  try {
    const { data } = await axios.get<IUserDto[]>('https://jsonplaceholder.typicode.com/users')
    return data.map(mapUserDtoToUserList)
  } catch (error) {
    console.error('Error fetching users:', error)
  }
  return []
}

const mapUserDtoToUserList = (user: IUserDto): IUserList => {
  return {
    id: user.id,
    name: user.name,
  }
}
