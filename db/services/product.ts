import { db } from "../prisma-client";

export const getProjectsByUser = async (user_id: string | undefined) => {
  const projects = await db.project.findMany({
    where: {
      user_id,
      is_deleted: false,
    },
    orderBy: {
      updated_at: "desc"
    }
  });

  return projects;
};


export const getRecentProjects = async(user_id: string | undefined) => {
  const projects = await db.project.findMany({
    where: {
      user_id,
      is_deleted: false,
    },
    orderBy: {
      updated_at: "desc"
    },
    take: 5
  });

  return projects;
}