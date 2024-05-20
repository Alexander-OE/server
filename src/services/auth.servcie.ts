import { User } from "../db/models/user";
import { hashedPassword, comparePassword, createJWT } from "../utils/helpers";
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

  async Login(email: string, password: string) {
    const userExist = await User.findOne({ email })
    if (!userExist) {
      throw new Error("User does not exist");
    }

    const userPassword = await comparePassword(password, userExist.password);

    if (!userPassword) {
      throw new Error("Password does not match");
    }
    let userDetail = {
      id: userExist._id,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      email: userExist.email,
    };

    const token = await createJWT(userDetail);

    return {
      userExist,
      token,
    };
  }
}

export default new AuthService();
