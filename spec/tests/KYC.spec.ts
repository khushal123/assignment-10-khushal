import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@server';
import { pErr } from '@shared/functions';



describe('KYC Routes', () => {

    const kycPath = '/api/kyc';

    const { BAD_REQUEST, CREATED, OK } = StatusCodes;
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    const allBody: any = {
        "birthDate": "1985-02-08",
        "givenName": "James",
        "middleName": "Robert",
        "familyName": "Smith",
        "licenceNumber": "94977000",
        "stateOfIssue": "NSW",
        "expiryDate": "2020-01-01"
    }

    const validationBody: any = {
        "birthDate": "1985-02-08",
        "givenName": "James",

    }
    describe(`"POST:${kycPath}"`, () => {

        let callApi = () => {
            return agent.post(kycPath).type('form').send(allBody);
        };
        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Call API
            callApi()
                .end((err: Error, res: any) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a status code of "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            let callApi = () => {
                return agent.post(kycPath).type('form').send(validationBody);
            };
            // Call API
            callApi()
                .end((err: Error, res: any) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });
    });
});
