const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

export default function accountReducer(state = initialStateAccount, action) {
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

export function deposit(amount) {
    return { type: 'account/deposit', payload: amount };
}

export function withdraw(amount) {
    return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount, purpose) {
    return { type: 'account/requestLoan', payload: { amount, purpose } };
}

export function payLoan(amount) {
    return { type: 'account/payLoan', payload: amount };
}
