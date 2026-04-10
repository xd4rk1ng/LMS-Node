const mongoose = require('../data/mongo');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome e obrigatorio'],
        minlength: [3, 'O nome deve ter pelo menos 3 caracteres']
    },
    email: {
        type: String,
        required: [true, 'O email e obrigatorio'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email invalido']
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'A role e obrigatoria']
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        default: null
    },
    teachingCourses: [
        {
            type: String,
            trim: true
        }
    ]
}, { timestamps: true });

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('User', userSchema);
