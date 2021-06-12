import DB from "../../Component/middleware/conn";
import jwtoken from "jsonwebtoken";
import User from "../../Component/middleware/UserSchema";
import Cookies from "cookies";
/*
 * @file: get-list.js
 * @description: It Contain get admin dashboard router/api.
 * @author: Taniya
 */
/**
 * @swagger
 * /api/data:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
const handeler = async (req, res) => {
  const cookies = new Cookies(req, res);
  if (req.method == "GET") {
    try {
      const cook = cookies.get("jwtverify");

      const verifyToken = jwtoken.verify(cook, process.env.SECRET);
      if (verifyToken === "unautherised") {
        res.send("no");
      } else {
        const rootUser = await User.find({});
        if (!rootUser) {
          throw new Error("user not found");
        }
        res.send(rootUser);
      }
    } catch (err) {
      res.status(401).send("unautherised");
      console.log(err);
    }
  }
};
export default DB(handeler);
