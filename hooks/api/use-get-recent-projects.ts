import { ProjectType } from "@/schemas/project";
import { ApiResponseType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

type ResponseType = ApiResponseType<ProjectType[]>;

export const useGetRecentProjects = () => {
  const query = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const endpoint = "/api/project/recent";
      const response = await fetch(endpoint);
      const result: ResponseType = await response.json();
      if (response.ok) {
        return result;
      }
    },
  });

  return query;
};
