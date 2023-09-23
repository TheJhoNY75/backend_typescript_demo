import { Request, Response } from 'express';


export async function getProducts(_req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'getProducts' });
}