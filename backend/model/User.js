const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Optional for auto-increment

const userSchema = new mongoose.Schema({
  // Auto-incremented field for f_sno (optional)
  f_sno: { type: Number, unique: true },
  
  f_userName: { type: String, required: true, unique: true },
  f_Pwd: { type: String, required: true },
});

// Automatically increment f_sno with each new document
userSchema.plugin(AutoIncrement, { inc_field: 'f_sno' });

const User = mongoose.model('User', userSchema);

module.exports = User;
