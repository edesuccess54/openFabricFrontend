
import { useEffect, useState } from "react"
import Product from "../../components/product/Product"
import useFetch from "../../hooks/useFetch"
import homeStyles from './home.module.css'


const Home = () => {
    const {data:products, isPending, isError} = useFetch(`${process.env.REACT_APP_API_URL}/api/products`)    
  return (
      <div className={homeStyles.productsWrapper}>
          {isPending && <p>Loading...</p>}
          {isError && <p>{isError}</p> }
          
          {products && products.map(product => (
            <div className={homeStyles.productInner}>
              <Product key={product._id} items={product} />
          </div>
      )) }
    </div>
  )
}

export default Home
