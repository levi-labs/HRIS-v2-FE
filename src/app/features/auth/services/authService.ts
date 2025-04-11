import { authApi } from '../api/request';
import { LoginPayload } from '../types/auth';
//jika sudah menggunakan tanstack maka service layer tidak dibutuhkan

export const authService = {
  loginAndSaveUser: async (payload: LoginPayload) => {
    const { token, user } = await authApi.login(payload);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
};
