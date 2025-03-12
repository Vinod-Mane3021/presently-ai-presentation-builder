import { ProjectType } from "@/schemas/project";
import { ApiResponseType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

type ResponseType = ApiResponseType<ProjectType[]>;

export const useRecentProjectsQuery = () => {
  const query = useQuery({
    queryKey: ["recent-projects"],
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
