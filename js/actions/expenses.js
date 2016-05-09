import {
    LOAD_OVERVIEW,
    LOAD_OVERVIEW_SUCCESS,
    LOAD_OVERVIEW_ERROR,
    LOAD_EXPENSES,
    LOAD_EXPENSES_SUCCESS,
    LOAD_EXPENSES_ERROR,
    DELETE_EXPENSE,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_ERROR
} from '../constants/ActionTypes'

export function fetchExpenses(page) {
    return dispatch => {

        dispatch(startFetchingExpenses(page))

        return doFetch('posts/best', {
            method: 'GET'
        }).then(data => {
            dispatch(fetchExpensesSuccess(data))
        }).catch(err => {
            dispatch(fetchExpensesError(err))
        })
    }
}

function startFetchingExpenses(page) {
    return {
        type: LOAD_EXPENSES,
        payload: {
            page
        }
    }
}

function fetchExpensesSuccess(data) {
    return {
        type: LOAD_EXPENSES_SUCCESS,
        payload: {
            items: data
        }
    }
}

function fetchExpensesError(error) {
    return {
        type: LOAD_EXPENSES_ERROR,
        payload: {
            error
        }
    }
}


loadOverview() {
  return super.get('/expenses/overview');
}

loadExpenses(pageNumber) {
  return super.get('/expenses', { params: {page: pageNumber} } );
}

loadById(id) {
  return super.get('/expenses/' + id);
}

delete(id) {
  return super.delete('/expenses/' + id);
}

update(id, expense) {
  return super.put('/expenses/' + id, expense);
}

add(expense) {
  return super.post('/expenses', expense);
}
