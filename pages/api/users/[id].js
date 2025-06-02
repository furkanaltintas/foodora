import dbConnect from "@/util/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  const mongoose = require("mongoose");
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      console.error("GET error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  if (method === "PUT") {
    try {
      if (req.body.password) {
        console.log("Password işlemleri yapılıyor...");
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.confirmPassword = await bcrypt.hash(
          req.body.confirmPassword,
          10
        );
      }

      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log("PUT error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default handler;
