import createHttpError from "http-errors";

export function validateNumber(input: string): number {
  const number = parseInt(input);

  if (isNaN(number)) {
    throw new createHttpError.BadRequest("Invalid number");
  }

  return number;
}
