const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.REMOTE_MONGO_URL,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        })
        console.log(`MongoDB Connected: ${connection.connection.host}`)            
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB