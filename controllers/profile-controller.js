const User = require('../models/authentication-model');
const Profile = require('../models/profile-model');

const getProfileDetails = async (req, res) => {
    try {
        // Fetch user with profile details
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Profile,
                    as: 'profile',
                }
            ],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createProfile = async(req,res) => {
    try {
        await Profile.create({
            ...req.body,
            userId: req.user.id
        })
        return res.status(201).json({ message: 'Profile created successfully'})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProfileDetails,
    createProfile
};
