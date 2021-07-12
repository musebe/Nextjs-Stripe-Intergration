import stripe from "stripe";
import { database } from "../../lib/database";

// Create a new stripe instance using your own secret key
const client = stripe(process.env.STRIPE_SECRET_KEY);

// Custom configuration for Next.js api route.
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        // Handle the pay request and pass the items from the cart
        const result = await handlePostRequest(req.body.items);

        // Return a successful response with the stripe checkout result
        return res.status(200).json({ message: "Success", result });
      } catch (error) {
        console.log(error);
        // Return an unsuccessfull response with the error message
        return res.status(400).json({ message: "Error", error });
      }
    }

    default: {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
}

const handlePostRequest = async (items) => {
  // Reduce the items so as to group similar items together. Similar items will be appended to the same array. So we will have an array of arrays.
  const lineItems = items.reduce((groupedItems, item) => {
    // Check if there's an existing array for the same item.
    const existingInGroup = groupedItems.find((a) =>
      a.some((i) => i._id === item._id)
    );

    if (existingInGroup) {
      // If an array for the same item already exists, append the new item to the array.
      existingInGroup.push(item);
    } else {
      // If no array for the same item exists, create a new array and push the item to the array. Then push the array to the groupedItems array.
      groupedItems.push([item]);
    }

    return groupedItems;
  }, []);

  // Create a new Stripe payment checkout session
  const session = await client.checkout.sessions.create({
    // Stripe payment methods to accept
    payment_method_types: ["card"],
    // Map the line items to the checkout session
    line_items: lineItems.map((items) => {
      // Since each item is an array of similar items, we just need the first item in the array.
      const [item] = items;

      // Return a new line item
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          // Convert the price to cents
          unit_amount: item.price * 100,
        },
        quantity: items.length,
      };
    }),
    mode: "payment",
    success_url: `${process.env.BASE_URL}/`,
    cancel_url: `${process.env.BASE_URL}/`,
  });

  // Add the checkout session to the database.
  await database.addNewOrder({
    session: session.id,
    items: lineItems,
  });

  return session;
};
