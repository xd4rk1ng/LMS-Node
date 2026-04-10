const mongoose = require('../data/mongo');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A role e obrigatoria'],
        enum: {
            values: ['student', 'teacher', 'admin'],
            message: 'Role invalida'
        },
        unique: true
    }
}, { timestamps: true });

roleSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Role', roleSchema);
