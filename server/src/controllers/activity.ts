import { Router } from "express";
import { getAllActivities, deleteActivity, createActivity, updateActivity } from "../services/activity";
import { ActivityCreateSchema } from "../schemas/activity";
import { validateNumber } from "../utils/validateNumberInput";

const router = Router();

router.get("/", async (req, res) => {
  // action
  const result = await getAllActivities();

  // response
  return res.json(result);
});

router.post("/", async (req, res) => {
  // validation
  const data = ActivityCreateSchema.parse(req.body);

  // action
  const response = await createActivity(data);

  // response
  return res.status(201).json(response);
});

router.put("/:id", async (req, res) => {
  // validation
  const id = validateNumber(req.params.id);
  const data = ActivityCreateSchema.parse(req.body);

  // action
  const response = await updateActivity(id, data);

  // response
  return res.json(response);
});

router.delete("/:id", async (req, res) => {
  // validation
  const id = validateNumber(req.params.id);

  // action
  await deleteActivity(id);

  // response
  return res.sendStatus(204);
});

export default router;
