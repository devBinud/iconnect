import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyArDqtcSmGsHreF89UWHVxsiivO9vZr8E8",
  authDomain: "iconnect-58f0b.firebaseapp.com",
  databaseURL: "https://iconnect-58f0b-default-rtdb.firebaseio.com",
  projectId: "iconnect-58f0b",
  storageBucket: "iconnect-58f0b.firebasestorage.app",
  messagingSenderId: "343564096721",
  appId: "1:343564096721:web:70c585e32e2679f5c1e1f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Function to store new mobile product data in Firebase
 * @param {Object} productData - The mobile product data to store
 * @param {string} productData.company - Mobile company (e.g., Samsung, iPhone)
 * @param {string} productData.name - Mobile product name
 * @param {number} productData.regularPrice - Regular price of the mobile
 * @param {number} productData.discount - Discount percentage
 * @param {number} productData.salePrice - Final sale price after discount
 */
const storeMobileProduct = (productData) => {
  const productsRef = ref(database, 'mobileProducts');
  const newProductRef = push(productsRef);
  set(newProductRef, productData)
    .then(() => {
      console.log("Mobile product added successfully!");
    })
    .catch((error) => {
      console.error("Error adding mobile product:", error);
    });
};

// Export the function as a default export
export default storeMobileProduct;
