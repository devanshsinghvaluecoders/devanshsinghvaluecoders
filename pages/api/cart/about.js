import DB from "../../../Component/middleware/conn";
import jwtoken from "jsonwebtoken";
import User from "../../../Component/middleware/UserSchema";
import Cookies from "cookies";

const handeler = async (req, res) => {
  const cookies = new Cookies(req, res);
  if (req.method == "GET") {
    try {
      const cook = cookies.get("jwtverify");

      const verifyToken = jwtoken.verify(cook, process.env.SECRET);
      const rootUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": cook,
      });
      if (!rootUser) {
        throw new Error("user not found");
      }
      res.send(rootUser);
    } catch (err) {
      res.status(401).send("unautherised");
      console.log(err);
    }
  }
};
export default DB(handeler);
