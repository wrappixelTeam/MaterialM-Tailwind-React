import React from "react";

import  { createContext, useState, useEffect } from 'react';
import { ProductType } from '../../types/apps/eCommerce';
import useSWRMutation from 'swr/mutation'
import useSWR, { mutate } from 'swr';
import { http, HttpResponse } from "msw";
import ProductsData from "src/api/eCommerce/ProductsData";

// All Mocked Apis
export const Ecommercehandlers = [

    //  Mock api endpoint to get products
    http.get('/api/data/eCommerce/ProductsData',() => {
       return HttpResponse.json([200, ProductsData])
    }),
  
     // Mock endpoint to add a product to the cart
     http.post("/api/data/eCommerce/add", async ({request}) => {
        try{
           const {productId} = await request.json() as {productId : number};
           const productToAdd = ProductsData.find(product => product.id === productId);
           if (!productToAdd) {
            return HttpResponse.json([404, { error: 'Product not found' }]);
          }
          return HttpResponse.json([200, productToAdd]) ;
        }catch(error){
          return HttpResponse.json([500, { message: 'Internal server error' }])
        }
     })
  ]

// Define ProductContextType based on imported types
interface ProductContextType {
    products: ProductType[];
    searchProduct: string;
    selectedCategory: string;
    sortBy: string;
    priceRange: string;
    selectedGender: string;
    selectedColor: string;
    loading: boolean;
    error:any;
    cartItems: ProductType[];
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
    setSearchProduct: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setPriceRange: React.Dispatch<React.SetStateAction<string>>;
    setSelectedGender: React.Dispatch<React.SetStateAction<string>>;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<any>>;
    setCartItems: React.Dispatch<React.SetStateAction<ProductType[]>>;
    deleteProduct: (productId: number | string) => void;
    searchProducts: (searchText: string) => void;
    updateSortBy: (sortOption: string) => void;
    updatePriceRange: (range: string) => void;
    selectCategory: (category: string) => void;
    selectGender: (gender: string) => void;
    selectColor: (color: string) => void;
    incrementQuantity: (id: number | string) => void;
    decrementQuantity: (id: number | string) => void;
    removeFromCart: (id: number | string) => void;
    addToCart: (item: any) => void;
    deleteAllProducts: () => void;
    filteredAndSortedProducts: ProductType[];
    filterReset: () => void;
    getProductById: (productId: string) => ProductType | undefined;
    updateProduct: (productId: string, updatedProduct: ProductType) => void;
    selectedImageId: any;
    setSelectedImageId: React.Dispatch<React.SetStateAction<any>>;
}

// SWR fetcher functions
const getFetcher = (url:string) => fetch(url).then((res) => {
    if(!res.ok){
        throw new Error("Failed to fetch data");
    }else{
        return res.json()
    }
})
const postFetcher = (url:string,{arg}:{arg:any}) => fetch(url,{
    method:"POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(arg)
}).then((res) => {
    if(!res.ok){
        throw new Error("Failed to add product")
    }else{
        return res.json();
    }
})

// Create Context with the specified type
export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

// Provider Component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [searchProduct, setSearchProduct] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<string>('All');
    const [selectedGender, setSelectedGender] = useState<string>('All');
    const [selectedColor, setSelectedColor] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [cartItems, setCartItems] = useState(() => {
        // Check if localStorage is defined (for client-side rendering)
        if (typeof window !== 'undefined') {
            const storedCartItems = localStorage.getItem('cartItems');
            return storedCartItems ? JSON.parse(storedCartItems) : [];
        } else {
            return [];
        }
    });

    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

    const { data: ProductsData , isLoading:isProductsLoading , error:productsError} = useSWR('/api/data/eCommerce/ProductsData', getFetcher);
    const {trigger: addProducTrigger} = useSWRMutation('/api/data/eCommerce/add' , postFetcher);

    // Fetch products data from the API 
    useEffect(() => {
        if(ProductsData){
            setProducts(ProductsData[1]);
            setLoading(isProductsLoading);
        }else{
            setLoading(isProductsLoading);
        }
        if(productsError){
            setError(productsError);
        }
    }, [ProductsData]);

    // UseEffect to update local storage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);


    // UseEffect to initialize cartItems from local storage when the component mounts
    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // Function to filter products based on search, category, price range, gender, and color
    const filterProducts = (product: ProductType) => {
        const matchesSearch = product.title.toLowerCase().includes(searchProduct.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category.includes(selectedCategory);
        const withinPriceRange = (priceRange === 'All') ||
            (priceRange === '0-50' && product.price <= 50) ||
            (priceRange === '50-100' && product.price > 50 && product.price <= 100) ||
            (priceRange === '100-200' && product.price > 100 && product.price <= 200) ||
            (priceRange === '200-99999' && product.price > 200);
        const matchesGender = selectedGender === 'All' || product.gender === selectedGender;
        const matchesColor = selectedColor === 'All' || product.colors.includes(selectedColor);

        return matchesSearch && matchesCategory && withinPriceRange && matchesGender && matchesColor;
    };

    // Function to sort filtered products based on selected sort option
    const sortProducts = (filteredProducts: ProductType[]) => {
        switch (sortBy) {
            case 'newest':
                return filteredProducts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
            case 'priceDesc':
                return filteredProducts.sort((a, b) => b.price - a.price);
            case 'priceAsc':
                return filteredProducts.sort((a, b) => a.price - b.price);
            case 'discount':
                return filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
            default:
                return filteredProducts;
        }
    };

    // Function to fetch a product by its ID
    const getProductById = (productId: string) => {
        const product = products.find(p => p.id === Number(productId));
        return product;
    };

    // Filter and sort products
    const filteredProducts = products.filter(filterProducts);
    const filteredAndSortedProducts = sortProducts(filteredProducts);

    // Function to handle selecting a category
    const selectCategory = (category: string) => setSelectedCategory(category);

    // Function to update the sort option
    const updateSortBy = (sortOption: string) => setSortBy(sortOption);

    // Function to update the price range
    const updatePriceRange = (range: string) => setPriceRange(range);

    // Function to select a gender
    const selectGender = (gender: string) => setSelectedGender(gender);

    // Function to select a color
    const selectColor = (color: string) => setSelectedColor(color);

    // Function to search products based on text input
    const searchProducts = (searchText: string) => setSearchProduct(searchText);

    // Function to add an item to the cart
    const addToCart = async (productId: number | string) => {
        try {
            const data = await addProducTrigger({productId})
            const productToAdd = data[1];
            // Add the product to cartItems state
            const isItemInCart = cartItems.find((cartItem: { id: any; }) => cartItem.id === productToAdd.id);
            if (isItemInCart) {
                setCartItems(
                    cartItems.map((cartItem: { id: any; qty: number; }) =>
                        cartItem.id === productToAdd.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
                    )
                );
            } else {
                setCartItems([...cartItems, { ...productToAdd, qty: 1 }]);
            }
            mutate('/api/data/eCommerce/ProductsData');
        } catch (error) {
            setError(productsError);
            console.error('Error adding product to cart:', error);
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = (id: number | string) => {
        setCartItems(cartItems.filter((cartItem: { id: string | number; }) => cartItem.id !== id));
    };

    // Function to increment quantity of a product in the cart
    const incrementQuantity = (id: number | string) => {
        setCartItems(
            cartItems.map((cartItem: { id: string | number; qty: number; }) =>
                cartItem.id === id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
            )
        );
    };

    // Function to decrement quantity of a product in the cart
    const decrementQuantity = (id: number | string) => {
        setCartItems(
            cartItems.map((cartItem: { id: string | number; qty: number; }) =>
                cartItem.id === id && cartItem.qty > 1 ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
            )
        );
    };

    // Function to delete a product
    const deleteProduct = (productId: number | string) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    // Function to delete all products
    const deleteAllProducts = () => {
        setProducts([]);
    };

    //  Function to update a product
    const updateProduct = (productId: string, updatedProduct: ProductType) => {
        setProducts(products.map(product => product.id === Number(productId) ? updatedProduct : product));
    };

    const filterReset = () => {
        setSelectedCategory('All');
        setSelectedColor('All');
        setSelectedGender('All');
        setPriceRange('All');
        setSortBy('newest');
    }


    return (
        <ProductContext.Provider
            value={{
                products,
                searchProduct,
                selectedCategory,
                sortBy,
                priceRange,
                selectedGender,
                selectedColor,
                loading,
                error,
                cartItems,
                setProducts,
                setSearchProduct,
                setSelectedCategory,
                setSortBy,
                setPriceRange,
                setSelectedGender,
                setSelectedColor,
                setLoading,
                setError,
                setCartItems,
                deleteProduct,
                searchProducts,
                updateSortBy,
                updatePriceRange,
                selectCategory,
                selectGender,
                selectColor,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
                addToCart,
                deleteAllProducts,
                filteredAndSortedProducts,
                filterReset, getProductById,
                updateProduct,
                selectedImageId, setSelectedImageId


            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
