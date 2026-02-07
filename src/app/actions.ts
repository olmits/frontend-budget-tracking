'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { userService } from '@/services/user.service';

// 1. Strict Type Definition
export type ActionState = {
  error: string | null;
}

export async function loginAction(prevState: ActionState, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password required' }
  }

  try {
    const response = await userService.login({ email, password })

    console.log("test", response);
    if (response.token) {
      const cookieStore = await cookies();
      cookieStore.set('token', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
      });
    } else {
      return { error: 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Login Failed:', error);
    return { error: 'Login failed. Please check your credentials.' };
  }
  
  redirect('/dashboard')
}

export async function registerAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword')

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  try {
    await userService.register({ email, password })
    // No need to set cookie here, we redirect to login page
  } catch (error) {
    console.error('Registration Failed:', error);
    return { error: 'Registration failed. Email might be in use.' };
  }

  redirect('/login')
}