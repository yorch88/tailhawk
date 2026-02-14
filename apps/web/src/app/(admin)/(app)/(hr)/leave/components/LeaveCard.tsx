import {
  LuCalendarCheck,
  LuCodepen,
  LuFileChartColumn,
  LuLoader,
} from "react-icons/lu";
import { IconType } from "react-icons";

type ColorVariant = "primary" | "success" | "secondary" | "warning";

type LeaveCardItem = {
  id: number;
  value: string;
  description: string;
  icon: IconType;
  color: ColorVariant;
};

const leaveData: LeaveCardItem[] = [
  {
    id: 1,
    value: "18/60",
    description: "Today/Presents Leave",
    icon: LuFileChartColumn,
    color: "primary",
  },
  {
    id: 2,
    value: "5",
    description: "Today Leaves",
    icon: LuCalendarCheck,
    color: "success",
  },
  {
    id: 3,
    value: "0",
    description: "Unplanned Leaves",
    icon: LuCodepen,
    color: "secondary",
  },
  {
    id: 4,
    value: "11",
    description: "Remaining Leave",
    icon: LuLoader,
    color: "warning",
  },
];

const colorClasses: Record<ColorVariant, string> = {
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  secondary: "text-secondary bg-secondary/10",
  warning: "text-warning bg-warning/10",
};

export default function LeaveCard(): JSX.Element {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
      {leaveData.map(({ id, value, description, icon: Icon, color }) => (
        <div key={id} className="card">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className={`btn size-12 ${colorClasses[color]}`}>
                <Icon className="size-6" />
              </div>
              <div>
                <h5 className="mb-1 text-base text-heading font-semibold">
                  {value}
                </h5>
                <p className="text-default-500">{description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
