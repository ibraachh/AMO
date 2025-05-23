import axios from 'src/utils/axios';

import { endpoints } from 'src/utils/endpoints';
import { setSession } from './utils';

// ----------------------------------------------------------------------

export type SignInParams = {
  username: string;
  password: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ username, password }: SignInParams): Promise<void> => {
  try {
    const params = { username, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
// export const signUp = async ({
//   email,
//   password,
//   firstName,
//   lastName,
// }: SignUpParams): Promise<void> => {
//   const params = {
//     email,
//     password,
//     firstName,
//     lastName,
//   };

//   try {
//     const res = await axios.post(endpoints.auth.signUp, params);

//     const { accessToken } = res.data;

//     if (!accessToken) {
//       throw new Error('Access token not found in response');
//     }

//     sessionStorage.setItem(STORAGE_KEY, accessToken);
//   } catch (error) {
//     console.error('Error during sign up:', error);
//     throw error;
//   }
// };

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
