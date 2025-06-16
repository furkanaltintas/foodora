import Category from "@/models/Category";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  const mongoose = require("mongoose");
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  if (method === "GET") {
    try {
      const category = await Category.findById(id);
      if (!category) return res.status(404).json({ message: "Category not found" });
      res.status(200).json(category);
    } catch (err) {
      console.error("GET error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  if (method === "DELETE") {
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) return res.status(404).json({ message: "Category not found" });
      res.status(200).json(category);
    } catch (err) {
      console.error("GET error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default handler;
