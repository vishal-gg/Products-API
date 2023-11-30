import {motion} from 'framer-motion'
import {ImCross} from 'react-icons/im'
import {dataType} from './Home'


interface propsType {
    selectedProduct: dataType | null;
    setSelectedProduct: React.Dispatch<React.SetStateAction<dataType | null>>
   }

  const ProductModal: React.FC<propsType>  = ({selectedProduct, setSelectedProduct}) => {

  return (
    <motion.div
      animate={{ backgroundColor: "#00000050", backdropFilter: "blur(1rem)" }}
      transition={{ type: "tween" }}
      onClick={() => setSelectedProduct(null)}
      className="fixed z-50 inset-0 flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[min(922px,100%-4rem)] h-[500px] mx-auto border border-white/20 bg-white text-black rounded-md shadow-md p-6 grid place-content-center"
      >

        <motion.div className='flex items-center justify-center gap-4 md:flex-row flex-col'> 
          <div className='flex-1'>
            <img 
            src={selectedProduct?.image} alt="product" 
            className='h-full w-full max-[768px]:max-h-36 object-contain'
            />
          </div>
          <div className='flex-1'>
            <div className='space-y-2'>
              <h3 className='line-clamp-2 text-xl font-semibold'>{selectedProduct?.title}</h3>
              <p className='line-clamp-3'>{selectedProduct?.description}</p>
              <p className='text-2xl font-semibold'>
                <strong className='text-base'>price: </strong>
                <span className='text-green-500'>$</span>{selectedProduct?.price}
                {selectedProduct?.discount && (
                   <span className='ml-3 text-sm font-medium'>{selectedProduct?.discount}% discount</span>
                )}
              </p>
              {selectedProduct?.color && <p><strong>color:</strong> {selectedProduct?.color}</p>}
              <p><strong>brand:</strong> {selectedProduct?.brand}</p>
              {selectedProduct?.model && <p><strong>model:</strong> {selectedProduct?.model}</p>}
            </div>
          </div>
        </motion.div>
       
        <button
          onClick={() => setSelectedProduct(null)}
          className="hover:bg-red-600 group transition-colors rounded-full bg-white p-3   absolute  -top-[20px] -right-[20px]   "
        >
          <ImCross className="text-xl group-hover:text-white transition-colors text-red-600" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ProductModal;
