const blogsRouter = require('express').Router()

const { response } = require('express');
const { update } = require('../models/blog');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1});
    res.json(blogs);
})

// blogsRouter.get('/:id', (req, res, nxt) => {
//     Blog.findById(req.params.id).then(note => {
//         if (note) {
//             res.json(note);
//         } else {
//             res.status(404).end()
//         }
//     })
//         .catch(error => nxt(error));
// })

blogsRouter.post('/',  async (req, res) => {
    if (req.body.title && req.body.url) {
        const body = req.body;

        const user = (await User.find({}).limit(1))[0];
        const blog = new Blog({
            title: body.title,
            author: body.author,
            likes: body.likes,
            url: body.url,
            user: user._id
        });

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        res.json(savedBlog);

    } else {
        response.status(400).end();
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        blog.remove();
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body;
    const foundBlog = await Blog.findById(req.params.id);

    if (foundBlog) {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, { new: true });
        res.json(updatedBlog);
    } else {
        res.status(404).end();
    }
})

module.exports = blogsRouter;