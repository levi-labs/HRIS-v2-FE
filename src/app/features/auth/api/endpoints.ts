const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const authEndpoints = {
  login: () => `${API_BASE_URL}/api/auth/login`,
  // register: () => '/auth/register',
  me: () => `${API_BASE_URL}/api/auth/me`,
};
