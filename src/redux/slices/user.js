import { createSlice } from "@reduxjs/toolkit";
// utils
import axios, { API_ENDPOINTS } from "src/utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  users: [],
  user: null,
  usersStatus: {
    loading: true,
    empty: false,
    error: null,
  },
  userStatus: {
    loading: true,
    error: null,
  },
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // GET USERS
    getUsersStart(state) {
      state.usersStatus.loading = true;
      state.usersStatus.empty = false;
      state.usersStatus.error = null;
    },
    getUsersFailure(state, action) {
      state.usersStatus.loading = false;
      state.usersStatus.empty = false;
      state.usersStatus.error = action.payload;
    },
    getUsersSuccess(state, action) {
      const users = action.payload;

      state.users = users;

      state.usersStatus.loading = false;
      state.usersStatus.empty = !users.length;
      state.usersStatus.error = null;
    },

    // GET USER
    getUserStart(state) {
      state.userStatus.loading = true;
      state.userStatus.error = null;
    },
    getUserFailure(state, action) {
      state.userStatus.loading = false;
      state.userStatus.error = action.payload;
    },
    getUserSuccess(state, action) {
      state.user = action.payload;

      state.userStatus.loading = false;
      state.userStatus.error = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers(param = null) {
  return async (dispatch) => {
    await dispatch(slice.actions.getUsersStart());
    try {
      const response = await axios.get(API_ENDPOINTS.user.list, {
        params: {
          ...param
        }
      });
      await dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      await dispatch(slice.actions.getUsersFailure(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUser(userId, param) {
  return async (dispatch) => {
    await dispatch(slice.actions.getUserStart());
    try {
      const response = await axios.get(API_ENDPOINTS.user.details(userId), {
        params: {
          ...param
        }
      });
      await dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      console.error(error);
      await dispatch(slice.actions.getUserFailure(error));
    }
  };
}
