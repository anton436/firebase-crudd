import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContextProvider';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../fire';

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

  //! ================================== upload image================

  const [file, setFile] = useState('');
  const [uploadProgress, setUploadedProgress] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, 'images/' + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadedProgress(progress);
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

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
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
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
        className={
          uploadProgress !== null && uploadProgress < 100
            ? 'disabled pe-none btn-light'
            : 'pe-auto btn-success'
        }
      >
        ADD product
      </Button>
    </Form>
  );
}

export default AddProduct;
