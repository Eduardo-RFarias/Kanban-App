import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import { HttpError } from "http-errors";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const handlePrismaError: ErrorRequestHandler = (error, req, res, next) => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return res.status(400).json({
      message: error.message.replace(/(\r\n|\n|\r)/gm, ""),
    });
  }

  return next(error);
};

export const handleZodError: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      message: fromZodError(error).toString(),
    });
  }

  return next(error);
};

export const handleHttpError: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }

  return next(error);
};

export const handleUnknownError: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof Error) {
    return res.status(500).json({ message: error.message });
  }

  return next(error);
};
