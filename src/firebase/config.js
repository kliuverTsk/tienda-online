import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0fiGGAPDwRC-tTvQLzP_p1ckM3qWBie8",
  authDomain: "tienda-online-45d1c.firebaseapp.com",
  projectId: "tienda-online-45d1c",
  storageBucket: "tienda-online-45d1c.firebasestorage.app",
  messagingSenderId: "99161079417",
  appId: "1:99161079417:web:5fca3cb0ae9b3525921ea8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);