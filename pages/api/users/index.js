import dbConnect from "@/util/dbConnect";
import User from "@/models/User";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error("GET error: ", err);
    }
  }

  if (method === "POST") {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      console.error("POST error: ", err);
    }
  }
};

export default handler;
