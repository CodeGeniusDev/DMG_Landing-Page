import React, { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { contactFormSchema, ContactFormValues } from '../lib/formSchema';
import { trackEvent } from '../lib/analytics';
import { CheckCircle, ChevronDown, X } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const ContactModal: React.FC = () => {
    const { isModalOpen, closeModal } = useModal();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    
    const modalRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: { budget: "", name: "", email: "", company: "", message: "", honeypot: "" }
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
            setIsSubmitted(false);
            setSubmitError('');
            reset();
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen, closeModal, reset]);
    
    const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
        setIsSubmitting(true);
        setSubmitError('');
        const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE'; // Replace with your Formspree ID

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Something went wrong. Please try again.');
            setIsSubmitted(true);
            trackEvent('form_submit', { event_category: 'Lead Generation', event_label: 'Free Audit Request' });
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={closeModal}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative bg-neutral-900 w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl border border-white/10 m-4 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8">
                            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors" aria-label="Close dialog">
                                <X className="h-6 w-6" />
                            </button>
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <CheckCircle className="mx-auto h-16 w-16 text-accents-green" />
                                    <h3 className="mt-4 text-2xl font-bold font-heading text-white">Thank You!</h3>
                                    <p className="mt-2 text-slate-300">Your audit request has been received. We'll be in touch within one business day.</p>
                                    <button onClick={closeModal} className="mt-8 px-6 py-2 rounded-lg font-semibold bg-brand-red text-white hover:bg-red-700">Close</button>
                                </div>
                            ) : (
                                <>
                                <h3 className="text-2xl font-bold font-heading text-white">Get Your Free Marketing Audit</h3>
                                <p className="mt-2 text-sm text-slate-300">No obligation, just actionable insights.</p>
                                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-y-4">
                                    <input type="text" {...register('honeypot')} className="hidden" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name-modal" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                            <input type="text" {...register('name')} id="name-modal" className="block w-full rounded-md bg-white/5 border-white/20 text-white shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3" />
                                            {/* FIX: Cast error message to string to satisfy ReactNode type. */}
                                            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message as string}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email-modal" className="block text-sm font-medium text-slate-300 mb-1">Work Email</label>
                                            <input type="email" {...register('email')} id="email-modal" className="block w-full rounded-md bg-white/5 border-white/20 text-white shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3" />
                                            {/* FIX: Cast error message to string to satisfy ReactNode type. */}
                                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message as string}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="company-modal" className="block text-sm font-medium text-slate-300 mb-1">Company</label>
                                            <input type="text" {...register('company')} id="company-modal" className="block w-full rounded-md bg-white/5 border-white/20 text-white shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3" />
                                            {/* FIX: Cast error message to string to satisfy ReactNode type. */}
                                            {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company.message as string}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="phone-modal" className="block text-sm font-medium text-slate-300 mb-1">Phone <span className="text-slate-400">(Optional)</span></label>
                                            <input type="tel" {...register('phone')} id="phone-modal" className="block w-full rounded-md bg-white/5 border-white/20 text-white shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="budget-modal" className="block text-sm font-medium text-slate-300 mb-1">Monthly Budget</label>
                                        <div className="relative">
                                            <select {...register('budget')} id="budget-modal" className="block w-full appearance-none rounded-md bg-white/5 border-white/20 text-white shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3 pr-8">
                                                <option value="" disabled className="text-neutral-900">Select Monthly Budget...</option>
                                                <option value="<5k" className="text-neutral-900">&lt; $5,000</option>
                                                <option value="5k-10k" className="text-neutral-900">$5,000 - $10,000</option>
                                                <option value="10k-25k" className="text-neutral-900">$10,000 - $25,000</option>
                                                <option value="25k+" className="text-neutral-900">$25,000+</option>
                                            </select>
                                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        </div>
                                        {/* FIX: Cast error message to string to satisfy ReactNode type. */}
                                        {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget.message as string}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="message-modal" className="block text-sm font-medium text-slate-300 mb-1">Tell us about your goals</label>
                                        <textarea {...register('message')} id="message-modal" rows={4} className="block w-full rounded-md bg-white/5 border-white/20 text-white shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3"></textarea>
                                        {/* FIX: Cast error message to string to satisfy ReactNode type. */}
                                        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message as string}</p>}
                                    </div>
                                    {submitError && <p className="text-sm text-red-400 text-center">{submitError}</p>}
                                    <div>
                                        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-red-300 transition-all">
                                            {isSubmitting ? 'Submitting...' : 'Claim Your Free Audit'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-center text-slate-500">
                                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply. (Placeholder)
                                    </p>
                                </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
