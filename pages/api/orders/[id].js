import Order from "@/models/Order";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  const mongoose = require("mongoose");
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (err) {
      console.error("GET error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  if (method === "DELETE") {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (err) {
      console.error("DELETE error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

    if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (err) {
      console.error("PUT error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default handler;
