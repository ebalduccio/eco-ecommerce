'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function FeaturedProduct(): JSX.Element {
    return (
        <section className="mb-12">
            <div className="bg-green-600 rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex items-center p-2">
                    <div className="md:flex-shrink-0">
                        <Image
                            className="object-cover md:w-48"
                            width={192}
                            height={192}
                            src="/images/eco-products.png"
                            alt="Featured product"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-white font-semibold">
                            Featured Product
                        </div>
                        <a
                            href="#"
                            className="block mt-1 text-lg leading-tight font-medium text-white hover:underline"
                        >
                            Sustainable Living Starter Kit
                        </a>
                        <p className="mt-2 text-white">
                            Start your eco-friendly journey with our curated selection of sustainable products.
                        </p>
                        <Button className="mt-4 bg-white text-green-600 hover:bg-gray-100">
                            Shop Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}