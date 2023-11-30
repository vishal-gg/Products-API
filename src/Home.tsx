import { useState, useEffect, useMemo, useReducer } from "react";
// import {motion} from 'framer-motion';
import axios from "axios";
import {toast} from 'sonner'
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";

export interface dataType {
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  brand: string;
  model: string;
  color?: string;
  discount?: number;
  onSale?: boolean;
  popular?: boolean;
  _id: string
}

const Home = () => {

    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [products, setProducts] = useState<dataType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [viewAll, setViewAll] = useReducer(prev => !prev, false);
    const [selectedProduct, setSelectedProduct] = useState<dataType | null>(null)
    

    const categories = ["All", "Audio", "Laptop", "Mobile", "Gaming", "Tv", "Appliances"]


    const filteredProductList = useMemo(() => {
      if(!products.length) return [];
      if(activeCategory === "All") return products;
      if(viewAll) setViewAll();

      return products.filter(product => 
        product.category.toLocaleLowerCase().includes(activeCategory.toLocaleLowerCase()))
    }, [products, activeCategory])



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get("https://e-commerce-serverside.vercel.app/get")
        setProducts(data)

      } catch (err: any) {
        console.log(err);
        toast.error(err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])
  

  return (
    <div>
      <h1 className="text-3xl font-bold text-center shadow-md py-4 px-8 bg-zinc-900">Products{" "}
        <a className="underline text-blue-500"
          target="_blank"
          href="https://e-commerce-serverside.vercel.app/get">API
        </a>
      </h1>
      <div className="mt-10">
        <ul className="flex justify-center flex-wrap items-center gap-2 font-medium px-4">
          {categories.map((category) => (
            <li
              className="cursor-pointer relative px-3 py-1"
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {activeCategory === category && (
                <span
                  // layoutId="active-pill"
                  // transition={{type: 'spring', mass: .35}}
                  style={{ borderRadius: 50 }}
                  className="absolute inset-0 bg-red-600"
                ></span>
              )}
              <span className="relative z-10">{category}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <ProductList
          products={filteredProductList}
          loading={loading}
          viewAll={viewAll}
          setViewAll={setViewAll}
          setSelectedProduct={setSelectedProduct}
          error={error}
        />
      </div>
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

export default Home;
