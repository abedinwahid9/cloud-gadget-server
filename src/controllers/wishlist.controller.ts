import { Request, Response } from "express";
import prisma from "../models/prisma";
import { jwtVerify } from "../libs/jwt/jwt";

const getAllWistListByUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Not logged in" });
    const decoded = jwtVerify(token);
    const userId = decoded.id;
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: userId },
      select: {
        user: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
            images: true,
            price: true,
            discount: true,
            category: true,
          },
        },
      },
    });
    const wishlistProducts = wishlist.map((item) => item.product);

    res.status(200).json({ message: "get all wishlist", wishlistProducts });
  } catch (err) {
    res.status(500).json({ message: "wishlist not get", err });
  }
};

const wishlistCreate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const check = await prisma.wishlist.findFirst({
      where: {
        AND: [{ userId: body.userId }, { productId: body.productId }],
      },
    });

    if (check) {
      return res.status(201).json({ message: "wishlist already add" });
    }

    const wishlist = await prisma.wishlist.create({
      data: body,
    });

    res.status(201).json({ message: "wishlist successfully done", wishlist });
  } catch (err) {
    res.status(502).json({ message: "wishlist is not create", err });
  }
};

export { wishlistCreate, getAllWistListByUser };
