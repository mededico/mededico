import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AdminContext } from './AdminContext';
import type { CartItem } from '../types/movie';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_SEASONS'; payload: { id: number; seasons: number[] } }
  | { type: 'UPDATE_PAYMENT_TYPE'; payload: { id: number; paymentType: 'cash' | 'transfer' } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateSeasons: (id: number, seasons: number[]) => void;
  updatePaymentType: (id: number, paymentType: 'cash' | 'transfer') => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  getItemSeasons: (id: number) => number[];
  calculateItemPrice: (item: CartItem) => number;
  calculateTotalPrice: () => number;
  calculateTotalByPaymentType: () => { cash: number; transfer: number };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  total: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Update existing item
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id ? { ...action.payload, paymentType: item.paymentType || 'cash' } : item
        );
        return {
          items: updatedItems,
          total: updatedItems.length,
        };
      } else {
        // Add new item with default payment type
        const newItem = { ...action.payload, paymentType: action.payload.paymentType || 'cash' };
        const newItems = [...state.items, newItem];
        return {
          items: newItems,
          total: newItems.length,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: filteredItems,
        total: filteredItems.length,
      };
    }
    
    case 'UPDATE_SEASONS': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, selectedSeasons: action.payload.seasons }
          : item
      );
      return {
        ...state,
        items: updatedItems,
      };
    }
    
    case 'UPDATE_PAYMENT_TYPE': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, paymentType: action.payload.paymentType }
          : item
      );
      return {
        ...state,
        items: updatedItems,
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: action.payload.length,
      };
    
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const adminContext = React.useContext(AdminContext);

  // Get current prices from admin context
  const getCurrentPrices = () => {
    return {
      moviePrice: adminContext?.state?.prices?.moviePrice || 80,
      seriesPrice: adminContext?.state?.prices?.seriesPrice || 300,
      transferFeePercentage: adminContext?.state?.prices?.transferFeePercentage || 10,
    };
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Listen for price updates and recalculate
  useEffect(() => {
    const handlePriceUpdate = () => {
      // Force re-render by updating the state
      dispatch({ type: 'LOAD_CART', payload: state.items });
    };

    window.addEventListener('cartRecalculate', handlePriceUpdate);
    return () => window.removeEventListener('cartRecalculate', handlePriceUpdate);
  }, [state.items]);

  const addItem = (item: CartItem) => {
    // Ensure TV shows have at least one season selected
    if (item.type === 'tv' && (!item.selectedSeasons || item.selectedSeasons.length === 0)) {
      item.selectedSeasons = [1];
    }
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateSeasons = (id: number, seasons: number[]) => {
    dispatch({ type: 'UPDATE_SEASONS', payload: { id, seasons } });
  };

  const updatePaymentType = (id: number, paymentType: 'cash' | 'transfer') => {
    dispatch({ type: 'UPDATE_PAYMENT_TYPE', payload: { id, paymentType } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (id: number): boolean => {
    return state.items.some(item => item.id === id);
  };

  const getItemSeasons = (id: number): number[] => {
    const item = state.items.find(item => item.id === id);
    return item?.selectedSeasons || [];
  };

  const calculateItemPrice = (item: CartItem): number => {
    const prices = getCurrentPrices();
    
    let basePrice = 0;
    if (item.type === 'movie') {
      basePrice = prices.moviePrice;
    } else {
      const seasonCount = item.selectedSeasons?.length || 1;
      basePrice = seasonCount * prices.seriesPrice;
    }

    // Apply transfer fee if applicable
    if (item.paymentType === 'transfer') {
      return Math.round(basePrice * (1 + prices.transferFeePercentage / 100));
    }

    return basePrice;
  };

  const calculateTotalPrice = (): number => {
    return state.items.reduce((total, item) => {
      return total + calculateItemPrice(item);
    }, 0);
  };

  const calculateTotalByPaymentType = (): { cash: number; transfer: number } => {
    const cashTotal = state.items
      .filter(item => item.paymentType === 'cash')
      .reduce((total, item) => total + calculateItemPrice(item), 0);

    const transferTotal = state.items
      .filter(item => item.paymentType === 'transfer')
      .reduce((total, item) => total + calculateItemPrice(item), 0);

    return { cash: cashTotal, transfer: transferTotal };
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateSeasons,
      updatePaymentType,
      clearCart,
      isInCart,
      getItemSeasons,
      calculateItemPrice,
      calculateTotalPrice,
      calculateTotalByPaymentType,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}