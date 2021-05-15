// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../Component/middleware/conn";
import User from "../../Component/middleware/UserSchema";
const handeler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, phone, work, password, Cpassword } = req.body;
    try {
      if (!name || !email || !phone || !work || !password || !Cpassword) {
        res.json({ error: "please fill all" });
      } else {
        User.findOne({ email })
          .then((userExist) => {
            if (userExist) {
              res.json({ error: "user already exist" });
            } else {
              const data = new User({
                name,
                email,
                phone,
                work,
                password,
                Cpassword,
              });
              data
                .save()
                .then(() => res.json({ message: "data saved sucessfully" }))
                .catch((err) => res.json({ error: "no save" }));
            }
          })
          .catch((err) => res.json(err));
      }
    } catch (err) {
      res.json(err);
    }
  } else {
    res.status(200).json({ name: "John Doe" });
  }
};
export default DB(handeler);
