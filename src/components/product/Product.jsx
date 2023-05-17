import productSyles from './product.module.css'
import { Link } from 'react-router-dom'
        
const Product = (props) => {
  const {_id, productName, productImage, productPrice, priceDiscount} = props.items
  return (
    <>
        <Link to={`/product-details/${_id}`} >
          <div className={productSyles.productContainer}>
              <div className={productSyles.productInner}>
                  <div className={productSyles.productImage}>
                      <img src={productImage.filePath} alt="" />
                  </div>
                  <div className={productSyles.productContent}>
                        <h4>{ productName }</h4>
                        <span className={productSyles.discountPrice}>${ (productPrice) - ((priceDiscount/100)*(productPrice)) }</span>
                        <span className={productSyles.actualprice}>${ productPrice }</span>
                  </div>
                  <span className={productSyles.percentage}>-{ priceDiscount }%</span>
                </div>
            </div>
        </Link>
    </>
  )
}

export default Product
