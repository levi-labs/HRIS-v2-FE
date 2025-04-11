import ResponseApiError from '@/lib/api-errors';
import { UseMutationResult } from '@tanstack/react-query';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  roleId: number;
  roleName: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
export interface UseAuthResult {
  login: (username: string, password: string) => void;
  loginMutation: UseMutationResult<
    LoginResponse,
    ResponseApiError,
    LoginPayload
  >;
  error: string | string[];
  validationErrors: string[];
  setError: React.Dispatch<React.SetStateAction<string | string[]>>;
  setValidationErrors: React.Dispatch<React.SetStateAction<string[]>>;
}
