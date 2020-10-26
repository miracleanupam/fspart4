const blogsRouter = require('express').Router()

const { response } = require('express');
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs);
    })
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

blogsRouter.post('/', (req, res, nxt) => {
    const blog = new Blog(req.body);

    blog.save().then(savedBlog => {
        res.json(savedBlog);
    }).catch(error => nxt(error));
})

// blogsRouter.delete('/:id', (req, res, nxt) => {
//     Blog.findByIdAndRemove(request.params.id).then(() => {
//         response.status(204).end()
//     }).catch(error => nxt(error));
// })

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