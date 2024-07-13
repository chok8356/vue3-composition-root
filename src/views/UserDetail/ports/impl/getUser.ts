import type { GetUserDelegate } from '@/views/UserDetail/ports/GetUserDelegate'
import type { IUserDto } from '@/views/UserDetail/ports/impl/dto/IUserDto'
import type { IUserDetailInfo } from '@/views/UserDetail/types/IUserDetailInfo'

import axios from 'axios'

export const getUser: GetUserDelegate = async (id: number) => {
  try {
    const { data } = await axios.get<IUserDto>(`https://jsonplaceholder.typicode.com/users/${id}`)
    return mapUserDtoToUserDetail(data)
  } catch (error) {
    console.error('Error fetching user:', error)
  }
  return null
}

const mapUserDtoToUserDetail = (user: IUserDto): IUserDetailInfo => {
  return {
    email: user.email,
    id: user.id,
    name: user.name,
    phone: user.phone,
  }
}
