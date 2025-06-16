import Footer from "@/models/Footer";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const footers = await Footer.findOne(); // Bir tane footer olduğu için find değil findOne yöntemi kullanıyoruz.
      res.status(200).json(footers);
    } catch (err) {
      console.error("GET error: ", err);
    }
  }

  if (method === "POST") {
    try {
      const newFooter = await Footer.create(req.body);
      res.status(201).json(newFooter);
    } catch (err) {
      console.error("POST error: ", err);
    }
  }
};

export default handler;
