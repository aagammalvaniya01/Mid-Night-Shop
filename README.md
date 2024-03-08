# Welcome to  MidNightShop! ✨

## setup Front-end 
cd FrontEnd
* for run project
 `npm install` or `yarn install` for dependency install
 `npm start` or `yarn start` for start project

============================================================================
## setup Back-end 
cd BackEnd

 `npm install` or `yarn install` for dependency install
 `npm start` or `yarn start` for start project

## Features and Functionalities 😃

**User features**

- Full featured shopping cart
- Product reviews and ratings
- Filtering (short by, category, & price range)
- Account Verification (2 factor authentication using email)
- Password Reset (Forget Password)
- Token based authentication
- Product search feature
- User profile with orders
- Save Cart
- Delete Cart
- Choose quantity (No of items to be order)
- Checkout process (shipping, payment method, etc)
- Order summary
- PayPal / credit card integration
- Database seeder (products, users, reviews, & orders)

**New features (Added)**

- Print User orders as pdf
- Print UserList as pdf
- Print OrderList as pdf

**Admin features**

- Product management
- User management
- Order management
- Order details page
- Mark orders as delivered option


**2. Create a config.env file in config folder and add the following**

```
PORT=5000
NODE_ENV=development

MONGO_URI =your mongodb uri

PAYPAL_CLIENT_ID=your paypal client id

FILE_UPLOAD_PATH=./public/uploads/product
FILE_UPLOAD_SIZE=1000000

JWT_SECRET=your key
JWT_EXPIREIN=30d

CLOUD_NAME=your cloudinary name
API_KEY=your cloudinary api key
API_SECRET=your cloudinary api secret key

SEND_GRID_KEY=your sendgrid api key

FROM_EMAIL=your sender email
FROM_NAME=ShoppingPoint

```

**3. Seed Database**

```
# Import data
node seeder -i

# Destroy data
node seeder -d
```

**4. Now start the react and node server by running the following command :-**

```
#Start the server
yarn run dev

```

## 🤩 Don't forget to give this repo a ⭐ if you like this repo and want to appreciate our efforts
