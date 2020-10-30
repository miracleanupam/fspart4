const Blog = require('../models/blog');

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
];

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON());
}

module.exports = {
    initialBlogs,
    blogsInDb
}