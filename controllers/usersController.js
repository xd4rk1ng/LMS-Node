const User = require('../models/user');
const Profile = require('../models/profile');
const Role = require('../models/role');

const getOrCreateRole = async (roleName) => {
    const role = roleName || 'student';

    return Role.findOneAndUpdate(
        { name: role },
        { name: role },
        {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true
        }
    );
};

// GET /api/users/:id
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('role')
            .populate('profile');

        if (!user) {
            throw Object.assign(new Error('Utilizador nao encontrado'), { status: 404 });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

// POST /api/users
const createUser = async (req, res, next) => {
    try {
        const { name, email, role, teachingCourses } = req.body;

        if (!name || !email) {
            throw Object.assign(new Error('Nome e email sao obrigatorios'), { status: 400 });
        }

        if (teachingCourses !== undefined && role !== 'teacher') {
            throw Object.assign(new Error('teachingCourses so pode ser usado por teachers'), { status: 400 });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw Object.assign(new Error('Email ja esta em uso'), { status: 400 });
        }

        const userRole = await getOrCreateRole(role);

        const newUser = new User({
            name,
            email,
            role: userRole._id,
            teachingCourses: role === 'teacher' ? teachingCourses || [] : []
        });

        const savedUser = await newUser.save();
        const populatedUser = await savedUser.populate('role');

        res.status(201).json(populatedUser);
    } catch (error) {
        next(error);
    }
};

// POST /api/users/:id/profile
const createUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            throw Object.assign(new Error('Utilizador nao encontrado'), { status: 404 });
        }

        const existingProfile = await Profile.findOne({ user: req.params.id });

        if (existingProfile) {
            throw Object.assign(new Error('Este utilizador ja tem profile'), { status: 400 });
        }

        const { bio, phone, address } = req.body;
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

// DELETE /api/users/:id/profile
const deleteUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            throw Object.assign(new Error('Utilizador nao encontrado'), { status: 404 });
        }

        const deletedProfile = await Profile.findOneAndDelete({ user: req.params.id });

        if (!deletedProfile) {
            throw Object.assign(new Error('Profile nao encontrado'), { status: 404 });
        }

        user.profile = null;
        await user.save();

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserById,
    createUser,
    createUserProfile,
    deleteUserProfile
};
