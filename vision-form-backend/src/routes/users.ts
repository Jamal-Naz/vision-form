import { Router, Request, Response } from 'express';
import { tryCatchWrapper } from '../middleware/tryCatchWrapper';
import { Prisma } from '@prisma/client';
import usersService from '../services/users';
import prismaClient from '../services/prismaClient';

const router = Router();

router.post(
  '/register',
  tryCatchWrapper(async (request: Request, response: Response) => {
    const allowedFields: (keyof Prisma.UserCreateInput)[] = [
      'firstName',
      'surname',
      'email',
      'telephone',
      'gender',
      'dob',
      'comments',
    ];

    const userData = allowedFields.reduce((obj, field) => {
      if (request.body[field]) obj[field] = request.body[field];
      return obj;
    }, {} as Partial<Prisma.UserCreateInput>);

    if (!userData.email || !userData.firstName || !userData.surname) {
      return response
        .status(400)
        .json({ error: 'Required fields are missing.' });
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return response
        .status(400)
        .json({ error: 'A user with this email already exists.' });
    }

    if (userData.dob && typeof userData.dob === 'string') {
      userData.dob = new Date(userData.dob);
    }

    const newUser = await usersService.register(
      userData as Prisma.UserCreateInput,
    );

    response.status(201).json(newUser);
  }),
);

export default router;
