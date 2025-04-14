import React, { useState } from "react";
import { useLogin } from "./useLogin";
import ResponseApiError from "@/lib/api-errors";
type UseAuthSubmitReturn = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loginMutation: ReturnType<typeof useLogin>;
  error: string | string[];
  validationErrors: string[];
};
const useAuthSubmit = (): UseAuthSubmitReturn => {
  const [error, setError] = useState<string | string[]>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const loginMutation = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = (
      event.currentTarget.elements.namedItem("username") as HTMLInputElement
    )?.value;
    const password = (
      event.currentTarget.elements.namedItem("password") as HTMLInputElement
    )?.value;

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {},
        onError: (error) => {
          setError(""); // Reset pesan error umum
          setValidationErrors([]); // Reset array validationErrors

          if (error instanceof ResponseApiError) {
            if (error.status === 401) {
              setError(error.message);
            } else if (Array.isArray(error.validationErrors)) {
              const messages = error.validationErrors.map(
                (validationError) => validationError.message,
              );
              setError(messages);
              console.log("validationErrors", messages); // Log array pesan
            } else {
              setError(error.message || "Terjadi kesalahan saat login.");
            }
          } else if (error instanceof Error) {
            setError(
              error.message || "Terjadi kesalahan jaringan atau lainnya.",
            );
          } else {
            setError("Terjadi kesalahan yang tidak diketahui.");
          }
        },
      },
    );
  };

  return {
    handleSubmit,
    loginMutation,
    error,
    validationErrors,
  };
};

export default useAuthSubmit;
