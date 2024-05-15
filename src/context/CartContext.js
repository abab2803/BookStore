import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();
const initialState = { items: [] }; // Define initial state of the cart

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)
            };
        default:
            return state;
    }
};

// Component that provides cart context
let CartProvider;
export default CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Function to load cart from AsyncStorage on startup
    async function init() {
        const storedCart = await loadCartFromStorage();
        return storedCart ? { items: storedCart } : initialState;
    }

    // Save cart to AsyncStorage whenever it changes
    useEffect(() => {
        saveCartToStorage(state.items);
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

// Functions to handle AsyncStorage operations
const saveCartToStorage = async (items) => {
    try {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem('cart', jsonValue);
    } catch (e) {
        console.error('Failed to save cart', e);
    }
};

const loadCartFromStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('cart');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Failed to load cart', e);
    }
};
