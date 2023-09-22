import { Request, Response } from 'express';
import { connect } from '../../database';


export async function getProducts(_req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const products = await conn.query('SELECT * FROM products');
    return res.json(products[0]);
}