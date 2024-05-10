"use client";
import { createContext, ReactNode, useState, useRef, useEffect } from "react";
import { Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";

type CartProviderProps = {
  children: ReactNode;
};

type CartContextData = {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  // updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
};

export const Cart = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const { toast } = useToast();

  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart =
      typeof window !== "undefined"
        ? localStorage.getItem("@burger:cart")
        : false;

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem("@burger:cart", JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  const addProduct = async (productId: number) => {
    try {
      const updateCart = [...cart]; // toda alteração no updateCart não vai refletir no cart
      const productExists = updateCart.find(
        (product) => product.id === productId,
      );

      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1; // quantidade desejada

      if (productExists) {
        productExists.amount = amount;
      } else {
        //   const product = await api.get(`/products/${productId}`)
        //   const newProduct = {
        //     ...product.data,
        //     amount: 1
        //   }
        //   updateCart.push(newProduct);
      }

      setCart(updateCart);
    } catch (err) {
      toast({ description: "Erro na adição do produto" });
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updateCart = [...cart];
      const indexItem = updateCart.findIndex(
        (product) => product.id === productId,
      );

      if (indexItem >= 0) {
        updateCart.splice(indexItem, 1);
        setCart(updateCart);
      } else {
        throw Error();
      }
    } catch (err) {
      toast({ description: "Erro na remoção do produto" });
    }
  };

  return (
    <Cart.Provider value={{ cart, addProduct, removeProduct }}>
      {children}
    </Cart.Provider>
  );
}
