import { useState } from 'react'
import productStyles from './addproduct.module.css'
import { useAddProduct } from '../../hooks/useAddProduct';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  const { addProduct, isLoading, error } = useAddProduct()

  const handleImageChange = (event) => {
    setImage(event.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addProduct(name, price, discount, desc, image)
  }

  return (
    <div className={productStyles.formWrapper}>
      <h2>Add New Product</h2>
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
        {isLoading ?<button type='submit' className='btn' disabled>Processing....</button> : <button type='submit' className='btn'>Add Product</button>}
        {error && <p className="error">{error }</p> }
      </form>
    </div>
  )
}

export default AddProduct
