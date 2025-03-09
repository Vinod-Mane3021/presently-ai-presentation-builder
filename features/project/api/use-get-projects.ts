import { ProjectType } from "@/schemas/project";
import { ApiResponseType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

type ResponseType = ApiResponseType<ProjectType[]>;

export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const endpoint = "/api/project";
      const response = await fetch(endpoint);
      const result: ResponseType = await response.json();
      if (response.ok) {
        return result;
      }
      throw new Error("Error while fetching products");
    },
  });

  return query;
};
