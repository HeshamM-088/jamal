import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCreditsDetails = createAsyncThunk(
  "getCreditsDetails",
  async (movieid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      console.log(movieid);
      const details = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}/credits`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
        },
      });
      return details.data;
    } catch (er) {
      return rejectWithValue(er);
    }
  }
);

const data = {
  movieCreditsDetailsLoading: false,
  movieCreditsDetailsError: null,
  movieCreditsDetailsdata: null,
};

const movieCreditsDetails = createSlice({
  name: "movieCreditsDetails",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getCreditsDetails.pending, (state, action) => {
      state.movieCreditsDetailsLoading = true;
    });
    builder.addCase(getCreditsDetails.fulfilled, (state, action) => {
      state.movieCreditsDetailsLoading = false;
      state.movieCreditsDetailsdata = action.payload;
    });
    builder.addCase(getCreditsDetails.rejected, (state, action) => {
      state.movieCreditsDetailsLoading = false;
      state.movieCreditsDetailsError = action.error.message;
    });
  },
});

export const moviesCreditsDetails = movieCreditsDetails.reducer;
