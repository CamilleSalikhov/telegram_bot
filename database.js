 

const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://admin:admin@cscluster.jtefw.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    })

    console.log('mongo db connected')
  } catch(err) {
    console.log(err);
  

  }
}


const orderSchema = new mongoose.Schema({
  name: String,
  password: String,
  token: String,
  order: String,
  date: String,
  id: String,
  phoneNumber: String
});

const Order = mongoose.model('Order', orderSchema);

// const silence = new Order({ name: 'admin' });
// silence.save()





module.exports.connectDB = connectDB;
module.exports.Order = Order;

