import { Response } from "express";

interface AppError extends Error {
  statusCode?: number; 
}

export const handleError = (
  res: Response,
  error: AppError,
  description: string,
  statusCode: number = 500
) => {
  return res.status(statusCode).json({
    description,
    details: error.message || "Erro interno do servidor.",
  });
};
