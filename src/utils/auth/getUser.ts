import { authenticateJWT } from "../../passport/jwt";
export default async (req, res) => {
  try {
    return await authenticateJWT(req, res);
  } catch (e) {
    new Error(e);
  }
};
