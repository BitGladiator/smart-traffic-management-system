import React, { useState } from "react";
import {
  Check,
  X,
  Zap,
  Shield,
  Crown,
  Star,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'annual'
  const navigate = useNavigate();
  const { user, checkSubscription } = useAuth();

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);
  const plans = [
    {
      id: "starter",
      name: "Starter",
      icon: <Zap className="h-8 w-8" />,
      description: "Perfect for small municipalities and pilot projects",
      monthlyPrice: 60,
      annualPrice: 750,
      color: "blue",
      popular: false,
      features: [
        { text: "Up to 10 intersections", included: true },
        { text: "Real-time traffic monitoring", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "Email support (48h response)", included: true },
        { text: "Mobile app access", included: true },
        { text: "API access (1000 calls/day)", included: true },
        { text: "Historical data (30 days)", included: true },
        { text: "AI optimization", included: false },
        { text: "Predictive analytics", included: false },
        { text: "Custom integrations", included: false },
        { text: "Dedicated account manager", included: false },
        { text: "On-site training", included: false },
      ],
    },
    {
      id: "professional",
      name: "Professional",
      icon: <Shield className="h-8 w-8" />,
      description: "Ideal for growing cities with medium traffic volume",
      monthlyPrice: 250,
      annualPrice: 3000,
      color: "emerald",
      popular: true,
      features: [
        { text: "Up to 50 intersections", included: true },
        { text: "Real-time traffic monitoring", included: true },
        { text: "Advanced analytics dashboard", included: true },
        { text: "Priority support (24h response)", included: true },
        { text: "Mobile app access", included: true },
        { text: "API access (10,000 calls/day)", included: true },
        { text: "Historical data (1 year)", included: true },
        { text: "AI optimization", included: true },
        { text: "Predictive analytics", included: true },
        { text: "Custom integrations (2 included)", included: true },
        { text: "Dedicated account manager", included: false },
        { text: "On-site training", included: false },
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: <Crown className="h-8 w-8" />,
      description: "Complete solution for large metropolitan areas",
      monthlyPrice: 500,
      annualPrice: 6000,
      color: "violet",
      popular: false,
      features: [
        { text: "Unlimited intersections", included: true },
        { text: "Real-time traffic monitoring", included: true },
        { text: "Enterprise analytics suite", included: true },
        { text: "24/7 phone & email support", included: true },
        { text: "Mobile app access", included: true },
        { text: "Unlimited API calls", included: true },
        { text: "Unlimited historical data", included: true },
        { text: "Advanced AI optimization", included: true },
        { text: "Predictive analytics", included: true },
        { text: "Unlimited custom integrations", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "On-site training & setup", included: true },
      ],
    },
  ];

  const getPrice = (plan) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  };

  const getSavingsPercentage = () => {
    return 17; // Approximately 17% savings on annual billing
  };

  const handleSelectPlan = (plan) => {
    if (user?.hasActiveSubscription) {
      alert(
        "You already have an active subscription. Please cancel your current plan before selecting a new one."
      );
      return;
    }
    if (!user) {
      navigate("/signup");
    } else {
      navigate("/checkout", {
        state: {
          plan: plan.id,
          planName: plan.name,
          price: getPrice(plan),
          billingCycle,
        },
      });
    }
  };

  const getColorClasses = (color, isPopular) => {
    const colors = {
      blue: {
        gradient: "from-blue-50 to-blue-100",
        border: "border-blue-200",
        text: "text-blue-600",
        bg: "bg-blue-600",
        bgHover: "hover:bg-blue-700",
        icon: "bg-blue-100 text-blue-600",
      },
      emerald: {
        gradient: "from-emerald-50 to-emerald-100",
        border: "border-emerald-200",
        text: "text-emerald-600",
        bg: "bg-emerald-600",
        bgHover: "hover:bg-emerald-700",
        icon: "bg-emerald-100 text-emerald-600",
      },
      violet: {
        gradient: "from-violet-50 to-violet-100",
        border: "border-violet-200",
        text: "text-violet-600",
        bg: "bg-violet-600",
        bgHover: "hover:bg-violet-700",
        icon: "bg-violet-100 text-violet-600",
      },
    };
    return colors[color];
  };

  const faqs = [
    {
      question: "Can I change plans later?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and wire transfers for annual plans. Enterprise clients can also use purchase orders.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! All plans come with a 14-day free trial. No credit card required to start. You can test all features before committing.",
    },
    {
      question: "What happens if I exceed my intersection limit?",
      answer:
        "We'll notify you when you're approaching your limit. You can easily upgrade to the next tier or purchase additional intersection packs.",
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer:
        "Absolutely! For large deployments, we can create custom packages with tailored features, pricing, and dedicated support. Contact our sales team.",
    },
    {
      question: "What's included in the setup process?",
      answer:
        "All plans include initial setup assistance. Professional and Enterprise plans include comprehensive onboarding, data migration, and staff training.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-emerald-500/5"></div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full mb-6 border border-blue-200">
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                SIMPLE, TRANSPARENT PRICING
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                Perfect Plan
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Scale your traffic management from a single intersection to an
              entire city. Start free, upgrade as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white border-2 border-gray-200 rounded-full p-1 shadow-sm">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full font-medium transition-all relative ${
                  billingCycle === "annual"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Annual
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                  Save {getSavingsPercentage()}%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {user?.hasActiveSubscription && (
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-emerald-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  You're on the {user.subscriptionPlan} Plan
                </h3>
                <p className="text-gray-700 mb-4">
                  Your subscription is currently{" "}
                  <span className="font-semibold text-emerald-600">
                    {user.subscriptionStatus}
                  </span>
                  . To change plans, please cancel your current subscription
                  first.
                </p>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const colors = getColorClasses(plan.color, plan.popular);
              const price = getPrice(plan);

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
                    plan.popular
                      ? "border-emerald-500 shadow-xl scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <div
                        className={`inline-flex p-4 bg-gradient-to-br ${colors.gradient} rounded-xl mb-4`}
                      >
                        <div className={colors.text}>{plan.icon}</div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8 pb-8 border-b border-gray-200">
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-5xl font-bold text-gray-900">
                          ${price.toLocaleString()}
                        </span>
                        <span className="text-gray-600 ml-2">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      {billingCycle === "annual" && (
                        <p className="text-sm text-emerald-600 font-medium">
                          ${(price / 12).toFixed(0)}/month billed annually
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        14-day free trial included
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              feature.included
                                ? "text-gray-700"
                                : "text-gray-400"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group ${
                        plan.popular
                          ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:from-emerald-700 hover:to-cyan-700 shadow-lg hover:shadow-xl"
                          : `${colors.bg} ${colors.bgHover} text-white`
                      }`}
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Enterprise Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
              <Crown className="h-5 w-5 text-violet-600" />
              <span className="text-gray-700">
                Need more than 100 intersections?
                <a
                  href="/contact"
                  className="ml-2 text-violet-600 font-semibold hover:text-violet-700"
                >
                  Contact us for custom enterprise pricing →
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-600">
              See what's included in each plan
            </p>
          </div>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-6 text-left font-semibold text-gray-900">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className="p-6 text-center font-semibold text-gray-900"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans[0].features.map((_, featureIndex) => (
                  <tr
                    key={featureIndex}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-6 text-gray-700">
                      {plans[0].features[featureIndex].text}
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="p-6 text-center">
                        {plan.features[featureIndex].included ? (
                          <Check className="h-6 w-6 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="h-6 w-6 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Our Sales Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your City's Traffic?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start your free 14-day trial today. No credit card required.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
