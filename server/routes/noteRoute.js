const express = require('express')
const router = express.Router()
const Note = require('../models/noteModel')

//

router.route('/').post( (req, res ) => {
    const title = req.body.title;
    const content = req.body.content;

    const newNote = new Note({
        title,
        
    })
    res.json(newNote)
    newNote.save()

})


router.route( '/:noteId').get( async (req, res) => {
    const note = await Note.findById(req.params.noteId)
    res.json(note)
} )

router.route( '/:noteId').patch( async (req, res) => {
    const updatedBoard = await Note.updateOne({id : req.params.id}, { $set : { title : req.body.title}})
    console.log( req.body)
    res.json(updatedBoard)
    
   
} )

router.route( '/').get((req, res) => {
    Note.find().then(found => res.json(found))
} )

router.route('/:noteId').delete( async (req, res) => {
    const removeNote = await Note.remove({_id: req.params.noteId});
    res.json(removeNote)
    
})

module.exports = router;