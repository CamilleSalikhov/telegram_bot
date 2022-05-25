const connectionString = "mongodb+srv://admin:admin@cscluster.jtefw.mongodb.net/?retryWrites=true&w=majority";
const connectDB = mongoose.connect(connectionString);
const kittySchema = new mongoose.Schema({
    name: String
  });const Kittsen = mongoose.model('Kittsen', kittySchema);const silence = new Kittsen({ name: 'Siasdalence' });
  console.log(silence.name);
silence.save();