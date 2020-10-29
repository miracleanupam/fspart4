const { TestScheduler } = require('jest');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const logger = require('../utils/logger');

const initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Harry Potter: Philosopher\'s Stone',
        author: 'JK Rowling',
        url: 'http://www.amazon.com',
        likes: 105,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d1000',
        title: 'Sherlock Holmes: Hound of Baskervilles',
        author: 'Sir Arthur Conan Doyle',
        url: 'http://www.amazon.com',
        likes: 205,
        __v: 0
    },
    // {
    //     _id: '5a422aa71b54a676234d1001',
    //     title: 'Harry Potter: Prisioner of Azkaban',
    //     author: 'JK Rowling',
    //     url: 'http://www.amazon.com',
    //     likes: 305,
    //     __v: 0
    // },
    // {
    //     _id: '5a422aa71b54a676234d1002',
    //     title: 'Sherlock Homes: The Three Pips',
    //     author: 'Sir Arthur Conan Doyle',
    //     url: 'http://www.amazon.com',
    //     likes: 405,
    //     __v: 0
    // },
    // {
    //     _id: '5a422aa71b54a676234d1003',
    //     title: 'Sherlock Homes: New Chapter',
    //     author: 'Sir Arthur Conan Doyle',
    //     url: 'http://www.amazon.com',
    //     likes: 405,
    //     __v: 0
    // }
]

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
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
    expect(response.body).toHaveLength(initialBlogs.length);
})

afterAll(() => {
    mongoose.connection.close();
})