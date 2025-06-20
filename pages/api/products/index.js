import dbConnect from "@/util/dbConnect";
import Product from "@/models/Product";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.error("GET error: ", err);
    }
  }

  if (method === "POST") {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      console.error("POST error: ", err);
    }
  }
};

export default handler;
