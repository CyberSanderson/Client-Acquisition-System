import { Button } from "@/components/ui/button"

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: "$19/mo",
    description: "Perfect for solo pros who are ready to scale.",
    features: [
      "Up to 500 clients",
      "Basic lead capture",
      "Offer management",
      "Automated reminders",
      "Email support",
    ],
    buttonLabel: "Get Started",
    buttonHref: "/signup",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49/mo",
    description: "Best for growing service providers who want automation.",
    features: [
      "Unlimited clients",
      "Advanced client pipelines",
      "Automated follow-up sequences",
      "Smart offer delivery",
      "Priority support",
    ],
    highlighted: true,
    buttonLabel: "Upgrade Now",
    buttonHref: "/signup",
  },
  {
    id: "agency",
    name: "Agency",
    price: "$99/mo",
    description: "For agencies managing multiple brands or team members.",
    features: [
      "Team accounts",
      "Multi-brand / multi-client dashboard",
      "White-label branding",
      "Unlimited automations",
      "Premium support",
    ],
    buttonLabel: "Book Demo",
    buttonHref: "/demo",
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        Choose Your Plan
      </h1>
      <p className="text-center text-muted-foreground mb-12">
        Whether you're just starting or scaling your service business, we've got a plan for you.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`border rounded-xl p-6 shadow-sm ${
              tier.highlighted ? "border-primary shadow-lg" : ""
            }`}
          >
            <h2 className="text-2xl font-bold">{tier.name}</h2>
            <p className="text-3xl font-semibold my-4">{tier.price}</p>
            <p className="text-muted-foreground mb-6">{tier.description}</p>

            <ul className="space-y-2 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">•</span> {feature}
                </li>
              ))}
            </ul>

            <Button className="w-full" asChild>
              <a href={tier.buttonHref}>{tier.buttonLabel}</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

