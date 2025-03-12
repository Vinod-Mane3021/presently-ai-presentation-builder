import { SignUpType } from "@/schemas/user";
import { ApiResponseType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

type RequestType = SignUpType;
type ResponseType = ApiResponseType;

export const useSignUpMutation = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const endpoint = "/api/auth/sign-up";
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(json),
      });
      
      const data: ResponseType = await response.json();
      console.log({ data: data });

      if (response.ok) {
        return data;
      }
      throw new Error(data.message);
    },
  });
  return mutation;
};
