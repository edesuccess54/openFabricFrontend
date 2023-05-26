import { useParams, Link} from 'react-router-dom'
import singleStyle from './productDetail.module.css'
import useFetchSingle from '../../hooks/useFetchSingle'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDelete } from '../../hooks/useDelete'


const ProductDetail = () => {
    const { user } = useAuthContext()
    const { id } = useParams();
    const { data, isLoading, error } = useFetchSingle(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
     const { deleteProduct, error: deleteError } = useDelete(`${process.env.REACT_APP_API_URL}/api/products/delete/${id}`)

  
    const handleDelete = async () => {
       await deleteProduct()
    }

  return (
    <div className={singleStyle.container}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && (
        <div className={ singleStyle.detailwrapper }>
            <div className={singleStyle.productImage}>
                <img src={data.productImage.filePath} alt="" />
                <span className={singleStyle.percentage}>{ data.priceDiscount }%</span>
            </div>
            <div className={singleStyle.contentSection}>
                <h4>{ data.productName }</h4>
                <span className={singleStyle.discountPrice}>${ (data.productPrice) - ((data.priceDiscount/100)*(data.productPrice)) }</span>
                <span className={singleStyle.actualprice}>${data.productPrice}</span>
                
                <div className={singleStyle.descriptions}>
                    <p>{ data.productDesc}</p>
                </div>
                <div className={singleStyle.action}>
                    <span className={singleStyle.delete} onClick={handleDelete}><FaTrash /></span>
                    <span className={singleStyle.edit}> <Link to={`/edit-product/${id}`} ><FaEdit /></Link> </span>     
                </div>
                      {deleteError && <p> {deleteError}</p> }      
            </div>
        </div>
        ) }
    </div>
  )
}

export default ProductDetail
