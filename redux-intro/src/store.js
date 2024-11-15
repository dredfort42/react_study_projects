const initialState = {
    balance: 0,
    loan: 0,
    loadPurpose: '',
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
                balance: state.balance + action.payload,
            };
        case 'account/payLoan':
            const pay =
                state.loan > action.payload ? state.loan : action.payload;
            return {
                ...state,
                balance: state.balance - pay,
                loan: state.loan - pay,
                loanPurpose: '',
            };

        default:
            return state;
    }
}
