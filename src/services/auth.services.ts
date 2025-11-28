import bcrypt from "bcrypt";

export const hashPassword = (myPlaintextPassword: string) => {
  return bcrypt.hash(myPlaintextPassword, 10);
};

export const passwordCompare = (password: string, dbPass: string) => {
  return bcrypt.compare(password, dbPass);
};
