import { createStore } from 'redux';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        case 'account/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload,
            };
        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
            };
        case 'account/payLoan':
            if (action.payload <= 0) return state;
            let pay =
                state.balance > action.payload ? action.payload : state.balance;
            pay = state.loan > pay ? pay : state.loan;

            return {
                ...state,
                balance: state.balance - pay,
                loan: state.loan - pay,
                loanPurpose: state.loan - pay === 0 ? '' : state.loanPurpose,
            };

        default:
            return state;
    }
}

const store = createStore(reducer);
store.dispatch({ type: 'account/deposit', payload: 500 });
console.log(store.getState());
store.dispatch({ type: 'account/withdraw', payload: 200 });
console.log(store.getState());
store.dispatch({
    type: 'account/requestLoan',
    payload: { amount: 10000, purpose: 'buy a car' },
});
console.log(store.getState());
store.dispatch({ type: 'account/payLoan', payload: 5000 });
console.log(store.getState());
store.dispatch({ type: 'account/payLoan', payload: 5000 });
console.log(store.getState());
store.dispatch({ type: 'account/payLoan', payload: 5000 });
console.log(store.getState());
store.dispatch({ type: 'account/payLoan', payload: -5000 });
console.log(store.getState());
