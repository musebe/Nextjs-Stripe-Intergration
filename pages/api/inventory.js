import { IncomingForm, Fields, Files } from "formidable";
import { handleCloudinaryUpload } from "../../lib/cloudinary";
import { database } from "../../lib/database";

// Custome config for Next.js API route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      try {
        const result = await handleGetRequest();

        return res.status(200).json({ message: "Success", result });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error", error });
      }
    }
    case "POST": {
      try {
        const result = await handlePostRequest(req);

        return res.status(200).json({ message: "Success", result });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error", error });
      }
    }

    default: {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
}

const handleGetRequest = async () => {
  // Get the inventory from the database
  return database.getInventory();
};

const handlePostRequest = async (req) => {
  // Parse the form to get the fields and files
  const data = await parseForm(req);

  // Item image
  const file = data?.files?.file;

  // Item name
  const name = data?.fields?.["name"];

  // Item price
  const price = parseInt(data?.fields?.["price"]);

  // Items remaining in stock
  const remainingQuantity = parseInt(data?.fields?.["quantity"]);

  // Upload the image to Cloudinary
  const result = await handleCloudinaryUpload(file);

  // Save the item to the database
  return database.addNewInventory({
    name,
    price,
    remainingQuantity,
    currency: "USD",
    image: result.secure_url,
  });
};

/**
 *
 * @param {*} req
 * @returns {Promise<{ fields:Fields; files:Files; }>}
 */
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    // Create a new form
    const form = new IncomingForm({ keepExtensions: true, multiples: true });

    // Parse the incoming request form data
    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject(error);
      }

      return resolve({ fields, files });
    });
  });
};
