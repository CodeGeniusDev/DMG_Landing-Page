import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trackEvent } from '../lib/analytics';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { Animated } from '../components/Animated';
import { heroFormSchema, HeroFormValues } from '../lib/formSchema';
import { motion, Variants } from 'framer-motion';


const HeroForm: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<HeroFormValues>({
        resolver: zodResolver(heroFormSchema),
        defaultValues: { budget: "", name: "", email: "", company: "", honeypot: "" }
    });

    const onSubmit: SubmitHandler<HeroFormValues> = async (data) => {
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
            trackEvent('form_submit', { event_category: 'Lead Generation', event_label: 'Free Audit Request Hero' });
            reset();
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {isSubmitted ? (
                <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-16 w-16 text-accents-green" />
                    <h3 className="mt-4 text-2xl font-bold font-heading text-white">Thank You!</h3>
                    <p className="mt-2 text-gray-300">We've received your request and will be in touch within one business day.</p>
                </div>
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-white text-center font-heading">Get Your Free Growth Plan</h3>
                    <p className="text-sm text-gray-300 text-center mt-1">No obligation, just expert insights.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <input type="text" {...register('honeypot')} className="hidden" />
                        <div>
                            <label htmlFor="name-hero" className="sr-only">Name</label>
                            <input type="text" {...register('name')} id="name-hero" placeholder="Name" className="block w-full rounded-md bg-white/10 border-white/20 text-white placeholder-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm p-3" />
                            {errors.name && <p className="mt-1 text-sm text-red-400">{String(errors.name.message)}</p>}
                        </div>
                        <div>
                            <label htmlFor="email-hero" className="sr-only">Work Email</label>
                            <input type="email" {...register('email')} id="email-hero" placeholder="Work Email" className="block w-full rounded-md bg-white/10 border-white/20 text-white placeholder-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm p-3" />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{String(errors.email.message)}</p>}
                        </div>
                        <div>
                            <label htmlFor="company-hero" className="sr-only">Company</label>
                            <input type="text" {...register('company')} id="company-hero" placeholder="Company Name" className="block w-full rounded-md bg-white/10 border-white/20 text-white placeholder-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm p-3" />
                            {errors.company && <p className="mt-1 text-sm text-red-400">{String(errors.company.message)}</p>}
                        </div>
                        <div>
                            <label htmlFor="budget-hero" className="sr-only">Monthly Budget</label>
                            <div className="relative">
                                <select {...register('budget')} id="budget-hero" className="block w-full appearance-none rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-white focus:ring-white sm:text-sm p-3 pr-8">
                                    <option value="" disabled className="text-neutral-900">Select Monthly Budget...</option>
                                    <option value="<5k" className="text-neutral-900">&lt; $5,000</option>
                                    <option value="5k-10k" className="text-neutral-900">$5,000 - $10,000</option>
                                    <option value="10k-25k" className="text-neutral-900">$10,000 - $25,000</option>
                                    <option value="25k+" className="text-neutral-900">$25,000+</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 h-5 w-5 text-gray-300" />
                            </div>
                            {errors.budget && <p className="mt-1 text-sm text-red-400">{String(errors.budget.message)}</p>}
                        </div>
                        {submitError && <p className="text-sm text-red-400 text-center">{submitError}</p>}
                        <div>
                            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-red-300 transition-all">
                                {isSubmitting ? 'Submitting...' : 'Get My Free Audit'}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};


const Hero: React.FC = () => {
    const headlineText = "Scale Revenue With Digital Precision";

    const sentenceVariants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          delay: 0.1,
          staggerChildren: 0.08,
        },
      },
    };

    const wordVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
            ease: "easeOut",
            duration: 0.5,
        }
      },
    };

  const handleGhostClick = () => {
     const element = document.querySelector("#website-outcomes");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
  }

  return (
    <section 
        className="relative text-white overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'linear-gradient(rgba(11, 15, 25, 0.95), rgba(11, 15, 25, 0.95)), url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)' }}
        aria-label="A marketing team collaborating in a modern office, symbolizing digital precision"
    >
        <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-brand-red/10 rounded-full blur-3xl"
            aria-hidden="true"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        />
        
      <div className="relative max-w-container mx-auto px-6 md:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column: Content */}
            <div className="text-center md:text-left">
                <motion.h1
                    className="text-4xl font-bold font-heading sm:text-5xl lg:text-6xl !leading-tight"
                    variants={sentenceVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {headlineText.split(" ").map((word, index) => (
                        <motion.span
                            key={word + "-" + index}
                            variants={wordVariants}
                            className="inline-block"
                        >
                            {word}&nbsp;
                        </motion.span>
                    ))}
                </motion.h1>

                <Animated delay={0.6}>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-lg mx-auto md:mx-0">
                       High-performance website design and data-driven marketing to help ambitious businesses scale.
                    </p>
                </Animated>
                
                <Animated delay={0.8} className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
                     <button onClick={handleGhostClick} className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition">
                        View Web Portfolio
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </Animated>
            </div>

            {/* Right Column: Form */}
            <Animated delay={0.4} className="flex justify-center items-center h-full">
                <HeroForm />
            </Animated>
        </div>
      </div>
    </section>
  );
};

export default Hero;