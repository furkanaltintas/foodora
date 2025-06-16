import Product from "@/models/Product";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  const mongoose = require("mongoose");
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (err) {
      console.error("GET error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  if (method === "DELETE") {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (err) {
      console.error("GET error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default handler;
