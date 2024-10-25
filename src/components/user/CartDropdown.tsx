'use client'

import { ShoppingCart, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppContext } from '@/context/AppContext'
import { CartItem } from '@/types'

const CardLineItem = ({ item }: { item: CartItem }) => {
    const { updateQuantity, removeFromCart } = useAppContext()

    return (
        <DropdownMenuItem className="flex justify-between items-center p-4">
            <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                </p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    className="h-8 w-8 p-0"
                >
                    -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="h-8 w-8 p-0"
                >
                    +
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </DropdownMenuItem>
    )
}

export default function CartDropdown(): JSX.Element {
    const { cart } = useAppContext()
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="sr-only">Shopping cart</span>
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="py-2">
                    <div className="px-4 pb-2 border-b">
                        <h3 className="font-semibold">Shopping Cart</h3>
                    </div>
                    {cart.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            Your cart is empty
                        </div>
                    ) : (
                        <>
                            <div className="max-h-96 overflow-auto">
                                {cart.map(item => (
                                    <CardLineItem key={item.id} item={item} />
                                ))}
                            </div>
                            <div className="p-4 border-t mt-2">
                                <div className="flex justify-between font-semibold mb-4">
                                    <span>Total:</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <Button className="w-full" size="lg">
                                    Checkout
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}