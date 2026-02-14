import {
  LuCheckCheck,
  LuCrown,
  LuGoal,
  LuGraduationCap,
  LuLuggage,
  LuX,
} from "react-icons/lu";
import { IconType } from "react-icons";

type Feature = {
  name: string;
  included: boolean;
};

type ColorVariant = "success" | "secondary" | "primary" | "danger";

type PricingPlan = {
  id: number;
  title: string;
  description: string;
  price: string;
  period: string;
  icon: IconType;
  color: ColorVariant;
  buttonText: string;
  highlight?: string;
  features: Feature[];
};

const colorClasses: Record<ColorVariant, string> = {
  success: "text-success",
  secondary: "text-secondary",
  primary: "text-primary",
  danger: "text-danger",
};

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    title: "Lite",
    description: "Perfect plan for Lite",
    price: "9.99",
    period: "/Monthly",
    icon: LuGoal,
    color: "success",
    buttonText: "Purchase Now",
    features: [
      { name: "<b>3</b> Projects", included: true },
      { name: "<b>299</b> Customers", included: true },
      { name: "Scalable Bandwidth", included: true },
      { name: "No Team Account", included: true },
      { name: "In app messaging", included: false },
      { name: "5 FTP Login", included: false },
      { name: "Detailed Analytics", included: false },
      { name: "Custom Domain", included: false },
      { name: "Smart Workflow", included: false },
      { name: "IQ test", included: false },
    ],
  },
  {
    id: 2,
    title: "Professional",
    description: "For users who want to do more.",
    price: "29.99",
    period: "/Monthly",
    icon: LuGraduationCap,
    color: "secondary",
    buttonText: "Purchase Now",
    features: [
      { name: "<b>3</b> Projects", included: true },
      { name: "<b>299</b> Customers", included: true },
      { name: "Scalable Bandwidth", included: true },
      { name: "<b>3</b> No Team Account", included: true },
      { name: "In app messaging", included: true },
      { name: "5 FTP Login", included: false },
      { name: "Detailed Analytics", included: false },
      { name: "Custom Domain", included: false },
      { name: "Smart Workflow", included: false },
      { name: "IQ test", included: false },
    ],
  },
  {
    id: 3,
    title: "Enterprise",
    description: "Run your company on your teams",
    price: "39.99",
    period: "/Monthly",
    icon: LuCrown,
    color: "primary",
    buttonText: "Purchase Now",
    highlight: "25% Sale",
    features: [
      { name: "<b>3</b> Projects", included: true },
      { name: "<b>299</b> Customers", included: true },
      { name: "Scalable Bandwidth", included: true },
      { name: "<b>3</b> No Team Account", included: true },
      { name: "In app messaging", included: true },
      { name: "5 FTP Login", included: true },
      { name: "Detailed Analytics", included: true },
      { name: "Custom Domain", included: false },
      { name: "Smart Workflow", included: false },
      { name: "IQ test", included: false },
    ],
  },
  {
    id: 4,
    title: "Unlimited",
    description: "Your entire team in one place",
    price: "49.99",
    period: "/Monthly",
    icon: LuLuggage,
    color: "danger",
    buttonText: "Purchase Now",
    features: [
      { name: "<b>3</b> Projects", included: true },
      { name: "<b>299</b> Customers", included: true },
      { name: "Scalable Bandwidth", included: true },
      { name: "<b>3</b> No Team Account", included: true },
      { name: "In app messaging", included: true },
      { name: "5 FTP Login", included: true },
      { name: "Detailed Analytics", included: true },
      { name: "Custom Domain", included: true },
      { name: "Smart Workflow", included: true },
      { name: "IQ test", included: true },
    ],
  },
];

export default function Pricing(): JSX.Element {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-6">
      {pricingPlans.map((plan: PricingPlan) => {
        const Icon = plan.icon;

        return (
          <div key={plan.id} className="card relative overflow-hidden">
            <div className="card-body">
              {plan.highlight && (
                <div className="size-16 absolute top-0 end-0">
                  <div className="absolute bg-primary text-center w-42.5 text-white py-1 transform rotate-45 top-6 -end-12 font-semibold">
                    {plan.highlight}
                  </div>
                </div>
              )}

              <h5 className="mb-2 flex items-center gap-1.5">
                <Icon
                  className={`${colorClasses[plan.color]} size-5`}
                />
                <span className="text-lg font-semibold text-default-800">
                  {plan.title}
                </span>
              </h5>

              <p className="mb-4 text-default-500">
                {plan.description}
              </p>

              <h1 className="mb-4 text-4xl text-default-800 font-normal">
                <span className="text-default-400">$</span>
                {plan.price}
                <small className="text-base text-default-500">
                  {plan.period}
                </small>
              </h1>

              <button
                type="button"
                className="btn border w-full border-dashed border-primary bg-transparent text-primary hover:bg-primary/20"
              >
                {plan.buttonText}
              </button>

              <ul className="mt-5 flex flex-col gap-3 text-sm">
                {plan.features.map((feature, index) => (
                  <li
                    key={`${plan.id}-${index}`}
                    className="flex items-center gap-2.5"
                  >
                    {feature.included ? (
                      <LuCheckCheck className="size-4 text-success" />
                    ) : (
                      <LuX className="size-4 text-danger" />
                    )}

                    {feature.included ? (
                      <span
                        className="text-default-900"
                        dangerouslySetInnerHTML={{
                          __html: feature.name,
                        }}
                      />
                    ) : (
                      <del className="text-default-500">
                        {feature.name}
                      </del>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
