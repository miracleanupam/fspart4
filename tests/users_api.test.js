const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const helper = require('./test_helper');

const app = require('../app');
const api = supertest(app);

const User = require('../models/user');
const logger = require('../utils/logger');


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        // logger.info('DB cleared');
    
        const passwordHash = await bcrypt.hash('ramram', 10);
        const user = new User({ username: 'ram', passwordHash});
        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'shyam',
            name: 'Shyam Lal',
            password: 'shyamshyam'
        };

        await api.post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails if username already exists', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'ram',
            name: 'Ram Bahadur',
            password: 'ramram'
        };

        const result = await api.post('/api/users')
                                .send(newUser);
        
        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('validation fails when username is less than 3 characters with 400', async () => {
        const invalidNewUser = {
            username: 'ab',
            name: "Abraham",
            password: "helloworld"
        };

        const result = await api.post('/api/users')
                                .send(invalidNewUser);

        expect(result.body.error).toContain(`validation failed: username: Path \`username\` (\`${invalidNewUser.username}\`) is shorter than the minimum allowed length (3).`);
        expect(result.status).toBe(400);
    });

    test('validation fails when password is less than 3 characters with 400', async () => {
        const invalidNewUser = {
            username: 'abraham',
            name: 'Abraham',
            password: 'he'
        };

        const result = await api.post('/api/users')
                                .send(invalidNewUser);

        expect(result.body.error).toContain('Validation Error: Password should not be less than 3 characters');
        expect(result.status).toBe(400);
    });
});


afterAll(() => {
    mongoose.connection.close();
});