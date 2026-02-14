import type { ReactNode } from "react";
import { LuSquareCheck } from "react-icons/lu";

type Feature = {
  label: ReactNode;
};

type Plan = {
  id: number;
  title: string;
  price: string;
  period: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
  features: Feature[];
};

const plans: Plan[] = [
  {
    id: 1,
    title: "Personal Plan",
    price: "29.99",
    period: "Per Month",
    bgColor: "bg-primary/10",
    textColor: "text-primary",
    buttonColor: "bg-blue-600 text-white",
    features: [
      { label: <><b>3</b> Projects</> },
      { label: <><b>299</b> Customers</> },
      { label: "Scalable Bandwidth" },
      { label: <><b>0</b> No Team Account</> },
      { label: <><b>3</b> Projects</> },
      { label: <><b>299</b> Customers</> },
    ],
  },
  {
    id: 2,
    title: "Enterprise Plan",
    price: "49.99",
    period: "Per Month",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-600",
    buttonColor: "bg-purple-600 text-white",
    features: [
      { label: <><b>3</b> Projects</> },
      { label: <><b>299</b> Customers</> },
      { label: "Scalable Bandwidth" },
      { label: <><b>0</b> No Team Account</> },
      { label: <><b>3</b> Projects</> },
      { label: <><b>299</b> Customers</> },
      { label: "Scalable Bandwidth" },
      { label: <><b>0</b> No Team Account</> },
    ],
  },
];

export default function HorizontalPricing(): JSX.Element {
  const renderColumns = (features: Feature[]): JSX.Element[] => {
    const midpoint = Math.ceil(features.length / 2);

    return [features.slice(0, midpoint), features.slice(midpoint)].map(
      (columnFeatures, colIndex) => (
        <div key={colIndex}>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {columnFeatures.map((feature, index) => (
              <li
                key={`${colIndex}-${index}`}
                className="flex items-center gap-2"
              >
                <LuSquareCheck className="size-4 text-success" />
                <span className="text-default-900">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )
    );
  };

  return (
    <>
      <h5 className="mt-2 mb-4 underline text-lg font-semibold text-default-700">
        Horizontal Pricing
      </h5>

      <div className="grid lg:grid-cols-2 gap-5">
        {plans.map((plan: Plan) => (
          <div key={plan.id} className="card">
            <div className="card-body">
              <h5 className="text-lg mb-2 font-semibold text-default-800">
                {plan.title}
              </h5>

              <div className="grid lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <p className="relative before:content-[''] before:absolute before:border-b before:border-default-200 before:bottom-2 before:start-0 before:end-0">
                    <span className="pe-2 bg-card relative text-default-500 text-sm">
                      Everything Includes
                    </span>
                  </p>

                  <div className="grid md:grid-cols-2 md:gap-5">
                    {renderColumns(plan.features)}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className={`p-5 rounded-lg ${plan.bgColor}`}>
                    <p className={`text-sm mb-4 ${plan.textColor}`}>
                      {plan.period}
                    </p>

                    <p className="text-2xl font-bold mb-4 text-default-800">
                      ${plan.price}
                    </p>

                    <button
                      type="button"
                      className={`py-1.5 px-4 w-full rounded-md ${plan.buttonColor}`}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
