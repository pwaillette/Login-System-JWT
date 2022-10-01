import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const logIn = (req: any, res: any) => {
  const { email, password } = req.body;
  prisma.user
    .findFirst({
      where: {
        email
      }
    })
    .then(async (user: any) => {
      bcrypt.compare(password, user.password, (err: any, result: any) => {
        if (result) {
          const token = createToken(user.id);
          res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
          res.status(200).json({ user: user.id });
        } else {
          res.status(401).json({ message: 'Password incorrect' });
        }
      });
    })
    .catch((err: any) => {
      res.status(400).json({ message: 'Incorrect email' });
    });
};

export const signUp = async (req: any, res: any) => {
  const { email, password } = req.body;
  await prisma.user
    .findFirst({
      where: {
        email
      }
    })
    .then(async (user: any) => {
      if (user) {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user
          .create({
            data: {
              email,
              password: hashedPassword
            }
          })
          .then((user: any) => {
            res.status(201).json(user);
          })
          .catch((err: any) => {
            res.status(400).json({ message: 'Email already exists' });
          });
      }
    })
    .catch((err: any) => {
      res.status(400).json({ message: 'Something went wrong' });
    });
};

export const logOut = (req: any, res: any) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};

const createToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 1000
  });
};
