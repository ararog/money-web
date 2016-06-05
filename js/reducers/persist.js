import { assignAccessToken } from '../actions/api'

export function autoRehydrated(state=false, action) {
	let { type, payload } = action

	switch(type) {
		case 'persist/REHYDRATE': {
			let { user = {} } = payload
			let { account = null } = user

			assignAccessToken(account ? account.auth_token : null)

			return true
		}
	}

	return state
}
