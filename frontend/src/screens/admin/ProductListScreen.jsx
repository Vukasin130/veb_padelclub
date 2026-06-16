import { Badge, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetProductsQuery } from '../../slices/productApiSlice';

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <h1>Ponuda</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Cena</th>
              <th>Kategorija</th>
              <th>Termini</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price} RSD</td>
                <td>{product.category}</td>
                <td>
                  <Badge bg={product.countInStock > 0 ? 'success' : 'secondary'}>
                    {product.countInStock}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
