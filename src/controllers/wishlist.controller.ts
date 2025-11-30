import { Request, Response } from "express";
import prisma from "../models/prisma";

const wishlistCreate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const check = await prisma.wishlist.findMany({
      where: {
        OR: [{ id: body.userId }, { productId: body.productId }],
      },
    });
    if (check.length > 0) {
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

export { wishlistCreate };
