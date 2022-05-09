export class User {
    constructor(firstName, lastName, userId, email, password, phone, isActive, type) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.isActive = isActive;
        this.type = type;
        this._id = userId;
    }
}