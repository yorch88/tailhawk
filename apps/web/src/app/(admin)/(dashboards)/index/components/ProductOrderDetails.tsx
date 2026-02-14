import {
  LuPackage,
  LuPackageX,
  LuTruck,
  LuWallet,
} from "react-icons/lu";
import { IconType } from "react-icons";

type ColorVariant = "primary" | "info" | "success" | "danger";

type OrderStat = {
  id: number;
  icon: IconType;
  color: ColorVariant;
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
};

const stats: OrderStat[] = [
  {
    id: 1,
    icon: LuWallet,
    color: "primary",
    value: "236.18",
    prefix: "$",
    suffix: "k",
    label: "Total Revenue",
  },
  {
    id: 2,
    icon: LuPackage,
    color: "info",
    value: "13,461",
    label: "Total Orders",
  },
  {
    id: 3,
    icon: LuTruck,
    color: "success",
    value: "17,150",
    label: "Delivered",
  },
  {
    id: 4,
    icon: LuPackageX,
    color: "danger",
    value: "3,519",
    label: "Cancelled",
  },
];

const colorClasses: Record<ColorVariant, { icon: string; bg: string }> = {
  primary: { icon: "text-primary", bg: "bg-primary/10" },
  info: { icon: "text-info", bg: "bg-info/10" },
  success: { icon: "text-success", bg: "bg-success/10" },
  danger: { icon: "text-danger", bg: "bg-danger/10" },
};

export default function ProductOrderDetails(): JSX.Element {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
      {stats.map(
        ({ id, icon: Icon, color, value, prefix, suffix, label }) => (
          <div className="card" key={id}>
            <div className="card-body">
              <div
                className={`flex items-center justify-center mx-auto rounded-full size-14 ${colorClasses[color].bg}`}
              >
                <Icon
                  className={`size-6 ${colorClasses[color].icon}`}
                />
              </div>

              <h5 className="mt-4 text-center mb-2 text-default-800 font-semibold text-lg">
                {prefix}
                <span data-target={value}>{value}</span>
                {suffix}
              </h5>

              <p className="text-center text-sm text-default-500">
                {label}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
