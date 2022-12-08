import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../fire';

const productContext = createContext();
export const useProducts = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  productDetails: null,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'GET_PRODUCT_DETAILS':
      return { ...state, productDetails: action.payload };

    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //  collection - функция для полученя ссылки на коллекцию данных
  const productsCollectionRef = collection(db, 'products');

  //  read
  async function getProducts() {
    const data = await getDocs(productsCollectionRef);

    dispatch({
      type: 'GET_PRODUCTS',
      payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });

    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getProducts();
  }, []);

  console.log(state);
  const values = {};
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
