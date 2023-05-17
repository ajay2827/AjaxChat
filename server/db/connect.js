const mongoose=require('mongoose')

const connectDB=async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Database`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

module.exports=connectDB