// src/components/product/ProductDetailDialog.tsx
'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Product } from '@/types'

interface ProductDetailDialogProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

// Separado o ProductRating em um componente standalone
const ProductRating = () => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star 
        key={star}
        className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
    <span className="text-sm text-gray-600 ml-2">(128 reviews)</span>
  </div>
)

export default function ProductDetailDialog({ 
  product, 
  open, 
  onClose 
}: ProductDetailDialogProps): JSX.Element | null {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">{product.name}</DialogTitle>
          {/* Removido DialogDescription e colocado o rating diretamente */}
          <div className="mt-1">
            <ProductRating />
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Imagem do Produto */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas - exemplo */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 hover:border-green-500 transition-colors"
                >
                  <img 
                    src={product.image} 
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Free shipping on orders over $50
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Características */}
            <div className="space-y-2">
              <h3 className="font-medium">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Eco-friendly materials</li>
                <li>Sustainable manufacturing</li>
                <li>Recyclable packaging</li>
                <li>Carbon neutral shipping</li>
              </ul>
            </div>

            {/* Ações */}
            <div className="space-y-3 pt-4">
              {/* Seletor de Quantidade */}
              <div className="flex items-center space-x-2">
                <label htmlFor="quantity" className="font-medium">
                  Quantity:
                </label>
                <select 
                  id="quantity"
                  className="rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                  defaultValue="1"
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Add to Cart
                </button>
                <button className="flex-1 border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Garantias */}
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  30-day returns
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  2-year warranty
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Secure checkout
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  24/7 support
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}