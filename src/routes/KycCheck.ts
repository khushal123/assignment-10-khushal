import StatusCodes from 'http-status-codes';
import { Response, Router, Request } from 'express';
import { body, validationResult } from 'express-validator'
import kycCheckApi from '../controllers/kycCheckController';

const router = Router();
const { BAD_REQUEST, OK } = StatusCodes;



router.post('/', [
    body('birthDate', 'A valid birthDate is required').exists().isDate({
        format: 'YYYY-MM-DD'
    }),
    body('givenName', 'A valid givenName is required').exists().isLength({ max: 100 }),
    body('middleName', 'A valid middleName is required').optional().isLength({ max: 100 }),
    body('familyName', 'A valid familyName is required').exists(),
    body('licenceNumber', 'A valid licenceNumber is required').exists(),
    body('stateOfIssue', 'A valid stateOfIssue is required').exists().isIn(["NSW", "QLD", "SA", "TAS"
        , "VIC", "WA", "ACT", "NT"]),
    body('expiryDate', 'A valid expiryDate is required').optional().isDate({
        format: 'YYYY-MM-DD'
    }),
], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST).json({ errors: errors.array() });
        }
        const { birthDate, givenName, middleName, familyName, licenceNumber, stateOfIssue, expiryDate } = req.body
        const data: any = {
            birthDate,
            givenName,
            familyName,
            licenceNumber,
            stateOfIssue
        }
        if (expiryDate) {
            data.expiryDate = expiryDate
        }
        if (middleName) {
            data.middleName = middleName
        }
        const kycApiResponse = await kycCheckApi(data);
        res.status(OK).json(kycApiResponse)
    } catch (error) {
        res.status(BAD_REQUEST).json({
            errors: error
        })
    }
});


export default router;
