import { oauth } from "../utils/auth";
import { IUser, User } from "../utils/db/Models/user";


export async function newUser(username: string, email: string, password: string) {
  const exist = await User.findOne({ email: email.toLocaleLowerCase() });
  if (exist) {
    return { valid: false, message: 'User exist' };
  }

  const user: IUser = new User;
  user.username = username;
  user.email = email.toLocaleLowerCase();
  user.password = user.generateHashPassword(password);

  const response = await user.save();

  return { valid: true, id: response._id };
}

export async function loginUser(email: string, password: string | null, passPassword?: boolean) {
  const user: any = await User.findOne({ email: email.toLocaleLowerCase() });

  if (!user) return { valid: false, message: 'User not exist' };

  if (!passPassword) {
    if (!user.validPassword(password)) return false;
  }

  return { valid: true, id: user._id };
}


export function getOauthUrl(type: string) {
  switch (type) {
    case 'google': {
      return oauth.google.getUrl();
    }

    default:
      return null;
  }
}