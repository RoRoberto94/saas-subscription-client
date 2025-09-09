import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pricing.module.css";
import apiClient from "../../lib/axios";
import { useAuth } from "../../hooks/useAuth";

interface Plan {
  name: string;
  price: number;
  priceId: string;
  features: string[];
}

const PricingPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiClient.get("/billing/plans");
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setProcessingPlanId(priceId);
    try {
      const response = await apiClient.post<{ url: string }>(
        "/billing/create-checkout-session",
        {
          priceId,
          clientUrl: window.location.origin,
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setProcessingPlanId(null);
    }
  };

  return (
    <div className={styles.pricingContainer}>
      {plans.map((plan) => (
        <div key={plan.priceId} className={styles.planCard}>
          <h2 className={styles.planName}>{plan.name}</h2>
          <p className={styles.planPrice}>
            €{plan.price}
            <span className={styles.pricePeriod}> / month</span>
          </p>
          <ul className={styles.featureList}>
            {plan.features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                ✓ {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleSubscribe(plan.priceId)}
            className={styles.subscribeButton}
            disabled={processingPlanId !== null}
          >
            {processingPlanId === plan.priceId ? "Processing..." : "Subscribe"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingPage;
