import React, { useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContextProvider';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className='container d-flex justify-content-center flex-wrap'>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <>astan</>
      )}
    </div>
  );
};

export default ProductsList;
