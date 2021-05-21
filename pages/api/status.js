// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../Component/middleware/conn";
import User from "../../Component/middleware/UserSchema";

const handeler = async (req, res) => {
  if (req.method == "PUT") {
    const { _id, status } = req.body;

    try {
      const data = await User.findByIdAndUpdate(
        { _id },
        {
          $set: {
            status: !status,
          },
        }
      );
      res.json({ message: "succes" });
    } catch (err) {
      res.json({ error: "error" });
    }
  }
};
export default DB(handeler);
