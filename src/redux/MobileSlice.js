import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/mobiles`;
// 🔹 Helper function for API Calls
const fetchAPI = async (url, method, data) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to process request");
  return await response.json();
};

// 🔹 Async Thunks
export const addMobile = createAsyncThunk("mobiles/addMobile", async (mobileData, { rejectWithValue }) => {
  try {
      // ✅ Call helper function (which already parses JSON)
       await fetchAPI(`${BASE_URL}`, "POST", mobileData);

      // ✅ Show success alert (optional)
      alert("✅ Product added successfully");

      // ✅ Return 'ok' to signal success
      return "ok";
    } catch (error) {
      // ✅ Handle error case
       alert("❌ Error adding product");
      return rejectWithValue(error.message);
    }
  
});

export const updateMobile = createAsyncThunk("mobiles/updateMobile", async (mobileData, { rejectWithValue }) => {
  try {
     await fetchAPI(`${BASE_URL}/${mobileData.id}`, "PUT", mobileData);
      alert("✅ Product updated successfully");

  } catch (error) {
           alert("❌ Error updating product");

    return rejectWithValue(error.message);
  }
});

// 🔹 Redux Slice
const MobileSlice = createSlice({
  name: "mobiles",
  initialState: {
    mobiles: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetMobiles: (state) => {
      state.mobiles = []; // ✅ Success کے بعد array empty کرنے کے لیے
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMobile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addMobile.fulfilled, (state, action) => { state.loading = false; state.mobiles.push(action.payload); })
      .addCase(addMobile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateMobile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateMobile.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.mobiles.findIndex(mobile => mobile.id === action.payload.id);
        if (index !== -1) state.mobiles[index] = action.payload;
      })
      .addCase(updateMobile.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetMobiles } = MobileSlice.actions;
export default MobileSlice.reducer;
