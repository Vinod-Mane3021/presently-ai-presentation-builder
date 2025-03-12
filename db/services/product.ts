import { db } from "../prisma-client";

export const getProjectsByUser = async (userId: string | undefined) => {
  const projects = await db.project.findMany({
    where: {
      userId,
      isDeleted: false,
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  return projects;
};


export const getRecentProjects = async(userId: string | undefined) => {
  const projects = await db.project.findMany({
    where: {
      userId,
      isDeleted: false,
    },
    orderBy: {
      updatedAt: "desc"
    },
    take: 5
  });

  return projects;
}