import StatusCodes from 'http-status-codes';
import { Response, Router } from 'express';

import { paramMissingError, IRequest } from '@shared/constants';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



router.post('/add', async (req: IRequest, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    return res.status(CREATED).end();
});


export default router;
