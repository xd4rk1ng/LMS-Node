const User = require('../models/user');
const Profile = require('../models/profile');

// POST /api/profiles
const createProfile = async (req, res, next) => {
    try {
        const { user: userId, bio, phone, address } = req.body;

        if (!userId) {
            throw Object.assign(new Error('O utilizador e obrigatorio'), { status: 400 });
        }

        const user = await User.findById(userId);

        if (!user) {
            throw Object.assign(new Error('Utilizador nao encontrado'), { status: 404 });
        }

        const existingProfile = await Profile.findOne({ user: userId });

        if (existingProfile) {
            throw Object.assign(new Error('Este utilizador ja tem profile'), { status: 400 });
        }

        const newProfile = new Profile({
            user: user._id,
            bio,
            phone,
            address
        });

        const savedProfile = await newProfile.save();

        user.profile = savedProfile._id;
        await user.save();

        const populatedProfile = await savedProfile.populate('user');

        res.status(201).json(populatedProfile);
    } catch (error) {
        next(error);
    }
};

// GET /api/profiles/:id
const getProfileById = async (req, res, next) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('user');

        if (!profile) {
            throw Object.assign(new Error('Profile nao encontrado'), { status: 404 });
        }

        res.json(profile);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProfile,
    getProfileById
};
