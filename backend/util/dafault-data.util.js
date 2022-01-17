// const { Doctors } = require('../dataBase');
// const { config, rolesEnum} = require('../configs');
//
// module.exports = async () => {
//     const admin = await Doctors.findOne({ role: rolesEnum.ADMIN });
//
//     if (!admin) {
//         await Doctors.createDoctorWithPassword({
//             name: 'Admin',
//             email: config.ADMIN_EMAIL,
//             phone: config.ADMIN_NUMBER,
//             password: config.ADMIN_PASS,
//             role: rolesEnum.ADMIN,
//             activate: true
//         });
//     }
// };
