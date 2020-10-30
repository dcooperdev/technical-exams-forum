import jwt from "jsonwebtoken";

class User {
    constructor(data) {
        this.token = data;
        this.profile = this.extractProfileFromToken()
    }
    extractProfileFromToken() {
        const payload = jwt.decode(this.token);
        const profile = payload.data
        delete profile.__v;
        return profile;
    }
    
}

export default User;