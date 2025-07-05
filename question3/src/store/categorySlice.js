
import { createSlice } from '@reduxjs/toolkit';

// Initial Redux state for category
const initialState = {
  data: null,       // Holds the category tree
  loading: false,   // True while fetching
  error: null       // Holds error message if fetch fails
};

// Create the slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },


    fetchCategoriesSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },


    fetchCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Export the actions (for dispatching)
export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} = categorySlice.actions;

// Export the reducer (for store/index.js)
export default categorySlice.reducer;
