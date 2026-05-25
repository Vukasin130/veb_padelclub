import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const Product = ({ product }) => {
    return (
        <Card className='offer-card'>
            <Link className="offer-image-link" to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
                <Badge className="offer-badge">{product.category}</Badge>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div' className='product-title'><strong>{product.name}</strong></Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
                </Card.Text>
                <div className="offer-footer">
                    <Card.Text as='h3'>{product.price} RSD</Card.Text>
                    <span>{product.countInStock} slobodno</span>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Product
