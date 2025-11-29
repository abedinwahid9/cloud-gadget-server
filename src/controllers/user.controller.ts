import { Request, Response } from "express";
import prisma from "../models/prisma";
import { Role } from "@prisma/client";

const userGetRoleBased = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ message: "role query is required" });
    }

    // Convert to array (support comma separated: admin,vendor)
    const roles = String(role)
      .split(",")
      .map((r) => r.trim().toUpperCase());

    // Validate and map to enum
    const validRoles: Role[] = roles.filter((r) =>
      Object.values(Role).includes(r as Role)
    ) as Role[];

    if (validRoles.length === 0) {
      return res.status(400).json({ message: "Invalid role(s)" });
    }

    const users = await prisma.user.findMany({
      where: {
        role: {
          in: validRoles,
        },
      },
    });

    res.status(200).json({
      message: `Users fetched for roles: ${validRoles.join(", ")}`,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export { userGetRoleBased };
