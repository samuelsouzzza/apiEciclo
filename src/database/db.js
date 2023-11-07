import mongoose from "mongoose";

async function connectDatabase(){
  await mongoose.connect(
      "mongodb+srv://pedrocelestino01:rFYnsppetv6Chmnh@cluster0.w5s5i9i.mongodb.net/?retryWrites=true&w=majority"
    )
}

export default connectDatabase