import { createContext, useContext, useReducer } from 'react';

const AuthContect = createContext();

const FAKE_USER = {
    name: 'Jack',
    email: 'jack@example.com',
    password: 'qwerty',
    avatar: 'https://i.pravatar.cc/100?u=zz',
};

const initialState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            console.log(action.payload);
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'logout':
            return initialState;
        default:
            throw new Error('Unknown action type');
    }
}

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    );

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: 'logout' });
    }

    return (
        <AuthContect.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContect.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContect);

    if (context === undefined) {
        throw new Error('AuthContect was used outside of the AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
