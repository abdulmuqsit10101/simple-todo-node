import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const validator = require('validator');

interface UserDocument extends mongoose.Document {
    name: String;
    email: String;
    password: String;
    passwordConfirm?: String;
}

const userSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        // select: false, // Exclude password from query results by default
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        // This will only work on CREATE or SAVE.
        validate: {
            validator: function (this: UserDocument, el: string) {
                // @ts-ignore
                return el === this.password;
            },
            message: "Passwords do not match!"
        },
    }
});

userSchema.pre<UserDocument>('save', async function(this, next) {
    if(!this.isModified('password')) return next();

    // Hash the password
    const passwordString: string = this.password.toString(); // Ensure it's a primitive string
    const hashedPassword = await bcrypt.hash(passwordString, 12);
    this.password = hashedPassword;

    delete this.passwordConfirm;
})

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;