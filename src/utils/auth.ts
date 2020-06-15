import * as jwt from 'jsonwebtoken';
import { User } from './db/Models/user';
import { google } from 'googleapis';
import * as generator from 'generate-password';
import { newUser, loginUser } from '../controllers/auth';

const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '10m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '1h';
const SECRET = process.env.SECRET || 'SECRET_STRING';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'CLIENT_ID';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'CLIENT_SECRET';
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL || 'REDIRECT_URL';

export const auth = {
  createTokens(id: string) {
    const token: string = jwt.sign({ id }, SECRET, {
      expiresIn: TOKEN_EXPIRATION
    });
    const refreshToken: string = jwt.sign({ id }, SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION
    });
    return [token, refreshToken];
  },

  setTokens(res: any, [token, refreshToken]: any[]) {
    res.append('token', token);
    res.append('refreshToken', refreshToken);
    res.append("Access-Control-Expose-Headers", ['token', 'refreshToken']);
  },

  getTokens: (req: any) => ([
    req.headers.token || '',
    req.headers.refreshToken || ''
  ]),

  async refreshTokens(res: any, refreshToken: string): Promise<false | { id: string }> {
    try {
      const tokenPayload: any = jwt.verify(refreshToken, SECRET);
      if (!tokenPayload.id) return false;

      const user = await User.findById(tokenPayload.id);
      if (!user) return false;

      const [newToken, newRefreshToken] = auth.createTokens(user._id);

      auth.setTokens(res, [newToken, newRefreshToken]);
      return {
        id: user._id
      };
    } catch (error) {
      return false;
     }
  },

  async initializeUser(token: string, refreshToken: string, res: any) {
    if (!token || !refreshToken) return false;

    let response = null;
    jwt.verify(token, SECRET, async (err, info: any) => {
      if (err) {
        response = await auth.refreshTokens(res, refreshToken);
      } else {
        response = {
          id: info.id
        };
      }
    });
    return response;
  },

  async login(id: string, res: any) {
    const [token, refreshToken] = auth.createTokens(id);
    auth.setTokens(res, [token, refreshToken]);
  },

  isLoggedIn: (context: any) => !!(context.user && context.user.id)
}

interface IRegistration {
  valid: boolean,
  id: string | null,
  message?: string
}
export async function registration(context: any, username: string, email: string, password: string): Promise<IRegistration> {
  let response: any;
  response = await newUser(username, email, password);

  if (response.valid === false && response.message === 'User exist') {
    response = await loginUser(email, null, true);
  } 
  else if (response.valid === false) {
    return { valid: false, id: null, message: 'Something went wrong!' };
  }

  auth.login(response!.id, context.res);
  return { valid: true, id: response.id };
}

export function generatePassword() {
  return generator.generate({
    length: 13,
    numbers: true
  })
}

function createConnectionGoogle() {
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL
  );
}

const oauth2 = google.oauth2('v2');
export const oauth = {
  google: {
    getUrl() {
      const scope = 'https://www.googleapis.com/auth/userinfo.email'
      const auth = createConnectionGoogle();
      const url = auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope
      });

      return url;
    },

    async getUserInfo(token: any): Promise<any> {
      const auth = createConnectionGoogle();
      const data = await auth.getToken(token);

      auth.setCredentials(data.tokens);
      return await oauth2.userinfo.get({ auth });
    }
  }
}