import { Ref, ref } from '@vue/composition-api';

interface UserError {
  message: string;
}

export interface AuthResponse {
  error: false | string;
  body: {
    success: boolean;
    user?: {
      displayName: string;
      email: string;
      token: string;
    };
  };
  ok: boolean;
}

interface DefinedUser {
  email: string;
  displayName: string;
  token: string;
}

export type User = DefinedUser | undefined;

const getUser = async () => {
  const user = ref({} as User);
  const backendUrl = 'http://localhost:3000/auth/verify';
  const verifyRes = await fetch(backendUrl, {
    method: 'POST',
    credentials: 'include'
  });
  const data = (await verifyRes.json()) as AuthResponse;
  console.log(data);
  if (data.error) throw Error(data.error);
  user.value = data.body.user;
  return user;
};

export default () => getUser;
