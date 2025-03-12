import { useRecentProjectsQuery } from "@/hooks/api/use-recent-projects-query";
import { useSlideStore } from "@/store/use-slide-store";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { useSidebar } from "../ui/sidebar";
import { JsonValue } from "@prisma/client/runtime/library";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const RecentProjects = () => {
  const { data, isLoading } = useRecentProjectsQuery();
  const { open } = useSidebar();
  const { setSlides } = useSlideStore();
  const router = useRouter();

  if (!open) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="px-4 pt-5 text-sm">
        <p className="text-muted-foreground">Recently Opened</p>
        <div className="space-y-4 mt-5">
          {new Array(5).fill(null).map((_, index) => (
            <Skeleton key={index} className="h-5 w-[200px] rounded-sm" />
          ))}
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return null;
  }

  const handleClickProject = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      return toast.error("project not found", {
        description: "Please retry again.",
      });
    }
    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };

  return (
    <div className="px-4 pt-5 text-sm ">
      <p className="text-muted-foreground">Recently Opened</p>
      <div className="mt-5">
        {data.data.map((project) => (
          <p
            onClick={() => handleClickProject(project.id, project.slides)}
            key={project.id}
            className="w-full truncate cursor-pointer hover:bg-accent px-2 py-2 rounded-lg "
          >
            {project.title}
          </p>
        ))}
      </div>
    </div>
  );
};
