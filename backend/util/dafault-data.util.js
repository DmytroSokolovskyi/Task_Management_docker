const { Users } = require('../dataBase');

module.exports = async () => {
    const admin = await Users.findOne({ email: "dim4uk@gmail.com" });

    if (!admin) {
        await Users.createUserWithPassword({
            username: 'Admin',
            email: "dim4uk@gmail.com",
            password: "Qwerty!1",
        });
    }
};
