'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types'
import { api } from '@/services/api'
import { AppProvider } from '@/context/AppContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductGrid from '@/components/product/ProductGrid'
import FeaturedProduct from '@/components/product/FeaturedProduct'
import { Button } from '@/components/ui/button'

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const data = await api.getProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        console.error('Error fetching products:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <main className="flex-grow container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">{error}</div>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <FeaturedProduct />
              {searchTerm && (
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing results for "{searchTerm}"
                    {filteredProducts.length === 0 ? (
                      <span className="ml-2">- No products found</span>
                    ) : (
                      <span className="ml-2">- {filteredProducts.length} products found</span>
                    )}
                  </p>
                </div>
              )}
              <ProductGrid products={filteredProducts} />
              
              {filteredProducts.length === 0 && searchTerm && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any products matching your search.
                  </p>
                  <Button 
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </AppProvider>
  )
}