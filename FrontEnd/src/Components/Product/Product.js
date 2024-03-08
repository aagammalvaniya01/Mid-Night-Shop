import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '../Rating/Rating';
import * as routes from '../../constants/routes';
import { interpolate } from '../../utils/string';
import 'animate.css';
import '../style.css';
import './Product.css'

const Product = ({ product }) => {
  console.log("console_1", product)
  return (
    <Card className="my-3 p-3 rounded  cursor-pointer">
      <Link to={interpolate(routes.PRODUCT, { productId: product._id })}>
        <Card.Img src={product.productImage} variant="top" />
      </Link>

      <Card.Body>
        <Link to={interpolate(routes.PRODUCT, { productId: product._id })}>
          <Card.Title as="div">
            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
          </Card.Title>
        </Link>

        <Card.Text as="h3" className="price-contain" >₹{product.price}</Card.Text>
        <div className='delivery-badge'>
          {product.isFreeDelivery ? 'Free delivery' : "Paid delivery"}
        </div>
        <Card.Text as="div">
          <Rating value={product.averageRating} text={`${product.Reviews ? product.Reviews.length : 0} reviews`} />
        </Card.Text>

      </Card.Body>
    </Card>
  );
};

export default Product;
