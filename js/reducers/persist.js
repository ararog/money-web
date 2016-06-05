import { assignAccessToken } from '../actions/api'

export function autoRehydrated(state=false, action) {
	let { type, payload } = action

	switch(type) {
		case 'persist/REHYDRATE': {
			let { user = {} } = payload
			let { account = null } = user

			assignAccessToken(account.auth_token)

			return true
		}
	}

	return state
}
