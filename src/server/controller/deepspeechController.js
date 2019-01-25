const ds=require('node-deepspeech')
module.exports= function() {
    return{
        file : function(req,res,next) {
            if(!req.files){
                console.log('no file')
                next()
            }
            console.log(`write board with file filename: ${req.files.audiofile.name}`)
            let getFile = req.files.audiofile
            let result = ds.dsFile(getFile)
            res.status(201).json({ds:result})
        }
    }
}
