// usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async ({ table_name }, thunkAPI) => {
    try {
      // Your asynchronous logic to update student here
      const response = await fetch(`https://api.jastrobot.com/api/v1/tr/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(table_name),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getTransactionById = createAsyncThunk(
  "staff/getTransactionById",
  async ({table_name,user_id} , thunkAPI) => {
    try {
      console.log(table_name,user_id);
      const response = await fetch(`https://api.jastrobot.com/api/v1/tr/tr/${user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({table_name}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);




const initialState = {
  transaction:null,
  alltransaction:null,
  loading: false,
  error: null,
  message: null,
};

const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transaction = action.payload.transaction;
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.alltransaction = action.payload.alltransaction;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
  },
});

export const { clearErrors, clearMessage } = transactionSlice.actions;

export default transactionSlice.reducer;

