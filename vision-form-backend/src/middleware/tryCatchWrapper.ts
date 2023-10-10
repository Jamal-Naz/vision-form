import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const tryCatchWrapper =
  (func: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // record to delete doesn't exist
        if (error.code === 'P2025') {
          return next(createError(404));
        }
      }

      return next(createError(500));
    }
  };
