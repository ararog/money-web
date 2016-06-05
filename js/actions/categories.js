import { get } from './api'

import {
	LOAD_CATEGORIES,
	LOAD_CATEGORIES_SUCCESS,
	LOAD_CATEGORIES_ERROR
} from '../constants/ActionTypes'

export function loadCategories() {
	return dispatch => {

		dispatch(startFetchingCategories())

		return get('/categories')
		.then(response => {
			dispatch(fetchCategoriesSuccess(response.data))
		}).catch(err => {
			dispatch(fetchCategoriesError(err))
		})
	}
}

function startFetchingCategories() {
	return {
		type: LOAD_CATEGORIES
	}
}

function fetchCategoriesSuccess(data) {
	return {
		type: LOAD_CATEGORIES_SUCCESS,
		payload: {
			items: data
		}
	}
}

function fetchCategoriesError(error) {
	return {
		type: LOAD_CATEGORIES_ERROR,
		payload: {
			error
		}
	}
}
