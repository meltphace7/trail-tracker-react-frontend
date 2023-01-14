import { createSlice } from "@reduxjs/toolkit";

const initialTrailState = {
  currentQueryType: "All",
  currentSearchQuery: "All",
};

const trailSlice = createSlice({
  name: "trails",
  initialState: initialTrailState,
  reducers: {
    setQuery(state, action) {
          const type = action.payload.filterType;
          const query = action.payload.filterQuery;
          state.currentSearchQuery = query;
          state.currentQueryType = type
    },
  },
});

export const trailActions = trailSlice.actions;

export default trailSlice;
