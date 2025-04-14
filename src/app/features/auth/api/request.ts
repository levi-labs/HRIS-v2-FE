import ResponseApiError from "@/lib/api-errors";
import { LoginPayload, LoginResponse } from "../types/auth";
import { authEndpoints } from "./endpoints";

export const authApi = {
  login: async (data: LoginPayload): Promise<LoginResponse> => {
    const res = await fetch(authEndpoints.login(), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error: {
        success: boolean;
        message: string;
        errors?: { field: string; message: string }[];
      } = await res.json();
      console.log("error", error.errors);
      throw new ResponseApiError(res.status, error.message, error.errors);
    }
    const json = await res.json();

    const { token, ...rest } = json.data;
    const user = {
      id: rest.id,
      username: rest.username,
      email: "", // fill if available from backend
      roleId: rest.role.id,
      roleName: rest.role.name,
    };
    console.log("user", user);

    return { token, user };
  },
  me: async () => {
    const getCookie = (name:string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(';').shift();
    };
    
    const cookietoken = getCookie("authToken");
    const res = await fetch(authEndpoints.me(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookietoken}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error: {
        success: boolean;
        message: string;
        errors?: { field: string; message: string }[];
      } = await res.json();
      throw new ResponseApiError(res.status, error.message, error.errors);
    }
    const result = await res.json();

    return result.data;
  },
};
