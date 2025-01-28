'use client';
import { createContext, useState, useContext } from 'react';
const showProductDetailsAsideContext = createContext();
export function ShowProductDetailsAsideProvider({ children }) {
  const [ showProductDetailsAside, setShowProductDetailsAside] = useState(false);
  const [ productId, setProductId] = useState(null);
  return (
    <showProductDetailsAsideContext.Provider value={{ showProductDetailsAside, setShowProductDetailsAside,productId,setProductId}}>
      {children}
    </showProductDetailsAsideContext.Provider>
  );
}
export function useShowProductDetailsAside() {
  return useContext(showProductDetailsAsideContext);
}