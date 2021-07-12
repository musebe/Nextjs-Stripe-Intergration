import { database } from "../../lib/database";
import { sendEmail } from "../../lib/mail";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        const result = await handlePostRequest(req.body);

        return res.status(200).json({ message: "Success", result: "" });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error", error });
      }
    }

    default: {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
}

const handlePostRequest = async (response) => {
  // Find the order that matches the checkout session id
  const order = await database.getOrder(response.data.object.id);

  // Send email using nodemailer
  await sendEmail(response.data.object.customer_details.email, order);
};
