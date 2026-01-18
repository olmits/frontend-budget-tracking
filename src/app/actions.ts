'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
    const cookieObj = await cookies()
  const email = formData.get('email')
  const password = formData.get('password')

  console.log('Login Attempt:', { email, password })

  // Simulate setting a session
  cookieObj.set('session', 'true', { httpOnly: true })
  
  redirect('/dashboard')
}

export async function registerAction(formData: FormData) {
    const cookieObj = await cookies()
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  if (password !== confirmPassword) {
    console.log('Error: Passwords do not match')
    return { error: "Passwords do not match" }
  }

  console.log('Register Attempt:', { email, password })

  // Simulate setting a session
  cookieObj.set('session', 'true', { httpOnly: true })

  redirect('/dashboard')
}