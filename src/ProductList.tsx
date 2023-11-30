import {dataType} from './Home'
import { Button } from '@nextui-org/react'

interface propsType {
 products: dataType[];
 loading: boolean;
 viewAll: boolean;
 setViewAll: any;
 setSelectedProduct: React.Dispatch<React.SetStateAction<dataType | null>>
 error: string;
}

const ProductList: React.FC<propsType> = ({products, loading, viewAll, setViewAll, setSelectedProduct, error}) => {

  return (
    <div>
      <div className="w-[min(1300px,100%-4rem)] mx-auto flex justify-center gap-5 flex-wrap">
        {!loading && !error ? (
          products.slice(0, viewAll ? products.length : 24).map((product) => (
            <div onClick={() => setSelectedProduct(product)}
             key={product._id} className="w-72 aspect-square bg-white rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all">
              <img
                src={product.image}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          ))
        ) : !error ? (
          Array.from({length: 24}).map((_,i) => (
          <div key={i} className="w-72 aspect-square bg-white relative overflow-hidden rounded-lg">
            <span className='loading-progress'></span>
          </div>
          ))
        ) : (
          <h2 className='mt-10'>something went wrong, try again later</h2>
        )}
      </div>
      {products.length > 24 && (
        <div className='mt-10 flex justify-center'>
          <Button color="primary" onClick={() => setViewAll()}>
            {viewAll ? "show less" : "view all"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
