import DB from "../../Component/middleware/conn";
import jwtoken from "jsonwebtoken";
import User from "../../Component/middleware/UserSchema";
import Cookies from "cookies";

const handeler = async (req, res) => {
  const cookies = new Cookies(req, res);
  if (req.method == "POST") {
    try {
      const cook = cookies.get("jwtverify");

      const verifyToken = jwtoken.verify(cook, process.env.SECRET);
      const { name, email, phone, message } = req.body;
      if (!name || !email || !phone || !message) {
        console.log("error from contact");
        res.json({ error: "plz fill all" });
      }
      const UserContact = await User.findOne({ _id: verifyToken._id });
      if (UserContact) {
        await UserContact.addMessage(name, email, phone, message);
        // await userMessage.save();
        res.status(200).json({ message: "yes" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
export default DB(handeler);
