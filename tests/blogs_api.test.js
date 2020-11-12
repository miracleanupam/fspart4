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
});

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
});

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
});

test('a blog post can be added', async () => {
    const newBlog = {
            _id: '5a422aa71b54a676234d1001',
            title: 'Harry Potter: Prisioner of Azkaban',
            author: 'JK Rowling',
            url: 'http://www.amazon.com',
            likes: 305,
            __v: 0
        }
    
    await api.post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title);
    expect(contents).toContain('Harry Potter: Prisioner of Azkaban')
});

test('missing likes property defaults zero', async () => {
    const newBlog =  {
            _id: '5a422aa71b54a676234d1002',
            title: 'Sherlock Homes: The Three Pips',
            author: 'Sir Arthur Conan Doyle',
            url: 'http://www.amazon.com',
            __v: 0
        }
    
    await api.post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    
    const reqBlog = await helper.blogById(newBlog._id);
    const likesValue = reqBlog.likes;

    expect(likesValue).toBe(0);
});

test('missing title and url properties returns 400', async () => {
    const blogWOTitle = {
        _id: '5a422aa71b54a676234d1001',
        author: 'JK Rowling',
        url: 'http://www.amazon.com',
        likes: 305,
        __v: 0
    };

    const blogWOUrl = {
        _id: '5a422aa71b54a676234d1001',
        title: 'Harry Potter: Prisioner of Azkaban',
        author: 'JK Rowling',
        likes: 305,
        __v: 0
    };

    await api.post('/api/blogs')
            .send(blogWOTitle)
            .expect(400);

    let blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    await api.post('/api/blogs')
            .send(blogWOUrl)
            .expect(400);

    blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('deleting existing blog returns 204', async () => {
    const blogId = '5a422aa71b54a676234d17f9';
    await api.delete(`/api/blogs/${blogId}`)
            .send()
            .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
});

test('deleting non-existing blog returns 404', async () => {
    const blogId = '7b422aa71b54a676234d17f9';

    await api.delete(`/api/blogs/${blogId}`)
            .send()
            .expect(404);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
    mongoose.connection.close();
});