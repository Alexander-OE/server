import { User } from "../db/models/user";
import { hashedPassword, createJWT } from "../utils/helpers";
class AuthService {
  async Register(
    firstName: string,
    lastName: string,
    email: string,
    confirmPassword: string,
    password: string
  ): Promise<unknown> {
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exist");
    }

    if (confirmPassword !== password) {
      throw new Error("Passwords do not match");
    }
    const securedPassword = await hashedPassword(password);
    const user = new User({
      firstName,
      lastName,
      email,
      password: securedPassword,
    });
    user.save();
    return {
      firstName,
      lastName,
      email,
    };
  }


  async Login(){}
}

export default new AuthService();
