import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const CartContext = createContext();
const initialState = { items: [] };

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return { ...state, items: action.payload };
        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
                    )
                };
            } else {
                return { ...state, items: [...state.items, action.payload] };
            }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                )
            };
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        const fetchCart = async () => {
            const querySnapshot = await getDocs(collection(db, 'cartItems'));
            const cartItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch({ type: 'SET_CART', payload: cartItems });
        };

        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
