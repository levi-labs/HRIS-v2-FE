import { useMutation,useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/request";
import { useRouter } from "next/navigation";
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,

    onSuccess: ({ token, user }) => {

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      queryClient.clear()
      router.push("/dashboard");
    },
  });
};
