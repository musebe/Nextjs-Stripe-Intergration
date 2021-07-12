import { join } from "path";
import Datastore from "nedb";

// Custom database class using nedb, a simple flat file database
class Database {
  constructor() {
    this.db = {
      // Create a new datastore for inventory
      inventory: new Datastore({
        filename: join("data", "inventory.db"),
        autoload: true,
      }),
      // Create a new datastore for orders
      orders: new Datastore({
        filename: join("data", "orders.db"),
        autoload: true,
      }),
    };
  }

  // This method queries the database for inventory
  getInventory() {
    return new Promise((resolve, reject) => {
      this.db.inventory.find().exec((err, inventory) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(inventory);
      });
    });
  }

  // This method adds a new item to the inventory datastore
  addNewInventory(item) {
    return new Promise((resolve, reject) => {
      this.db.inventory.insert(item, (err, newDoc) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(newDoc);
      });
    });
  }

  // This method adds a new item to the orders datastore
  addNewOrder(order) {
    return new Promise((resolve, reject) => {
      this.db.orders.insert(order, (err, newDoc) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(newDoc);
      });
    });
  }

  // This method gets an order from the database using the checkout session id
  getOrder(sessionId) {
    return new Promise((resolve, reject) => {
      this.db.orders.findOne({ session: sessionId }, (err, order) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(order);
      });
    });
  }

  // This method queries the database for orders
  getOrders() {
    return new Promise((resolve, reject) => {
      this.db.orders.find().exec((err, orders) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(orders);
      });
    });
  }
}

// Create a new instance of the database class and export it as a singleton
export const database = new Database();
