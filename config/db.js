const mongoose =require('mongoose');
const config =require('config');
const db = config.get('mongoURI');

const connectDB = async ()=>{
    try{
        
        mongoose.set ('useCreateIndex', true)
        mongoose.set ('useUnifiedTopology',true)
        mongoose.set ('useFindAndModify',false)
        await mongoose.connect(db,{ useNewUrlParser: true });
        console.log('MongoDB connected');
    }catch(err){
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}
module.exports =connectDB;