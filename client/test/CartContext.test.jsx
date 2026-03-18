import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../src/context/CartContext';
import React from 'react';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty cart if localStorage is empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toMatchObject({ ...product, quantity: 1 });
  });

  it('should increment quantity if item already in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('should update quantity correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart(product);
    });

    act(() => {
      result.current.updateQuantity(1, 4); // 1 + 4 = 5
    });
    expect(result.current.cartItems[0].quantity).toBe(5);

    act(() => {
      result.current.updateQuantity(1, -10); // Should not go below 1
    });
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart(product);
    });
    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.removeFromCart(1);
    });
    expect(result.current.cartItems).toHaveLength(0);
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart({ id: 1, price: 100 });
      result.current.addToCart({ id: 2, price: 200 });
      result.current.updateQuantity(1, 1); // 1 + 1 = 2
    });

    // Total = (100 * 2) + (200 * 1) = 400
    expect(result.current.getCartTotal()).toBe(400);
  });

  it('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart(product);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', expect.stringContaining('Test Product'));
  });
});
