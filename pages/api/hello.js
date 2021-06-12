// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../Component/middleware/conn";
import User from "../../Component/middleware/UserSchema";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 *       400:
 *         description: value not found
 */
const handeler = async (req, res) => {
  if (req.method == "PUT") {
    const { _id, name, email, phone, work } = req.body;
    // const { _id } = req.param.id;
    // const _id = "60a609e2a1862032548cdefd";
    // const id = _id;

    try {
      if (!email || !name || !work || !phone) {
        res.json({ error: "please fill all" });
      } else {
        const data = await User.findByIdAndUpdate(
          { _id },
          {
            $set: {
              name,
              email,
              work,
              phone,
            },
          }
        );
        console.log(data);
      }
    } catch (err) {
      res.json(err);
    }
  }
};
export default DB(handeler);
