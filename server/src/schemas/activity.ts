import { z } from "zod";
import { Type } from "@prisma/client";

export const ActivityCreateSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(100),
  date: z.string().datetime(),
  user: z.string().min(3).max(50),
  type: z.nativeEnum(Type),
});

export type ActivityCreateInput = z.infer<typeof ActivityCreateSchema>;

export interface ActivityResponse {
  id: number;
  title: string;
  description: string;
  date: Date;
  user: string;
  type: Type;
}
