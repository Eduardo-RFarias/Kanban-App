import { prisma } from "../prisma";
import { ActivityCreateInput, ActivityResponse } from "../schemas/activity";

export async function getAllActivities(): Promise<ActivityResponse[]> {
  const data = await prisma.activity.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return data.map((activity) => ({
    id: activity.id,
    title: activity.title,
    description: activity.description,
    date: activity.date,
    user: activity.user,
    type: activity.type,
  }));
}

export async function createActivity(dto: ActivityCreateInput): Promise<ActivityResponse> {
  const activity = await prisma.activity.create({
    data: {
      title: dto.title,
      description: dto.description,
      date: dto.date,
      type: dto.type,
      user: dto.user,
    },
  });

  return {
    id: activity.id,
    title: activity.title,
    description: activity.description,
    date: activity.date,
    user: activity.user,
    type: activity.type,
  };
}

export async function updateActivity(id: number, dto: ActivityCreateInput): Promise<ActivityResponse> {
  const activity = await prisma.activity.update({
    where: {
      id,
    },
    data: {
      title: dto.title,
      description: dto.description,
      date: dto.date,
      type: dto.type,
      user: dto.user,
    },
  });

  return {
    id: activity.id,
    title: activity.title,
    description: activity.description,
    date: activity.date,
    user: activity.user,
    type: activity.type,
  };
}

export async function deleteActivity(id: number): Promise<void> {
  await prisma.activity.delete({
    where: {
      id,
    },
  });
}
