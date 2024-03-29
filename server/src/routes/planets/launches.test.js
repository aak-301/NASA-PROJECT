const request = require('supertest');
const app = require('../../app');
const { loadPlanetsata } = require('../../models/planets.models');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsata();
    });

    afterAll(async () => {
        await mongoDisconnect();
    })

    describe('Test GET /v1/launches', () => {
        test('It should respond with 200', async () => {
            const response = await request(app).get('/v1/launches').expect(200);
        })
    })

    describe('Test POST /v1/launches', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'January 4,2028',
        };

        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
        };

        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'zoot',
        };

        test('It should respond with 201 success', async () => {
            const response = await request(app).post('/v1/launches').send(completeLaunchData).expect('Content-Type', /json/)
                .expect(201)

            const reqDate = new Date(completeLaunchData.launchDate).valueOf();
            const resDate = new Date(response.body.launchDate).valueOf();
            expect(resDate).toBe(reqDate);

            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
        test('It should catch missing required properties', async () => {
            const response = await request(app).post('/v1/launches').send(launchDataWithoutDate).expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            })
        });
        test('It should catch invalid dates', async () => {
            const response = await request(app).post('/v1/launches').send(launchDataWithInvalidDate).expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Invalid launch date'
            })
        });
    })
})

