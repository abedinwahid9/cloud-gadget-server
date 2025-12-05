import { Request, Response } from "express";
import prisma from "../models/prisma";
import { hashPassword, passwordCompare } from "../services/auth.services";
import { jwtSign } from "../libs/jwt/jwt";

// 🔥 CRITICAL: Detect production correctly
const isProduction = process.env.NODE_ENV === "production";

// ✅ Cookie options — dynamic
const access_token_expires = 15 * 60 * 1000; // 15 minutes

const cookieOptions = {
  httpOnly: true,
  secure: isProduction, // true in prod, false in dev
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  maxAge: access_token_expires,
  path: "/", // ensure cookie is sent to all paths
};

// ---------- Login ----------
const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist", type: "email" });
    }

    const isPasswordValid = await passwordCompare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Password is incorrect", type: "password" });
    }

    const accessToken = await jwtSign(
      { email: user.email, id: user.id, role: user.role },
      "15m"
    );

    // ✅ Set cookies
    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("user_role", user.role, {
      ...cookieOptions,
      httpOnly: false, // so frontend can read role (optional)
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};

// ---------- Signup ----------
const userCreate = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashPass = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: { email, password: hashPass, name },
    });

    const accessToken = await jwtSign(
      { email: newUser.email, id: newUser.id, role: newUser.role },
      "15m"
    );

    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("user_role", newUser.role, {
      ...cookieOptions,
      httpOnly: false,
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
};

// ---------- Check Auth ----------
const checkMe = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }
  // ... verify token ...
  res.json({ valid: true });
};

// ---------- Logout ----------
const userLogout = async (req: Request, res: Response) => {
  res.cookie("access_token", "", { ...cookieOptions, maxAge: 0 });
  res.cookie("user_role", "", { ...cookieOptions, maxAge: 0, httpOnly: false });
  return res.status(200).json({ message: "Logged out" });
};

export { userLogin, userCreate, checkMe, userLogout };
