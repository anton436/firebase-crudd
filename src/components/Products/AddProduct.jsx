import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContextProvider';

function AddProduct() {
  const { createProduct } = useProducts();

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    category: '',
  });

  const handleInp = (e) => {
    if (e.target.name == 'price') {
      let obj = { ...product, [e.target.name]: Number(e.target.value) };
      setProduct(obj);
    } else {
      let obj = { ...product, [e.target.name]: e.target.value };
      setProduct(obj);
    }
  };

  console.log(product);

  return (
    <Form className='w-50 m-auto'>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Product Title</Form.Label>
        <Form.Control
          onChange={handleInp}
          type='text'
          name='title'
          placeholder='Enter product title'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Price</Form.Label>
        <Form.Control
          onChange={handleInp}
          type='number'
          name='price'
          placeholder='title price'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          onChange={handleInp}
          type='text'
          name='description'
          placeholder='Enter product description'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Product Category</Form.Label>
        <Form.Control
          onChange={handleInp}
          type='text'
          name='category'
          placeholder='Enter product category'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          onChange={handleInp}
          type='text'
          name='image'
          placeholder='Enter product image url'
        />
      </Form.Group>

      <Button
        onClick={() => {
          createProduct(product);
          navigate('/products');
        }}
        variant='primary'
        type='button'
      >
        ADD product
      </Button>
    </Form>
  );
}

export default AddProduct;
