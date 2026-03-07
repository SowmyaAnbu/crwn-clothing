import { loadStripe } from "@stripe/stripe-js";
import.meta.env.VITE_STRIPE_PUBLISHABLE

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
