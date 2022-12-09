import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContextProvider';

function ProductCard({ product }) {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  return (
    <Card style={{ width: '15rem', margin: '1rem' }}>
      <Card.Img variant='top' height={150} src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>$ {product.price}</Card.Text>
        <Card.Text>{product.category}</Card.Text>
        <Button onClick={() => deleteProduct(product.id)} variant='danger'>
          DELETE
        </Button>
        <Button
          onClick={() => navigate(`/products/${product.id}`)}
          variant='warning'
        >
          EDIT
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
