const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/noteModel')
const bodyParser = require('body-parser')
const {GridFsStorage} = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const crypto = require('crypto');
const path = require('path');
const multer = require('multer')
app.use(cors())
app.use(express.json())
app.use('/notes', require('./routes/noteRoute'));
app.use('/boards', require('./routes/boardRoute'));
app.use(methodOverride('_method'))


const port = process.env.PORT || 3001
const uri = 'mongodb+srv://user1:12345@cluster0.vnpml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('build'))
// }



mongoose.connect('mongodb+srv://user1:12345@cluster0.vnpml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser : true}, () => {
    
} )


mongoose.connection.on('connected', () => {
    console.log('mongoose is connected')
})

const conn =  mongoose.createConnection(uri)

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
 })


//const conn = mongoose.createConnection(uri)


let gfs;


let storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


// @route POST/ upload
app.post('/upload', upload.single('file'),(req, res) => {
    
    res.json({file: req.file})
 })

app.get('/files',  async (req, res) => {
   
    gfs.files.find().toArray((err, files) => {
        if(!files || files.length === 0) {
            
            return res.status(404).json({
                err: 'no files'
            })
        }
        return res.json(files)
    })
})

app.get('/files/:filename', (req, res) => {
   
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file || file.length === 0){ return res.status(404).json({err: 'no such a file'})}
        return res.json(file)
    })
})

app.get('/file/image/:filename', (req, res) => {
   
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file || file.length === 0){ return res.status(404).json({err: 'no such a file'})}
        
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res)
    })
})

app.get('/image/:filename', (req, res) => {
   
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file || file.length === 0){ return res.status(404).json({err: 'no such a file'})}
        
        res.json({file: file})
    })
})











app.listen( port, () => {
    console.log('server connected')
})