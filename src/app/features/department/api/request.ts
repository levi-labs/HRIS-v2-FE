
import departmentEndpoints from "./endpoints";
import ResponseApiError from "@/lib/api-errors";


export const departmentApi = {
 
  getAll: async (page: number, limit: number, search: string) => {
    const getCookie = (name:string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(';').shift();
    };
    
    const cookietoken = getCookie("authToken");
    // console.log("cookiessssss", cookietoken);
    
    const res = await fetch(departmentEndpoints.getAll(page, limit, search), {
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
      console.log("error request", error);
      throw new ResponseApiError(res.status, error.message, error.errors);
     
    }
    const result = await res.json();

    return {
      data: result.data,
      message: result.message,
      pagination: result.pagination,
    };
  },

  getById: async (id: number) => {
    const res = await fetch(departmentEndpoints.getOne(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  create: async (data: { name: string; phone: string }) => {
    const res = await fetch(departmentEndpoints.create(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
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

    return {
      data: result.data,
      message: result.message,
    };
  },

  update: async (id: number, data: { name: string; phone: string }) => {
    const res = await fetch(departmentEndpoints.update(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
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

    return {
      data: result.data,
      message: result.message,
    };
  },

  delete: async (id: number) => {
    const res = await fetch(departmentEndpoints.delete(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    return {
      data: result.data,
      message: result.message,
    };
  },
};
