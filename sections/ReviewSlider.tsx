import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Animated } from "../components/Animated";
import { Logo } from "../components/Logo";

type Review = {
  author: string;
  rating: number;
  time: string;
  text: string;
  profileUrl: string;
  source: string;
};

type ReviewSliderProps = {
  title?: string;
  autoPlayMs?: number;
  dataPath?: string;
};

const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30.44);
  const years = Math.round(days / 365);

  if (months > 18) return `${years} years ago`;
  if (months >= 2) return `${months} months ago`;
  if (days >= 2) return `${days} days ago`;
  if (hours >= 2) return `${hours} hours ago`;
  if (minutes >= 2) return `${minutes} minutes ago`;
  return "Just now";
};

const StarRating: React.FC<{ rating: number; className?: string }> = ({
  rating,
  className = "h-5 w-5",
}) => (
  <div
    className="flex items-center"
    aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${className} ${
          i < Math.round(rating)
            ? "text-yellow-400 fill-current"
            : "text-slate-300"
        }`}
      />
    ))}
  </div>
);

const avatarColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-pink-500",
];

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const formattedDate = timeAgo(review.time);
  const authorInitial = review.author.charAt(0).toUpperCase();
  const colorIndex = (review.author.charCodeAt(0) || 0) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <div className="bg-white text-neutral-900 rounded-lg p-6 h-full flex flex-col border border-slate-200 shadow-md">
      <div className="flex items-start gap-4 relative">
        <div
          className={`flex-shrink-0 h-10 w-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-lg`}
        >
          {authorInitial}
        </div>
        <div className="flex-grow">
          <p className="font-semibold text-neutral-800">{review.author}</p>
          <p className="text-sm text-slate-500">{formattedDate}</p>
        </div>
        <img
          src="/images/Logo/google.png"
          alt="Google logo"
          className="h-5 w-5 absolute top-0 right-0"
        />
      </div>

      <div className="my-2">
        <StarRating rating={review.rating} className="h-4 w-4" />
      </div>

      <p
        className="text-slate-700 text-sm leading-relaxed overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
        }}
      >
        {review.text}
      </p>
    </div>
  );
};

// Sample reviews data
const sampleReviews: Review[] = [
  {
    author: "John Doe",
    rating: 5,
    time: new Date().toISOString(),
    text: "TQM Digital transformed our online presence completely. Our website is now faster and more engaging than ever before!",
    profileUrl: "https://business.google.com",
    source: "Google"
  },
  {
    author: "Sarah Johnson",
    rating: 5,
    time: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    text: "The team's attention to detail and understanding of our business needs was impressive. Highly recommended!",
    profileUrl: "https://business.google.com",
    source: "Google"
  },
  {
    author: "Michael Chen",
    rating: 5,
    time: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    text: "Our conversion rates have increased significantly since working with TQM Digital. Their expertise in web design is unmatched.",
    profileUrl: "https://business.google.com",
    source: "Google"
  },
  {
    author: "Emily Rodriguez",
    rating: 5,
    time: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    text: "Professional, responsive, and delivered beyond our expectations. Will definitely work with them again!",
    profileUrl: "https://business.google.com",
    source: "Google"
  }
];

const ReviewSlider: React.FC<ReviewSliderProps> = ({
  title = "What Our Clients Say",
  autoPlayMs = 5000,
}) => {
  const [reviews] = useState<Review[]>(sampleReviews);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [direction, setDirection] = useState(0);

  const autoplayRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setPage((prevPage) => {
        const newPage = prevPage + newDirection;
        if (newPage < 0) return pageCount - 1;
        if (newPage >= pageCount) return 0;
        return newPage;
      });
    },
    [pageCount]
  );

  const startAutoplay = useCallback(() => {
    if (shouldReduceMotion) return;
    autoplayRef.current = window.setInterval(() => paginate(1), autoPlayMs);
  }, [autoPlayMs, paginate, shouldReduceMotion]);

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [reviews.length, startAutoplay]);

  if (reviews.length === 0) return null;

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
      : 0;
  const currentReviews = reviews.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section
      className="py-24 md:py-28 relative overflow-hidden"
      style={{ background: "var(--grad-2)" }}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Animated className="text-center">
          <h2 className="text-3xl font-bold font-heading text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
            Real feedback from businesses we've helped succeed.
          </p>
        </Animated>

        <Animated delay={0.2}>
          <div
            className="mt-16 bg-neutral-900/70 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg grid lg:grid-cols-12 gap-8 items-center"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            {/* Left Column: Summary */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <Logo variant="light" className="h-8 w-auto mb-4" />
              <p className="text-lg font-semibold text-white">TQM Digital</p>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-4xl font-bold text-white">
                  {averageRating.toFixed(1)}
                </p>
                <div className="flex flex-col">
                  <StarRating rating={averageRating} />
                  <p className="text-sm text-slate-400">Based on 94 reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                <img
                  src="/images/Logo/google.png"
                  alt="Google logo"
                  className="h-4 w-4 opacity-80"
                />
                <span>Powered by Google</span>
              </div>
              <a
                href={reviews[0]?.profileUrl || "https://business.google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Review us on{" "}
                <img
                  src="/images/Logo/google.png"
                  alt=""
                  className="h-5 w-5"
                />
              </a>
            </div>

            {/* Right Column: Slider */}
            <div className="lg:col-span-8 relative">
              <div className="relative h-64 overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className={`absolute w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}
                  >
                    {currentReviews.map((review) => (
                      <ReviewCard
                        key={review.author + review.time}
                        review={review}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={() => paginate(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300 hidden xl:block focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label="Previous reviews"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300 hidden xl:block focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label="Next reviews"
              >
                <ArrowRight className="h-6 w-6" />
              </button>

              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 ${
                      page === index
                        ? "bg-white"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to review page ${index + 1}`}
                    aria-current={page === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ReviewSlider;
