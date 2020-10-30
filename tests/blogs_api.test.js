const { TestScheduler } = require('jest');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const logger = require('../utils/logger');


beforeEach(async () => {
    await Blog.deleteMany({});
    logger.info('DB cleared');

    const blogObjects = helper.initialBlogs.map(b => new Blog(b));
    const promiseArray = blogObjects.map(b => b.save());
    await Promise.all(promiseArray);
})

// test('blogs are returned as JSON', async () => {
//     await api
//         .get('/api/blogs')
//         .expect(200)
//         .expect('Content-Type', /application\/json/);
// });

// test('specific blog is returned within returned blogs', async () => {
//     const response = await api.get('/api/blogs');

//     const contents = response.body.map(r => r.title);
//     expect(contents).toContain('Sherlock Holmes: Hound of Baskervilles');
// });

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
})

afterAll(() => {
    mongoose.connection.close();
})