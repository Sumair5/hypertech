import { configureStore } from "@reduxjs/toolkit";
import randomReducer from "./RandomSlice"; // ✅ صحیح امپورٹ کریں
import friendshipReducer from "./FriendshipSlice"; 
import mobileReducer from "./MobileSlice";
import laptopReducer from "./LaptopSlice";
const store = configureStore({
  reducer: {
    random: randomReducer,
    friendship: friendshipReducer,
    mobiles: mobileReducer,
    laptops: laptopReducer,
  },
});

export default store;
