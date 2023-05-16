import { useEffect, useState } from 'react'
import productStyles from './EditProduct.module.css'
import { useEditProduct } from '../../hooks/useEditProduct';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import  useFetchSingle  from '../../hooks/useFetchSingle';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const { id } = useParams()
  const { user } = useAuthContext()

  const { updateProduct, isLoading, error } = useEditProduct(`${process.env.REACT_APP_API_URL}/api/products/update/${id}`)
  const { data, isLoading: isPending, error: isError } = useFetchSingle(`${process.env.REACT_APP_API_URL}/api/products/${id}`) 

  const handleImageChange = (event) => {
    setImage(event.target.files[0])
  }

  console.log('this is the image: ', image)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await updateProduct(name, price, discount, desc, image)
  }

  useEffect(() => {
    if (data) {
      const {productName, productPrice, priceDiscount, actualprice, productImage, productDesc} = data
      setName(productName)
      setPrice(productPrice)
      setDiscount(priceDiscount)
      setDesc(productDesc)

    }
  }, [data])

  return (
    <div className={productStyles.formWrapper}>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={productStyles.inputGroup}>
          <label htmlFor="pname">Product Name</label>
          <input
            type="text"
            id='pname'
            value={name}
            onChange= {(e) => setName(e.target.value)}
          />
        </div>

        <div className={productStyles.inputGroup}>
          <label htmlFor="pname">Price</label>
          <input
            type="text"
            id='pname'
            value={price}
            onChange= {(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={productStyles.inputGroup}>
          <label htmlFor="discount">Discount(%)</label>
          <select
            name="option"
            id="discount"
            value={discount}
            onChange= {(e) => setDiscount(e.target.value)}
          >
            <option >Select Discount</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
          </select>
        </div>

        <div className={productStyles.inputGroup}>
          <label htmlFor="pimage">Product Image</label>
          <input
            type="file"
            name="image"
            id='pimage'

            onChange={handleImageChange}
          />
        </div>

        <div className={productStyles.inputGroup}>
          <label htmlFor="pdesc">Product Description</label>
          <textarea
            name="description"
            id="pdesc"
            cols="30"
            rows="5"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        {isLoading ?<button type='submit' className='btn' disabled>Processing....</button> : <button type='submit' className='btn'>Update Product</button>}
        {error && <p className="error">{error }</p> }
      </form>
    </div>
  )
}

export default EditProduct

