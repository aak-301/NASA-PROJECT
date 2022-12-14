const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200', async () => {
        const response = await request(app).get('/launches').expect(200);
    })
})

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4,2028',
    };

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
    };

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'zoot',
    };

    test('It should respond with 201 success', async () => {
        const response = await request(app).post('/launches').send(completeLaunchData).expect('Content-Type', /json/)
            .expect(201)

        const reqDate = new Date(completeLaunchData.launchDate).valueOf();
        const resDate = new Date(response.body.launchDate).valueOf();
        expect(resDate).toBe(reqDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });
    test('It should catch missing required properties', async () => {
        const response = await request(app).post('/launches').send(launchDataWithoutDate).expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        })
    });
    test('It should catch invalid dates', async () => {
        const response = await request(app).post('/launches').send(launchDataWithInvalidDate).expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        })
    });
})