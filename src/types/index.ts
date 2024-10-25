export interface Product {
    id: number
    name: string
    price: number
    image: string
    description: string
  }
  
  export interface CartItem extends Product {
    quantity: number
  }
  
  export interface User {
    name: string
    email: string
  }
  
  export interface AppContextType {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, newQuantity: number) => void
    user: User | null
    setUser: (user: User | null) => void
  }