'use server';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    // Attempt to sign in using the credentials provider
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Do not redirect automatically; handle it manually
    });

    // Check if the sign-in was successful
    if (result?.error) {
      switch (result.error) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }

    // If successful, you can handle the redirect here if necessary
    return null; // Sign-in successful, return no error
  } catch (error) {
    console.error('Authentication error:', error);
    return 'Something went wrong during authentication.';
  }
}
