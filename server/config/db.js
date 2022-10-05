const mongoose=require('mongoose')
require('dotenv').config()
const dburl=process.env.DB_URL
mongoose.connect(dburl)
.then(()=>{
    console.log(`Mongodb is connected successfully`)
})
.catch((err)=>{
    console.log(err)
    process.exit(1)
})