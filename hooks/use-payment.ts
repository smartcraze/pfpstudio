import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function usePayment() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  const buyCredits = async (planId: string = 'starter', couponCode?: string) => {
    if (!session?.user) {
      toast.error('Please login to purchase credits');
      return;
    }

    setLoading(true);

    try {
      // 1. Create Order
      const res = await fetch('/api/razorpay/order', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, couponCode })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create order');

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'PfpStudio',
        description: `Purchase Credits`,
        order_id: data.id,
        handler: async function (response: any) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              toast.success('Credits added successfully!');
              // 4. Update Session to reflect new credits
              await update({ credits: verifyData.credits }); 
            } else {
              toast.error('Payment verification failed');
            }
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: session.user.name,
          email: session.user.email,
        },
        theme: {
          color: '#3b82f6',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { buyCredits, loading };
}
