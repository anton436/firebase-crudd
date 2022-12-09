import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContextProvider';

function EditProduct() {
  const { id } = useParams();
  const { getOneProductDetails, productDetails, updateProduct } = useProducts();

  const [editedProduct, setEditedProduct] = useState(productDetails);

  useEffect(() => {
    getOneProductDetails(id);
  }, []);

  useEffect(() => {
    setEditedProduct(productDetails);
  }, [productDetails]);

  console.log(productDetails);

  const navigate = useNavigate();

  const handleInp = (e) => {
    let obj = { ...editedProduct, [e.target.name]: e.target.value };
    setEditedProduct(obj);
  };

  return (
    <>
      {editedProduct && (
        <Form className='w-50 m-auto'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              value={editedProduct.title || ''}
              onChange={handleInp}
              type='text'
              name='title'
              placeholder='Enter product title'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={editedProduct.price || ''}
              onChange={handleInp}
              type='number'
              name='price'
              placeholder='title price'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              value={editedProduct.description || ''}
              onChange={handleInp}
              type='text'
              name='description'
              placeholder='Enter product description'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              value={editedProduct.category || ''}
              onChange={handleInp}
              type='text'
              name='category'
              placeholder='Enter product category'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              value={editedProduct.image || ''}
              onChange={handleInp}
              type='text'
              name='image'
              placeholder='Enter product image url'
            />
          </Form.Group>

          <Button
            onClick={() => {
              updateProduct(id, editedProduct);
              navigate('/products');
            }}
            variant='primary'
            type='button'
          >
            save changes
          </Button>
        </Form>
      )}
    </>
  );
}

export default EditProduct;
