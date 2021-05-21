// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../Component/middleware/conn";
import User from "../../Component/middleware/UserSchema";
import bcrypt from "bcryptjs";
import Cookies from "cookies";
const handeler = async (req, res) => {
  if (req.method == "POST") {
    const { email, password } = req.body;
    const cookies = new Cookies(req, res);

    try {
      if (!email || !password) {
        res.json({ error: "please fill all" });
      } else {
        const user = await User.findOne({ email });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);

          //   res.cookie("jwtverify", token, {
          //     expires: new Date(Date.now() + 25892000),
          //     httpOnly: true,
          //   });
          if (user.status === true) {
            if (isMatch) {
              const token = await user.generateToken();

              cookies.set("jwtverify", token, {
                expires: new Date(Date.now() + 25892000),
                httpOnly: true,
              });
              res.json({ message: "login successful" });
            } else {
              res.json({ error: "invalid credential" });
            }
          } else {
            res.json({ error: "user deactive" });
          }
        } else {
          res.json({ error: "invalid credential" });
        }
      }
    } catch (err) {
      res.json(err);
    }
  }
};
export default DB(handeler);
