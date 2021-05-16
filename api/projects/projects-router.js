// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const router = express.Router()

router.get('/', (req, res) => {
    Project.get()
    .then( projects => res.status(200).json(projects) )
    .catch(err => {
        console.log(err)
        res.status(404).json({message: 'projects not found'})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Project.get(id)
    .then( project => { 
        project ? res.status(200).json(project) : res.status(404).json({message: 'projects not found'})} )
    .catch( err => {
        console.log(err)
        res.status(500).json({message: 'Something went wrong'})
    })
})

module.exports = router;