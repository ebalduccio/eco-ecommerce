'use client'

import { useState } from 'react'
import { 
  Star, 
  ShoppingCart, 
  CreditCard, 
  TruckIcon, 
  Shield, 
  Heart,
  Share2,
  CheckCircle2,
  CircleDollarSign,
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Product } from '@/types'
import Image from 'next/image'

interface ProductDetailDialogProps {
    product: Product | null
    open: boolean
    onClose: () => void
}

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

// Badges Component
const ProductBadges = () => (
    <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="bg-green-100 text-green-800">
            Eco-Friendly
        </Badge>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Sustainable
        </Badge>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Limited Edition
        </Badge>
    </div>
)

// Benefits Component
const ProductBenefits = () => {
    const benefits = [
        { icon: TruckIcon, text: "Free Shipping", subtext: "on orders over $50" },
        { icon: Shield, text: "2-Year Warranty", subtext: "full coverage" },
        { icon: CircleDollarSign, text: "Money Back", subtext: "30-day guarantee" },
        { icon: CheckCircle2, text: "Verified Quality", subtext: "eco-certified" }
    ]

    return (
        <div className="grid grid-cols-2 gap-4">
            {benefits.map(({ icon: Icon, text, subtext }) => (
                <div key={text} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50">
                    <Icon className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                        <p className="font-medium text-sm">{text}</p>
                        <p className="text-xs text-gray-600">{subtext}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function ProductDetailDialog({
    product,
    open,
    onClose
}: ProductDetailDialogProps): JSX.Element | null {
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [isWishListed, setIsWishListed] = useState(false)

    if (!product) return null

    // Simulated multiple images
    const productImages = [
        product.image,
        product.image, // Você pode adicionar mais imagens aqui
        product.image,
    ]

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <DialogTitle className="text-xl font-bold mb-2">{product.name}</DialogTitle>
                            <ProductRating />
                        </div>
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setIsWishListed(!isWishListed)}
                                        >
                                            <Heart 
                                                className={`h-4 w-4 ${isWishListed ? 'fill-red-500 text-red-500' : ''}`} 
                                            />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add to Wishlist</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Share Product</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <Image
                                src={productImages[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover transition-all duration-300 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 
                                        ${selectedImage === idx ? 'ring-2 ring-green-500' : 'ring-1 ring-gray-200'}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} view ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2">
                                <span className="text-3xl font-bold text-green-600">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                    ${(product.price * 1.2).toFixed(2)}
                                </span>
                            </div>
                            <ProductBadges />
                        </div>

                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="mt-4">
                                <p className="text-gray-600">{product.description}</p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        <span>Eco-friendly materials</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        <span>Sustainable manufacturing</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        <span>Recyclable packaging</span>
                                    </li>
                                </ul>
                            </TabsContent>
                            <TabsContent value="specifications" className="mt-4">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <span className="font-medium">Material</span>
                                            <p className="text-gray-600">Recycled materials</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <span className="font-medium">Weight</span>
                                            <p className="text-gray-600">0.5 kg</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <span className="font-medium">Size</span>
                                            <p className="text-gray-600">Standard</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <span className="font-medium">Origin</span>
                                            <p className="text-gray-600">Made in USA</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="shipping" className="mt-4">
                                <ProductBenefits />
                            </TabsContent>
                        </Tabs>

                        {/* Quantity and Actions */}
                        <div className="space-y-4 pt-4 border-t">
                            <div className="flex items-center gap-4">
                                <label className="font-medium text-sm">Quantity:</label>
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-8 w-8"
                                    >
                                        -
                                    </Button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(Math.min(99, quantity + 1))}
                                        className="h-8 w-8"
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button 
                                    className="flex-1 h-12" 
                                    variant="default"
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </Button>
                                <Button 
                                    className="flex-1 h-12" 
                                    variant="secondary"
                                >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Buy Now
                                </Button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="pt-4 border-t">
                            <ProductBenefits />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}