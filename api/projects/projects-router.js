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

router.post('/',  (req,res)  => {
    const project = req.body
    if(!project.name || !project.description){
        res.status(400).json({message: 'Missing values'})
    } else {
        Project.insert(project)
        .then( newProject => res.status(201).json(newProject))
        .catch( err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong'})
        } )
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const project = req.body
    if(!id){
        res.status(404).json({message: 'ID does not exist'})
    } else if(!project.name || !project.description){
        res.status(400).json({message: 'Missing values'})
    } else {
        Project.update(id, project)
        .then( changed => res.status(200).json(changed) )
        .catch( err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong'})
        } )
    }
} )

router.delete('/:id', async (req, res) => {
    const {id} = req.params
     const project = await Project.get(id)
    if(!project){
        res.status(404).json({message: 'ID does not exist'})
    } else {
       await Project.remove(id)
        .then( deleted => res.status(200).json(deleted))
        .catch( err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong'})
        } )
    }
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Project.getProjectActions(id)
    .then( action => { 
        action ? res.status(200).json(action) : res.status(404).json({message: 'actions not found'})} )
    .catch( err => {
        console.log(err)
        res.status(500).json({message: 'Something went wrong'})
    })
})

module.exports = router;