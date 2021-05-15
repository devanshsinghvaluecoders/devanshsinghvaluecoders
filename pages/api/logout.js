// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../Component/middleware/conn";
import Cookies from "cookies";

const handeler = async (req, res) => {
  if (req.method == "GET") {
    const cookies = new Cookies(req, res);
    cookies.set("jwtverify");
    res.send("done");
  }
};
export default DB(handeler);
