
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid work email.' }),
  company: z.string().min(2, { message: 'Company name is required.' }),
  phone: z.string().optional(),
  budget: z.string().min(1, { message: 'Please select a budget.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500),
  honeypot: z.string().max(0, { message: 'Spam detected.' }), // Honeypot field for spam prevention
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const heroFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid work email.' }),
  company: z.string().min(2, { message: 'Company name is required.' }),
  budget: z.string().min(1, { message: 'Please select a budget.' }),
  honeypot: z.string().max(0, { message: 'Spam detected.' }),
});

export type HeroFormValues = z.infer<typeof heroFormSchema>;
