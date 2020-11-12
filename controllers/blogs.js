const blogsRouter = require('express').Router()

const { response } = require('express');
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
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
    
        const blog = new Blog(req.body);

        const savedBlog = await blog.save();

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

// blogsRouter.put('/:id', (req, res, nxt) => {
//     const body = request.body;

//     const blog = {
//         content: body.content
//     }

//     Note.findByIdAndUpdate(request.params.id, note, { new: true }).then(updatedBlog => {
//         response.json(updatedBlog);
//     }).catch(error => nxt(error));
// })

module.exports = blogsRouter;