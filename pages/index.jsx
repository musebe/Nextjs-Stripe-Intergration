import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";

import { useRecoilState } from "recoil";
import { cartState } from "../lib/items";
import useSWR from "swr";

export default function Home() {
  const [cart, setCart] = useRecoilState(cartState);

  // Make a call to the /api/inventory endpoint to get existing items. This is run when the component renders
  const { data, error } = useSWR("/api/inventory", async (url) => {
    const res = await fetch(url);

    // Check if the request was successful or not
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      // Attach extra info to the error object.
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return await res.json();
  });

  // Add a new item to the cart global state
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <Layout>
      <div className="actions">
        <Link href="/upload" passHref>
          <button>Add new Item</button>
        </Link>
      </div>
      <div className="items-wrapper">
        {/* Check if the API call was successful and contains items */}
        {data?.result && data?.result?.length
          ? // Map through the items/products and return a div for each item
            data?.result?.map((item, itemIndex) => (
              <div key={itemIndex} className="item">
                <div className="item-image-wrapper">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="item-image"
                  ></Image>
                </div>
                <div className="item-details">
                  <h2 className="item-name">{item.name}</h2>
                  <p className="item-stock">
                    <b>{item.remainingQuantity}</b> Items in stock
                  </p>
                  <p className="item-price">
                    <small className="currency">{item.currency}</small>{" "}
                    <b className="price">{item.price}</b>
                  </p>
                  <button
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
          : "No Items yet. Get started by adding one above"}
      </div>
      <style jsx>{`
        div.actions {
          padding: 20px;
        }
        div.items-wrapper {
          display: flex;
          flex-flow: row wrap;
          gap: 12px;
          padding: 20px;
        }
        div.items-wrapper div.item {
          background-color: #ffffff;
          flex: 1 0 400px;
          min-height: 500px;
          box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
          padding-bottom: 50px;
        }
        div.items-wrapper div.item div.item-image-wrapper {
          width: 100%;
          height: 60%;
          position: relative;
        }
        div.items-wrapper div.item div.item-details {
          height: 40%;
          padding: 20px;
        }
        div.items-wrapper div.item div.item-details .item-name {
          margin: 0;
        }
        button {
          padding: 20px 50px;
          background-color: #6f00ff;
          font-weight: bold;
          color: #ffffff;
          border: solid 2px #6f00ff;
        }
        button:hover {
          background-color: #ffffff;
          font-weight: bold;
          color: #000000;
          border: solid 2px #000000;
        }
      `}</style>
    </Layout>
  );
}
