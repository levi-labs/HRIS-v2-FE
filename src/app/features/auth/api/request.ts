import ResponseApiError from '@/lib/api-errors';
import { LoginPayload, LoginResponse } from '../types/auth';
import { authEndpoints } from './endpoints';

export const authApi = {
  login: async (data: LoginPayload): Promise<LoginResponse> => {
    const res = await fetch(authEndpoints.login(), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error: { success: boolean; message: string; errors?: any[] } =
        await res.json();
      console.log('error', error.errors);
      throw new ResponseApiError(res.status, error.message, error.errors);
    }
    const json = await res.json();

    const { token, ...rest } = json.data;
    const user = {
      id: rest.id,
      username: rest.username,
      email: '', // fill if available from backend
      roleId: rest.role.id,
      roleName: rest.role.name,
    };
    console.log('user', user);

    return { token, user };
  },
};
