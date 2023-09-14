import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { OrderCreateBody } from '@src/models/Order';
import { IReq, IRes } from './types/express/misc';
import OrderService from '@src/services/OrderService';

const fetcher = async (api: string, aToken: string, method: 'GET' | 'POST', body?: {}) => await fetch(`https://developers.cjdropshipping.com/api2.0/v1/shopping/order${api}`, { method: method, headers: { 'CJ-Access-Token': aToken, "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((res) => res.json())

/**
 * Get all the Orders
 */
async function getOrders(_: IReq, res: IRes) {
    const orderList = await OrderService.getOrders()
    return res.status(HttpStatusCodes.OK).json({ orderList });
}

/**
 * Get Orders by User
 */
async function getOrdersByUser(req: IReq<{ JWT: string }>, res: IRes) {
    const JWT = req.body.JWT
    const filterOrderList = await OrderService.getOrdersByUser(JWT)
    return res.status(HttpStatusCodes.OK).json({ filterOrderList });
}

/**
 * Post an Order
 */
async function postOrder(req: IReq<{ order: OrderCreateBody, JWT: string }>, res: IRes) {
    const { order, JWT } = req.body
    const response = await OrderService.postOrder(order, JWT)
    return res.status(HttpStatusCodes.OK).json({ response });
}

export default {
    getOrders,
    getOrdersByUser,
    postOrder,
} as const