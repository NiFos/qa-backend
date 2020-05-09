import * as jwt from 'jsonwebtoken';
import { User } from './db/Models/user';
import { google } from 'googleapis';
import * as generator from 'generate-password';
import { newUser, loginUser } from '../controllers/auth';

const {
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
} = process.env;

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

  setTokens(res, [token, refreshToken]) {
    res.set('Access-Control-Expose-Headers', 'token', 'refreshToken');
    res.set('token', token);
    res.set('refreshToken', refreshToken);
  },

  getTokens: (req) => ([
    req.headers.token || '',
    req.headers.refreshToken || ''
  ]),

  async refreshTokens(res, refreshToken): Promise<boolean | { id: string }> {
    try {
      const tokenPayload: any = jwt.verify(refreshToken, SECRET);
      if (!tokenPayload.id) return null;

      const user = await User.findById(tokenPayload.id);
      if (!user) return null;

      const [newToken, newRefreshToken] = auth.createTokens(user._id);

      auth.setTokens(res, [newToken, newRefreshToken]);
      return {
        id: user._id
      };
    } catch (error) { }
  },

  async initializeUser(token, refreshToken, res) {
    if (!token || !refreshToken) return false;

    let response = null;
    jwt.verify(token, SECRET, async (err, info) => {
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

  async login(id: string, res) {
    const [token, refreshToken] = auth.createTokens(id);
    auth.setTokens(res, [token, refreshToken]);
  },

  isLoggedIn: (context) => (context.user && context.user.id)
}

interface IRegistration {
  valid: boolean,
  id: string,
  message?: string
}
export async function registration(context, username, email, password): Promise<IRegistration> {
  let response;
  response = await newUser(username, email, password);

  if (response.valid === false && response.message === 'User exist') {
    response = await loginUser(email, null, true);
  }
  if (response.valid === false) {
    return { valid: false, id: null, message: 'Something went wrong!' };
  }

  auth.login(response.id, context.res);
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

    async getUserInfo(token): Promise<any> {
      const auth = createConnectionGoogle();
      const data = await auth.getToken(token);

      auth.setCredentials(data.tokens);
      return await oauth2.userinfo.get({ auth });
    }
  }
}