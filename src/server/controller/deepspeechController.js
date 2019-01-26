const ds=require('node-deepspeech')
const FS=require('fs')
module.exports= function() {
    return{
        file : function(req,res,next) {
            if(!req.files){
                console.log('no file')
                next()
            }
            console.log(`write board with file filename: ${req.files.audiofile.name}`)
            let getFile = Buffer.from(req.files.audiofile)
            let result = ds.dsFile(getFile)
	    console.log(result)
            res.status(201).json({ds:result})
        }
    }
}
