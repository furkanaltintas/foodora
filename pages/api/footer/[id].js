import Footer from "@/models/Footer";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  const mongoose = require("mongoose");
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid footer ID" });
  }

  if (method === "GET") {
    try {
      const footer = await Footer.findById(id);
      if (!footer)
        return res.status(404).json({ message: "Footer not found" });
      res.status(200).json(product);
    } catch (err) {
      console.error("GET error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  if (method === "PUT") {
    try {
      const footer = await Footer.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!footer) return res.status(404).json({ message: "Footer not found" });
      res.status(200).json(footer);
    } catch (err) {
      console.error("PUT error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default handler;
