import {
    LOAD_OVERVIEW,
    LOAD_OVERVIEW_SUCCESS,
    LOAD_OVERVIEW_ERROR,
    LOAD_EXPENSES,
    LOAD_EXPENSES_SUCCESS,
    LOAD_EXPENSES_ERROR,
    ADD_EXPENSE,
    ADD_EXPENSE_SUCCESS,
    ADD_EXPENSE_ERROR,
    LOAD_EXPENSE,
    LOAD_EXPENSE_SUCCESS,
    LOAD_EXPENSE_ERROR,
    UPDATE_EXPENSE,
    UPDATE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_ERROR,
    DELETE_EXPENSE,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_ERROR
} from '../constants/ActionTypes'

const initialState = {
  fetchingData: false,
  reloading: false,
  error: undefined,
  items: []
}

export function expenses(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case FETCH_NOTIFICATIONS_DATA: {
      return {...state, fetchingData: true, page: payload.page, reloading: payload.reloading}
    }
    case FETCH_NOTIFICATIONS_SUCCESS: {
      return {...state, fetchingData: false, items: payload.items}
    }
    case FETCH_NOTIFICATIONS_ERROR: {
      return {...state, fetchingData: false, error: payload.error}
    }
  }

  return state
}
