import { Prisma } from '@prisma/client';
import prismaClient from './prismaClient';

const register = async (data: Prisma.UserCreateInput) => {
  return prismaClient.user.create({
    data,
  });
};

const usersService = {
  register,
};

export default usersService;
