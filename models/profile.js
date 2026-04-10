const mongoose = require('../data/mongo');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'O utilizador e obrigatorio'],
        unique: true
    },
    bio: {
        type: String,
        default: '',
        maxlength: [500, 'A bio deve ter no maximo 500 caracteres']
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    }
}, { timestamps: true });

profileSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Profile', profileSchema);
