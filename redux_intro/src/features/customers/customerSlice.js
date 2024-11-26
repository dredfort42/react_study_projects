import { createSlice } from '@reduxjs/toolkit';

const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: '',
};

const customerSlice = createSlice({
    name: 'customer',
    initialState: initialStateCustomer,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createdAt: new Date().toISOString(),
                    },
                };
            },

            reducer(state, action) {
                if (
                    action.payload.fullName === '' ||
                    action.payload.nationalID === ''
                )
                    return;

                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt;
            },
        },
        updateName(state, action) {
            if (action.payload === '') return;

            state.fullName = action.payload;
        },
        updateNationalID(state, action) {
            if (action.payload === '') return;

            state.nationalID = action.payload;
        },
    },
});

console.log(customerSlice);

export const { createCustomer, updateName, updateNationalID } =
    customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case 'customer/createCustomer':
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalID: action.payload.nationalID,
//                 createdAt: action.payload.createdAt,
//             };
//         case 'customer/updateName':
//             return {
//                 ...state,
//                 fullName: action.payload,
//             };
//         case 'customer/updateNationalID':
//             return {
//                 ...state,
//                 nationalID: action.payload,
//             };

//         default:
//             return state;
//     }
// }

// export function createCustomer(fullName, nationalID) {
//     return {
//         type: 'customer/createCustomer',
//         payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//     };
// }

// export function updateName(fullName) {
//     return {
//         type: 'customer/updateName',
//         payload: fullName,
//     };
// }

// export function updateNationalID(nationalID) {
//     return {
//         type: 'customer/updateNationalID',
//         payload: nationalID,
//     };
// }
