import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const checkUser = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err: any, decodedToken: any) => {
        if (err) {
          res.locals.user = null;
          res.cookie('jwt', '', { maxAge: 1 });
          next();
        } else {
          const user = await prisma.user.findUnique({
            where: {
              id: decodedToken.id
            }
          });

          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

export const requireAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log(decodedToken.id);
          next();
        }
      }
    );
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
