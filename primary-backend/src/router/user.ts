import { Router } from 'express';
import { authMiddleware } from '../middleware';
import { SigninSchema, SignupSchema } from '../types';
import { prismaClient } from '../db';
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from '../config';

const router = Router();

router.post('/signup', async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(411).json({
            message: "Incorrect input"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            name: parsedData.data.name,
            password: parsedData.data.password
        }
    })

    return res.json({
        message: "Please verfiy your account by checking your email"
    });

})

router.post('/signin', async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect input"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });

    if (!user) {
        return res.status(401).json({
            message: "Incorrect username or password"
        })
    }

    //sign the jwt
    const token = jwt.sign({
        id: user.id,

    }, JWT_PASSWORD);

    //sign the jwt
    res.json({ token: token, });
})

router.get('/user', authMiddleware, async (req, res) => {
    console.log("user handler");
    //TODO: fix the type
    //@ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({ user });
})

export const userRouter = router;
