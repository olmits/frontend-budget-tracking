/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { categoryService } from "@/services/category.service";
import { transactionService } from "@/services/transaction.service";
import { userService } from "@/services/user.service";

// 1. Strict Type Definition
export type ActionState = {
  error: string | null;
};

export async function loginAction(prevState: ActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password required" };
  }

  try {
    const response = await userService.login({ email, password });

    console.log("test", response);
    if (response.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
      });
    } else {
      return { error: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Login Failed:", error);
    return { error: "Login failed. Please check your credentials." };
  }
  
  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    await userService.register({ email, password });
    // No need to set cookie here, we redirect to login page
  } catch (error) {
    console.error("Registration Failed:", error);
    return { error: "Registration failed. Email might be in use." };
  }

  redirect("/login");
}


export async function createTransactionAction(
  prevState: ActionState, 
  formData: FormData
): Promise<ActionState> {
  // 1. Extract Data
  const amountStr = formData.get("amount") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("category_id") as string;
  const type = formData.get("type") as "income" | "expense";
  const date = formData.get("date") as string;

  // 2. Basic Validation
  if (!amountStr || !description || !categoryId || !type || !date) {
    return { error: "All fields are required." };
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    return { error: "Amount must be a positive number." };
  }

  try {
    // 3. Call Backend
    await transactionService.create({
      amount,
      description,
      category_id: categoryId,
      type,
      date: new Date(date).toISOString(), // Ensure ISO format
    });

    // 4. Success: Revalidate & Redirect
    // This updates the dashboard stats AND the transaction list immediately
    revalidatePath("/dashboard");
    
   
  } catch (err: any) {
    console.error("Create Transaction Error:", err);
    return { error: err.response?.data?.error || "Failed to create transaction." };
  }

  // Redirect must happen outside try/catch
  redirect("/dashboard");
}

export async function createCategoryAction(prevState: any, formData: FormData) {
  "use server";
  
  const name = formData.get("name") as string;
  const type = formData.get("type") as "income" | "expense";

  if (!name || !type) {
    return { error: "Name and Type are required" };
  }

  try {
    await categoryService.create({ name, type });
    revalidatePath("/dashboard");
    // Note: If inside an intercepted route, .back() is usually handled by the UI or router context,
    // but a redirect here ensures the modal closes and data refreshes.
    redirect("/dashboard"); 
  } catch (error: any) {
    return { error: error.message || "Failed to create category" };
  }
}