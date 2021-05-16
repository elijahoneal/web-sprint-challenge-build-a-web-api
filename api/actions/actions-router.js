// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const router = express.Router()

router.get('/', (req, res) => {
    Action.get()
    .then( actions => res.status(200).json(actions) )
    .catch(err => {
        console.log(err)
        res.status(404).json({message: 'actions not found'})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Action.get(id)
    .then( project => { 
        project ? res.status(200).json(project) : res.status(404).json({message: 'actions not found'})} )
    .catch( err => {
        console.log(err)
        res.status(500).json({message: 'Something went wrong'})
    })
})

router.post('/',  (req,res)  => {
    const action = req.body
    if(!action.notes || !action.description){
        res.status(400).json({message: 'Missing values'})
    } else {
        Action.insert(action)
        .then( newAction => res.status(201).json(newAction))
        .catch( err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong'})
        } )
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const action = req.body
    if(!id){
        res.status(404).json({message: 'ID does not exist'})
    } else if(!action.notes || !action.description){
        res.status(400).json({message: 'Missing values'})
    } else {
        Action.update(id, action)
        .then( changed => res.status(200).json(changed) )
        .catch( err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong'})
        } )
    }
} )

router.delete('/:id', async (req, res) => {
    const {id} = req.params
     const action = await Action.get(id)
    if(!action){
        res.status(404).json({message: 'ID does not exist'})
    } else {
       await Action.remove(id)
        .then( deleted => res.status(200).json(deleted))
        .catch( err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong'})
        } )
    }
})

module.exports = router;