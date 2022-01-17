const userNormalizator = (userToNormalize = {}) => {
    const fieldsToRemove = ['password'];

    fieldsToRemove.forEach((field) => {
        delete userToNormalize[field];
    });

    return userToNormalize;
};

class UserNormalize {
    constructor({ _id, username, email, confirmedAt, createdAt, updatedAt }) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.confirmedAt = confirmedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = {
    userNormalizator,
    UserNormalize
};
