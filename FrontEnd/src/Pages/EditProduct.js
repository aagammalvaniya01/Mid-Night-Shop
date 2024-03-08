import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer/FormContainer';
import * as productAction from '../actions/productAction';
import * as productConstants from '../constants/productConstants';
import ErrorMessage from '../Components/Message/errorMessage';
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Checkbox
} from '@material-ui/core/';
import { Link, Redirect } from 'react-router-dom';
import confirmationImg from '../assests/confirmation.png';
import { confirmAlert } from 'react-confirm-alert';
import * as routes from '../constants/routes';
import { categoryList } from './CategoryListData';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './EditProduct.css'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: '#fff',
  },
}));

const EditProduct = ({ match }) => {
  const productId = match.params.productId;
  const productData = useSelector((state) => state.Product);
  const { loading, product, error, success } = productData;

  const updateProductDetails = useSelector((state) => state.updateProductDetails);
  const { loading: EditProductLoading, error: EditProductError, success: EditProductSuccess } = updateProductDetails;

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [Success, setSuccess] = useState(false);
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);


  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.product(productId));

    // eslint-disable-next-line
  }, [dispatch, productId]);

  useEffect(() => {
    if (success) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setDescription(product.isFreeDelivery);
    }

    // eslint-disable-next-line
  }, [dispatch, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    const UpdateData = {
      name,
      brand,
      price,
      category,
      countInStock,
      description,
      isFreeDelivery
    };
    dispatch(productAction.EditProduct(productId, UpdateData));
  };

  const ConfirmedAlert = () => {
    if (EditProductSuccess) {
      return confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui-alert">
              <div className="success-img">
                <img src={confirmationImg} alt="confirmationImg" />
              </div>
              <h3 className="font-weight-bold text">Product updated successfully</h3>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose();
                  dispatch({ type: productConstants.EDIT_PRODUCT_RESET });
                  setSuccess(true);
                }}
              >
                OK
              </Button>
            </div>
          );
        },
      });
    }
  };
  return (
    <>
      {Success && <Redirect to={routes.PRODUCTS} />}
      {EditProductError && (
        <ErrorMessage
          header="Something went wrong"
          message={EditProductError}
          reset={productConstants.EDIT_PRODUCT_RESET}
        />
      )}
      <Link to={routes.PRODUCTS} className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <FormContainer>
            <h1>Edit Product</h1>
            <Form onSubmit={submitHandler} className="edit-product">
              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="brand"
                label="Brand"
                name="brand"
                autoComplete="brand"
                autoFocus
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              <TextField
                variant="outlined"
                type="number"
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                autoFocus
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <TextField
                variant="outlined"
                type="number"
                margin="normal"
                required
                fullWidth
                id="countInStock"
                label="CountInStock"
                name="countInStock"
                autoComplete="countInStock"
                autoFocus
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                multiline
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl variant="outlined" style={{ width: '100%' }} className={classes.formControl}>
                <div className='category-flex'>
                  <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                    value={category}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categoryList.map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className='free-delivery-text' >
                    <div>Free delivery</div>
                    <Checkbox
                      checked={isFreeDelivery}
                      color="primary"
                      // inputProps={{ 'aria-label': 'secondary checkbox' }}
                      // value="name"
                      onChange={(e) => setIsFreeDelivery(e.target.checked)}
                    />
                  </div>
                </div>
              </FormControl>

              <Button type="submit" variant="contained" color="primary" fullWidth disabled={EditProductLoading}>
                {EditProductLoading ? (
                  <CircularProgress color="inherit" className={classes.prgressColor} />
                ) : (
                  <>Update</>
                )}
              </Button>
            </Form>
          </FormContainer>
          {ConfirmedAlert()}
        </>
      )}
    </>
  );
};

export default EditProduct;
