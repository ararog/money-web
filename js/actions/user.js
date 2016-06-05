import { post, assignAccessToken } from './api'

import {
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_ERROR
} from '../constants/ActionTypes'

import md5 from 'md5'

export function login(email, password) {
	return dispatch => {

		dispatch(startLogin())

		return post('/auth', {
			email: email,
			password: md5(password)
		}).then(response => {
			dispatch(loginSuccess(response))
		}).catch(err => {
			dispatch(loginError(err))
		})
	}
}

function startLogin() {
	return {
		type: LOGIN
	}
}

function loginSuccess(response) {
	assignAccessToken(response.data.auth_token)
	return {
		type: LOGIN_SUCCESS,
		payload: {
			account: response.data
		}
	}
}

function loginError(error) {
	return {
		type: LOGIN_ERROR,
		payload: {
			error
		}
	}
}
