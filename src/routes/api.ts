import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import User from '@src/models/User';
import UserRoutes from './UserRoutes';
import KeyRoutes from './KeyRoutes';
import ProductsRoutes from './ProductsRoutes';
import OrderRoutes from './OrderRoutes';
import Order from '@src/models/Order';
import PaymentRoutes from './PaymentRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();
const keyRouter = Router()
const productRouter = Router()
const orderRouter = Router()
const paymentRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

//** Key Router */
// Get key 
keyRouter.get(
  Paths.Key.Get,
  KeyRoutes.getKey
)

//** Product Router */
// Get CategoryList
productRouter.get(
  Paths.Product.Categories,
  ProductsRoutes.getCategoryList
)

// Get ProductList
productRouter.get(
  Paths.Product.All,
  ProductsRoutes.getProductList
)

// Get Comments
productRouter.get(
  Paths.Product.Comment,
  validate(['pid','string','params']),
  ProductsRoutes.getProductComments
)

// Get Details
productRouter.get(
  Paths.Product.Detail,
  validate(['pid','string','params']),
  ProductsRoutes.getProductDetails
)

//** Order Router */
// Get all orders
orderRouter.get(
  Paths.Order.All,
  OrderRoutes.getOrders
)

//Add one Order
orderRouter.post(
  Paths.Order.Add,
  validate(['order', Order.isOrder],'JWT'),
  OrderRoutes.postOrder
)

//Get orders by user
orderRouter.get(
  Paths.Order.User,
  validate('JWT'),
  OrderRoutes.getOrdersByUser
)

/** Payments Router */
//Create Payment
paymentRouter.post(
  Paths.Payments.Create,
  PaymentRoutes.paypalCreateOrder
)

//Capture payment
paymentRouter.post(
  Paths.Payments.Capture,
  PaymentRoutes.paypalCaptureOrder
)

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Key.Base, keyRouter)
apiRouter.use(Paths.Product.Base, productRouter)
apiRouter.use(Paths.Order.Base, orderRouter)
apiRouter.use(Paths.Payments.Base, paymentRouter)


// **** Export default **** //

export default apiRouter;
