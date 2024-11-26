import { createSlice } from '@reduxjs/toolkit';

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState: initialStateAccount,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose },
                };
            },

            reducer(state, action) {
                if (state.loan !== 0) return;

                state.balance += action.payload.amount;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
            },
        },
        payLoan(state, action) {
            if (action.payload <= 0 && state.loan <= 0) return;

            let pay =
                state.balance > action.payload ? action.payload : state.balance;
            pay = state.loan > pay ? pay : state.loan;

            if (state.loan - pay === 0) {
                state.loanPurpose = '';
            }
            state.balance -= pay;
            state.loan -= pay;
        },
        convertingCurrency(state) {
            state.isLoading = true;
        },
    },
});

console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === 'USD') return { type: 'account/deposit', payload: amount };

    return async function (dispatch, getState) {
        dispatch({ type: 'account/convertingCurrency' });

        const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
        );
        const data = await res.json();
        console.log(data);

        const converted = data.rates.USD;

        dispatch({ type: 'account/deposit', payload: converted });
    };
}

export default accountSlice.reducer;

// const initialStateAccount = {
//     balance: 0,
//     loan: 0,
//     loanPurpose: '',
//     isLoading: false,
// };

// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case 'account/deposit':
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading: false,
//             };
//         case 'account/withdraw':
//             return {
//                 ...state,
//                 balance: state.balance - action.payload,
//             };
//         case 'account/requestLoan':
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 balance: state.balance + action.payload.amount,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//             };
//         case 'account/payLoan':
//             if (action.payload <= 0) return state;
//             let pay =
//                 state.balance > action.payload ? action.payload : state.balance;
//             pay = state.loan > pay ? pay : state.loan;

//             return {
//                 ...state,
//                 balance: state.balance - pay,
//                 loan: state.loan - pay,
//                 loanPurpose: state.loan - pay === 0 ? '' : state.loanPurpose,
//             };
//         case 'account/convertingCurrency':
//             return {
//                 ...state,
//                 isLoading: true,
//             };

//         default:
//             return state;
//     }
// }

// export function deposit(amount, currency) {
//     if (currency === 'USD') return { type: 'account/deposit', payload: amount };

//     return async function (dispatch, getState) {
//         dispatch({ type: 'account/convertingCurrency' });

//         const res = await fetch(
//             `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//         );
//         const data = await res.json();
//         console.log(data);

//         const converted = data.rates.USD;

//         dispatch({ type: 'account/deposit', payload: converted });
//     };
// }

// export function withdraw(amount) {
//     return { type: 'account/withdraw', payload: amount };
// }

// export function requestLoan(amount, purpose) {
//     return { type: 'account/requestLoan', payload: { amount, purpose } };
// }

// export function payLoan(amount) {
//     return { type: 'account/payLoan', payload: amount };
// }
