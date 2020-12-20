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
        logger.info('DB cleared');
    
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

        console.log('fresh username about to send the api request');

        await api.post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/);

        console.log('checking if the user is included at last');
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        console.log('checking if the newly created username is in the db')
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails if username already exists', async () => {
        const usersAtStart = await helper.usersInDb();

        console.log('stale username about to send the api request');
        const newUser = {
            username: 'ram',
            name: 'Ram Bahadur',
            password: 'ramram'
        };

        const result = await api.post('/api/users')
                                .send(newUser);
                                // .expect(400)
                                // .expect('Content-Type', /application\/json/);

        
        expect(result.body.error).toContain('to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});


afterAll(() => {
    mongoose.connection.close();
});