"use client";
import { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { formatPrice } from "@/utils/format";
import { Input } from "./input";
import { Button } from "./button";
import { Cart } from "@/hooks/cart";

export default function Footer() {

    const { cart } = useContext(Cart);

    return (
        <footer className="w-full bg-red-500 py-3 fixed bottom-0 z-40 flex items-center justify-center">
            <Dialog>
                <DialogTrigger className="flex items-center justify-center gap-2 text-white">
                    <span>{`( ${cart.length} )`}</span>
                    <p className="capitalize">veja meu carrinho</p>
                    <ShoppingCart size={18} />
                </DialogTrigger>
                <DialogContent>
                    <h2 className="text-center font-bold text-2xl mb-2">Meu carrinho</h2>
                    <div className="flex justify-between mb-2 flex-col "></div>
                    <p className="font-bold">Total: <span>{formatPrice(0)}</span></p>
                    <p className="font-bold mt-4">Endereço de entrega: </p>
                    <Input placeholder="Digite o endereço de entrega..." className="w-full border-2 p-1 rounded my-1"/>
                    <p className="text-red-500 hidden">Digite seu endereço completo</p>
                    <Button variant="outline" className="bg-green-500 text-white px-4 py-1 rounded">
                        Finalizar pedido
                    </Button>
                </DialogContent>
            </Dialog>
        </footer>
    );

}