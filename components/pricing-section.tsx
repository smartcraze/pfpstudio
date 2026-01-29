'use client';

import { motion } from 'framer-motion';
import { usePayment } from '@/hooks/use-payment';
import { Button } from '@/components/ui/button';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Check, Loader2, Tag, X, TicketPercent } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { PRICING_PLANS, COUPONS } from '@/lib/payment-config';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface PricingPlan {
    id: string;
    name: string;
    price: string;
    rawPrice: number;
    credits: number;
    features: string[];
    popular?: boolean;
}

const PLANS: PricingPlan[] = Object.values(PRICING_PLANS).map(plan => ({
    id: plan.id,
    name: plan.name,
    price: `₹${plan.price}`,
    rawPrice: plan.price,
    credits: plan.credits,
    features: [...plan.features],
    popular: 'popular' in plan ? plan.popular : false
}));

export function PricingSection() {
    const { buyCredits, loading } = usePayment();
    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const activeCoupon = useMemo(() => {
        if (!appliedCoupon || !COUPONS[appliedCoupon as keyof typeof COUPONS]) return null;
        return COUPONS[appliedCoupon as keyof typeof COUPONS];
    }, [appliedCoupon]);

    const handleApplyCoupon = async () => {
        if (!couponInput.trim()) return;
        setIsValidating(true);
        setValidationError(null);

        try {
            const res = await fetch('/api/user/validate-coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ couponCode: couponInput.trim() }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setAppliedCoupon(couponInput.trim().toUpperCase());
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                toast.success("Coupon Applied!", {
                    description: `${data.discount}% discount has been activated.`,
                    icon: <TicketPercent className="w-4 h-4" />,
                });
            } else {
                setValidationError(data.error || "Invalid coupon");
                toast.error(data.error || "Failed to apply coupon");
                setAppliedCoupon(null);
            }
        } catch (err) {
            setValidationError("Something went wrong");
            toast.error("Failed to validate coupon");
        } finally {
            setIsValidating(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponInput('');
        setValidationError(null);
    };

    return (
        <section id="pricing" className="py-24 relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-secondary/30 transform origin-top-left -z-10 h-full w-full -skew-y-3" />
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none">
                <div className="bg-primary w-96 h-96 rounded-full" />
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground"
                    >
                        Simple, Transparent Pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Choose the perfect plan for your needs. Consumable credits that never expire.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-col items-center gap-2 max-w-sm mx-auto mt-6"
                    >
                        {activeCoupon ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-full relative overflow-hidden bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center justify-between group"
                            >
                                <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <TicketPercent className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm text-primary flex items-center gap-1">
                                            {appliedCoupon}
                                            <Check className="h-3 w-3" />
                                        </p>
                                        <p className="text-xs text-muted-foreground">{activeCoupon.value}% Savings Applied</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleRemoveCoupon}
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 relative z-10"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="w-full space-y-2">
                                <div className="flex gap-2 relative w-full">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Coupon code"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                            className={`pl-9 bg-background border-input focus-visible:ring-primary/20 ${validationError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                        />
                                    </div>
                                    <Button onClick={handleApplyCoupon} disabled={isValidating || !couponInput.trim()} variant="secondary">
                                        {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                                    </Button>
                                </div>
                                {validationError && (
                                    <p className="text-xs text-destructive text-center font-medium animate-in fade-in slide-in-from-top-1">{validationError}</p>
                                )}
                                <div className="text-center">
                                    <p className="text-xs text-muted-foreground">Available: <span className="font-mono font-medium text-foreground bg-secondary px-1 py-0.5 rounded cursor-pointer hover:bg-secondary/80" onClick={() => setCouponInput('WELCOME50')}>WELCOME50</span></p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (index + 2) }}
                        >
                            {plan.popular ? (
                                <BackgroundGradient className="rounded-[22px] h-full p-1 bg-card">
                                    <div className="h-full rounded-[20px] p-6 sm:p-8 bg-card flex flex-col relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-xl text-xs font-bold text-primary-foreground">
                                            POPULAR
                                        </div>
                                        <PlanContent plan={plan} buyCredits={buyCredits} loading={loading} couponCode={appliedCoupon || ''} />
                                    </div>
                                </BackgroundGradient>
                            ) : (
                                <div className="h-full rounded-[22px] p-6 sm:p-8 bg-card border border-border flex flex-col hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                                    <PlanContent plan={plan} buyCredits={buyCredits} loading={loading} couponCode={appliedCoupon || ''} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PlanContent({ plan, buyCredits, loading, couponCode }: { plan: PricingPlan, buyCredits: (id: string, code?: string) => void, loading: boolean, couponCode: string }) {
    const discountedPrice = useMemo(() => {
        if (!couponCode || !COUPONS[couponCode as keyof typeof COUPONS]) {
            return null;
        }
        const coupon = COUPONS[couponCode as keyof typeof COUPONS];
        if (coupon.type === 'percentage') {
            return Math.round(plan.rawPrice * (1 - coupon.value / 100));
        }
        return null;
    }, [plan.rawPrice, couponCode]);

    return (
        <>
            <div className="mb-8">
                <h3 className="text-xl font-medium text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-foreground">
                    {discountedPrice !== null ? (
                        <>
                            <span className="text-4xl font-bold tracking-tight text-primary">₹{discountedPrice}</span>
                            <span className="ml-2 text-xl font-medium text-muted-foreground line-through decoration-destructive decoration-2">
                                {plan.price}
                            </span>
                        </>
                    ) : (
                        <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    )}
                    <span className="ml-1 text-xl font-medium text-muted-foreground">/once</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    {plan.credits} Credits included
                </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                onClick={() => buyCredits(plan.id, couponCode)}
                disabled={loading}
                variant={plan.popular ? "default" : "secondary"}
                className="w-full"
                size="lg"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Get Started
            </Button>
        </>
    );
}
