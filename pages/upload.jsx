/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function Upload() {
  const router = useRouter();

  // Holds the file selected by the file input element
  const [file, setFile] = useState(null);

  // Holds the loading state of the upload
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    // Stop the browser from submitting the form
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(e.target);

      // Upload the file
      const response = await fetch("/api/inventory", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // If the upload was successful, redirect to the home page
        return router.push("/");
      }

      throw data;
    } catch (error) {
      // TODO: Show error message to user
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="wrapper">
        <form onSubmit={handleFormSubmit}>
          {file && (
            <div className="image-preview">
              <img src={URL.createObjectURL(file)} alt="Selected Image"></img>
            </div>
          )}
          <div className="input-group">
            <label htmlFor="file">Item Image</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".jpg,.png"
              multiple={false}
              required
              disabled={loading}
              onChange={(e) => {
                const file = e.target.files[0];

                setFile(file);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="name"
              placeholder="Item Name"
              required
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="itemPrice">Item Price(USD)</label>
            <input
              type="number"
              id="itemPrice"
              name="price"
              placeholder="Item Price"
              required
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="quantity">Item Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Item Quantity"
              required
              disabled={loading}
            />
          </div>
          <button disabled={loading} type="submit">
            Add Item
          </button>
        </form>
      </div>
      <style jsx>{`
        div.wrapper {
          background-color: #f8fbfd;
          min-height: 100vh;
        }
        form {
          background-color: transparent;
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-flow: column;
          margin: 10px auto;
        }
        form div.image-preview img {
          width: 100%;
        }
        form div.input-group {
          display: flex;
          flex-flow: column;
          background-color: #ffffff;
          margin: 10px 0;
          padding: 10px;
          border-radius: 5px;
        }
        form div.input-group label {
          font-weight: bold;
          margin: 5px 0;
        }
        form div.input-group input {
          height: 50px;
          border: solid 2px #000000;
          padding: 0 10px;
        }
        form div.input-group input:focus {
          border: solid 2px #6f00ff;
        }
        form button {
          margin: 10px 10px;
          height: 50px;
          background-color: #6f00ff;
          font-weight: bold;
          color: #ffffff;
          border: solid 2px #6f00ff;
        }
        form button:disabled {
          background-color: gray;
          border: solid 2px gray;
        }
        form button:hover {
          background-color: #ffffff;
          font-weight: bold;
          color: #000000;
          border: solid 2px #000000;
        }
      `}</style>
    </Layout>
  );
}
