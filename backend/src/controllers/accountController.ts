import { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcryptjs";

// * Sends an error response.
const sendError = (
  res: Response,
  code: number,
  errorMessage: string
): Response => {
  return res.status(code).json({ message: errorMessage });
};

// * Validates required fields.
const validateInputData = (fields: Record<string, any>): string | null => {
  const missingFields = Object.keys(fields).filter((key) => !fields[key]);
  return missingFields.length > 0
    ? `${missingFields.join(", ")} are required`
    : null;
};

// * Fetches a user by email.
const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0] || null;
};

// * Verifies if the provided password matches the hashed password.
const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// * Inserts a new user into the database.
const registerUserInDB = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email, role",
    [name, email, hashedPassword]
  );

  return result.rows[0] || null;
};

// * Handles user login.
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const validationError = validateInputData({ email, password });
    if (validationError) return sendError(res, 400, validationError);

    const user = await findUserByEmail(email);
    if (!user) return sendError(res, 401, "Invalid email or password");

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid)
      return sendError(res, 401, "Invalid email or password");

    return res.status(200).json({
      message: "Login Successfully",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal Server Error");
  }
};

// * Handles user registration.

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const validationError = validateInputData({ name, email, password });
    if (validationError) return sendError(res, 400, validationError);

    const user = await registerUserInDB(name, email, password);
    if (!user) return sendError(res, 500, "Failed to create user");

    return res.status(201).json({
      message: "Registered Successfully",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return sendError(res, 500, "Internal Server Error");
  }
};
