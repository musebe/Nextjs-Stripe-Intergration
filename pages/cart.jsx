import Image from "next/image";
import { useRecoilState } from "recoil";
import Layout from "../components/Layout";
import { cartState } from "../lib/items";

export default function Cart() {
  const [cart, setCart] = useRecoilState(cartState);

  const removeFromCart = (item) => {
    //  This is a hack to get around the fact that the cart contains read-only items. So we need to clone it so we can modify it.
    const copiedCart = [...cart];

    // Remove the item from the copied cart
    copiedCart.splice(copiedCart.indexOf(item), 1);

    // Set the new cart as the copied cart
    setCart(copiedCart);
  };

  const handleCheckout = async () => {
    try {
      // Make a request to the server to checkout the cart. We pass the items in the cart in the body of the request.
      const response = await fetch("/api/pay", {
        method: "POST",
        body: JSON.stringify({
          items: cart,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // If the server returns a 200 OK, then we can assume that the checkout was successful. We redirect to the stripe payment page in a new tab
        window.open(data.result.url, "_blank");
        return;
      }

      throw data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="wrapper">
        <div className="cart">
          <h2>Your cart has {cart.length} items</h2>
          <hr />
          <div className="cart-items-wrapper">
            {cart.map((item, itemIndex) => (
              <div key={itemIndex} className="cart-item">
                <div className="item-image-wrapper">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  ></Image>
                </div>
                <div className="item-details">
                  <b>{item.name}</b>
                  <p>
                    {item.currency} {item.price}
                  </p>
                  <button
                    onClick={() => {
                      console.log(item);
                      removeFromCart(item);
                    }}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <p>
              Total: <small>USD</small>{" "}
              <b>
                {cart.reduce((total, item) => {
                  return total + item.price;
                }, 0)}
              </b>
            </p>
          </div>
          <button
            onClick={() => {
              handleCheckout();
            }}
          >
            {" "}
            CHECKOUT
          </button>
        </div>
      </div>
      <style jsx>{`
        div.wrapper {
          background-color: #f8fbfd;
        }
        div.cart {
          background-color: transparent;
          margin: 20px auto;
          max-width: 800px;
          min-height: calc(100vh - 100px);
          display: flex;
          flex-flow: column;
        }
        div.cart > h2,
        div.cart > p {
          margin: 10px 0;
          text-align: center;
        }
        div.cart > button {
          padding: 20px 0;
          background-color: #6f00ff;
          font-weight: bold;
          color: #ffffff;
          border: none;
        }
        div.cart > button:hover {
          background-color: #ffffff;
          font-weight: bold;
          color: #000000;
          border: solid 2px #000000;
        }
        div.cart-items-wrapper {
          display: flex;
          flex-flow: column;
          flex: 1 0 auto;
          overflow-y: auto;
          gap: 10px;
        }
        div.cart-items-wrapper div.cart-item {
          display: flex;
          flex-flow: row no-wrap;
          height: 150px;
          background-color: #ffffff;
        }
        div.cart-items-wrapper div.cart-item div.item-image-wrapper {
          position: relative;
          width: 20%;
        }
        div.cart-items-wrapper div.cart-item div.item-details {
          width: 80%;
          padding: 10px;
          display: flex;
          flex-flow: column;
        }
        div.cart-items-wrapper div.cart-item div.item-details button {
          width: max-content;
        }
      `}</style>
    </Layout>
  );
}
