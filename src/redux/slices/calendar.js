import { createSlice } from '@reduxjs/toolkit';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  events: [],
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // GET EVENTS
    getEventsSuccess(state, action) {
      state.events = action.payload;
    },

    // CREATE EVENT
    createEventSuccess(state, action) {
      state.events = [...state.events, action.payload];
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      const event = action.payload;

      state.events = state.events.map((_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getEvents() {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_ENDPOINTS.calendar);
      dispatch(slice.actions.getEventsSuccess(response.data.events));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------

export function createEvent(eventData) {
  return async (dispatch) => {
    try {
      const data = {
        title: eventData.title,
        description: eventData.description,
        color: eventData.color,
        allDay: eventData.allDay,
        end: eventData.end,
        start: eventData.start,
      };
      const response = await axios.post(API_ENDPOINTS.calendar, data);
      dispatch(slice.actions.createEventSuccess(response.data.event));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------

export function updateEvent(eventId, eventData) {
  return async (dispatch) => {
    try {
      const data = {
        eventId,
        eventData,
      };
      const response = await axios.put(API_ENDPOINTS.calendar, data);
      dispatch(slice.actions.updateEventSuccess(response.data.event));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId) {
  return async (dispatch) => {
    try {
      const data = {
        eventId,
      };
      const response = await axios.patch(API_ENDPOINTS.calendar, data);
      dispatch(slice.actions.deleteEventSuccess(response.data.eventId));
    } catch (error) {
      console.error(error);
    }
  };
}
