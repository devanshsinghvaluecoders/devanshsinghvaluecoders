// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../Component/middleware/conn";
import User from "../../Component/middleware/UserSchema";
import bcrypt from "bcryptjs";
import Cookies from "cookies";
const handeler = async (req, res) => {
  if (req.method == "DELETE") {
    const { _id } = req.body;
    // const { _id } = req.param.id;
    // const _id = "609f62c8e71b2a286cfc3135";
    // const id = _id;
    console.log(_id);

    try {
      const data = await User.findByIdAndDelete(_id);
      if (data) {
        res.json({ message: "success" });
      } else {
        res.json({
          error: "failed",
        });
      }
    } catch (err) {
      res.json(err);
    }
  }
};
export default DB(handeler);
