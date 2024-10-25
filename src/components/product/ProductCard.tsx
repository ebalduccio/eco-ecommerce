'use client'

import { useState } from 'react'
import { ShoppingCart, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from '@/types'
import { useAppContext } from '@/context/AppContext'
import ProductDetailDialog from './ProductDetailDialog'

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ 
  product, 
  viewMode = 'grid' 
}: ProductCardProps): JSX.Element {
  const { addToCart } = useAppContext()
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      addToCart(product)
      await new Promise(resolve => setTimeout(resolve, 500))
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative sm:w-48 shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 sm:h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {product.id === 1 && (
              <Badge className="absolute top-2 right-2 bg-green-500">
                New
              </Badge>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col p-4 flex-1">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold hover:text-green-600 flex-1">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-green-600 ml-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>

              {/* Additional Details - Only shown in list view */}
              <div className="space-y-2 mb-4">
                <Badge variant="outline" className="mr-2">
                  Free Shipping
                </Badge>
                <Badge variant="outline" className="text-green-600">
                  In Stock
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDetails(true)}
                className="flex-1"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View (default)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.id === 1 && (
          <Badge className="absolute top-2 right-2 bg-green-500">
            New
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-green-600">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </p>
          <Badge variant="outline" className="text-green-600">
            In Stock
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowDetails(true)}
            className="flex-1"
          >
            <Eye className="mr-2 h-4 w-4" />
            Details
          </Button>
        </div>
      </div>

      <ProductDetailDialog
        product={product}
        open={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </div>
  )
}