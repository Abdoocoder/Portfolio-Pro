
'use server';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import type { Message } from '@/lib/types';

const FormSchema = z.object({
  name: z.string({required_error: 'Name is required.'}).min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string({required_error: 'Email is required.'}).email({ message: 'Please enter a valid email.' }),
  subject: z.string({required_error: 'Subject is required.'}).min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string({required_error: 'Message is required.'}).min(10, { message: 'Message must be at least 10 characters.' }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function submitContactForm(prevState: State, formData: FormData) : Promise<State> {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to send message. Please check the fields.',
      success: false,
    };
  }
  
  const { name, email, subject, message } = validatedFields.data;

  try {
    await addDoc(collection(db, 'messages'), {
      name,
      email,
      subject,
      message,
      createdAt: serverTimestamp(),
      handled: false,
    } as Omit<Message, 'id' | 'createdAt'> & { createdAt: any });

    return { message: 'Your message has been sent successfully!', success: true, errors: {} };
  } catch (e) {
    console.error('Error submitting contact form:', e);
    return {
      message: 'An error occurred while sending your message. Please try again later.',
      success: false,
    };
  }
}
