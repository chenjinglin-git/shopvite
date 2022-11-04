import { loginForm } from '../interface/login'
import service from '../request'

export const login = async (data: loginForm) => {
  return await (
    await service.post('/api/login', data)
  ).data
}
