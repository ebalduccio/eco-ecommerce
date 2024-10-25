import { Product } from '../types'

// Função helper para gerar URLs do Unsplash mais otimizadas
export const api = {
    getProducts: (): Promise<Product[]> => Promise.resolve([
        {
            id: 1,
            name: "Eco-friendly Water Bottle",
            price: 24.99,
            image: '/images/eco_bottle.jpg',
            description: "Durable and stylish water bottle made from recycled materials."
        },
        {
            id: 2,
            name: "Organic Cotton T-shirt",
            price: 29.99,
            image: '/images/eco_bottle.jpg',
            description: "Soft and comfortable t-shirt made from 100% organic cotton."
        },
        {
            id: 3,
            name: "Recycled Denim Jeans",
            price: 79.99,
            image: '/images/eco_bottle.jpg',
            description: "Stylish jeans made from recycled denim, reducing waste in the fashion industry."
        },
        {
            id: 4,
            name: "Bamboo Toothbrush Set",
            price: 12.99,
            image: '/images/eco_bottle.jpg',
            description: "Set of eco-friendly toothbrushes with bamboo handles and soft bristles."
        },
        {
            id: 5,
            name: "Solar-powered Backpack",
            price: 129.99,
            image: '/images/eco_bottle.jpg',
            description: "Innovative backpack with built-in solar panel to charge your devices on the go."
        },
        {
            id: 6,
            name: "Reusable Produce Bags",
            price: 15.99,
            image: '/images/eco_bottle.jpg',
            description: "Set of mesh produce bags to replace single-use plastic bags at the grocery store."
        },
    ]),
}