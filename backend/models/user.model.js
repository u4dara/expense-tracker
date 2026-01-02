import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
			minlength: 3,
			maxlength: 50,
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			lowercase: true,
			match: [/\S+@\S+\.\S+/, 'Please add a valid email'],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', userSchema);
