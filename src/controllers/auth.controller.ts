import { Request, Response } from "express";
import prisma from "../models/prisma";
import { hashPassword, passwordCompare } from "../services/auth.services";
import { jwtSign, jwtVerify } from "../libs/jwt/jwt";

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "none" | "lax" | "strict" | undefined;
  path: string;
  maxAge: number;
};

const access_token_expires = 15 * 60 * 1000;
const jwt_expires = "5hr";

const isProd = process.env.NODE_ENV === "production";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: access_token_expires,
};

// ----------------- check me ------------------------
const checkMe = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json({ message: "Not logged in" });
    const payload = jwtVerify(token);

    res.status(201).json({ message: "user get", payload });
  } catch (err) {
    res.status(402).json({ message: "user not found", err });
  }
};

// ---------- sign up functionality ---------------------
const userCreate = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (req?.user !== email) {
      res.status(403).json({ message: "user not found" });
    }
    // todo bcrypt.hash(myPlaintextPassword, saltRounds);
    const hashPass = await hashPassword(password);
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (user)
      return res
        .status(201)
        .json({ message: "this email already exists, use another email" });

    const newUser = await prisma.user.create({
      data: { email, password: hashPass, name },
    });

    const accessToken = await jwtSign(
      { email: newUser.email, id: newUser.id, role: newUser.role },
      jwt_expires
    );
    // Set cookie for token
    res.cookie("access_token", accessToken, cookieOptions);

    // Set cookie for user role
    res.cookie("user_role", newUser.role, cookieOptions);

    res.status(200).json({
      message: "signup successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "signup failed", err });
  }
};

// ---------- login in functionality ---------------------
const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user?.email)
      return res.status(202).json({ message: "user is not exists" });

    // todo bcrypt.compare(password, dbPass);
    const confirmPassword = await passwordCompare(password, user.password);
    if (!confirmPassword)
      return res.status(203).json({ message: "password wrong" });

    const accessToken = await jwtSign(
      { email: user.email, id: user.id, role: user.role },
      jwt_expires
    );
    // Set cookie
    res.cookie("access_token", accessToken, cookieOptions);
    // Set cookie for user role
    res.cookie("user_role", user.role, cookieOptions);

    return res.status(200).json({
      message: "login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        path: "/",

        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "login failed, please try again", err });
  }
};

const userLogout = async (req: Request, res: Response) => {
  try {
    // Delete cookies by setting maxAge=0
    res.cookie("access_token", "", { ...cookieOptions, maxAge: 0 });

    res.cookie("user_role", "", { ...cookieOptions, maxAge: 0 });

    return res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    return res.status(503).json({ message: "Logout failed", err });
  }
};

export { userCreate, userLogin, userLogout, checkMe };
