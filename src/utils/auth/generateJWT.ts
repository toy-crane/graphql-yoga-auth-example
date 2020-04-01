import * as jwt from "jsonwebtoken";
export default (id: string, email: string): string => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
