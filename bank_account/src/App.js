/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

import { useReducer } from 'react';

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
    // state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount
};

function reducer(state, action) {
    if (!state.isActive && action.type !== 'openAccount') return initialState;

    switch (action.type) {
        case 'openAccount':
            if (state.isActive) return state;

            return {
                ...state,
                balance: 500,
                isActive: true,
            };
        case 'deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        case 'withdraw':
            if (state.balance - action.payload < 0) return state;

            return {
                ...state,
                balance:
                    state.balance - action.payload < 0
                        ? state.balance
                        : state.balance - action.payload,
            };
        case 'requestLoan':
            if (state.loan > 0) return state;

            return {
                ...state,
                balance: state.balance + action.payload,
                loan: action.payload,
            };
        case 'payLoan':
            if (state.loan === 0) return state;

            const remainder = state.balance - state.loan;
            return {
                ...state,
                balance: remainder < 0 ? 0 : remainder,
                loan: remainder < 0 ? state.loan - state.balance : 0,
            };
        case 'closeAccount':
            if (state.loan !== 0 || state.balance !== 0) return state;

            return initialState;

        default:
            throw new Error('Unknown type');
    }
}

const DEPOSIT = 150;
const WITHDRAW = 50;
const LOAN = 5000;

export default function App() {
    const [{ balance, loan, isActive }, dispatch] = useReducer(
        reducer,
        initialState
    );
    return (
        <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            <h1>useReducer Bank Account</h1>
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>

            <p>
                <button
                    onClick={() => {
                        dispatch({ type: 'openAccount' });
                    }}
                    disabled={isActive}
                >
                    Open account
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        dispatch({ type: 'deposit', payload: DEPOSIT });
                    }}
                    disabled={!isActive}
                >
                    Deposit {DEPOSIT}
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        dispatch({ type: 'withdraw', payload: WITHDRAW });
                    }}
                    disabled={balance - WITHDRAW < 0 || !isActive}
                >
                    Withdraw {WITHDRAW}
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        dispatch({ type: 'requestLoan', payload: LOAN });
                    }}
                    disabled={!isActive || loan > 0}
                >
                    Request a loan of {LOAN}
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        dispatch({ type: 'payLoan' });
                    }}
                    disabled={!isActive || !(loan > 0)}
                >
                    Pay loan
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        dispatch({ type: 'closeAccount' });
                    }}
                    disabled={!isActive || balance > 0 || loan > 0}
                >
                    Close account
                </button>
            </p>
        </div>
    );
}
