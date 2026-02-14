import {
  LuAnchor,
  LuCalendarDays,
  LuFileChartColumn,
  LuStethoscope,
} from "react-icons/lu";
import { IconType } from "react-icons";

type ColorVariant = "danger" | "secondary" | "success" | "info";

type LeaveType = {
  id: number;
  icon: IconType;
  count: number;
  label: string;
  color: ColorVariant;
};

const leaveData: LeaveType[] = [
  {
    id: 1,
    icon: LuFileChartColumn,
    count: 23,
    label: "Total Leave Balance",
    color: "danger",
  },
  {
    id: 2,
    icon: LuStethoscope,
    count: 4,
    label: "Medical Leave",
    color: "secondary",
  },
  {
    id: 3,
    icon: LuCalendarDays,
    count: 12,
    label: "Annual Leave",
    color: "success",
  },
  {
    id: 4,
    icon: LuAnchor,
    count: 11,
    label: "Remaining Leave",
    color: "info",
  },
];

const colorClasses: Record<ColorVariant, string> = {
  danger: "text-danger bg-danger/10",
  secondary: "text-secondary bg-secondary/10",
  success: "text-success bg-success/10",
  info: "text-info bg-info/10",
};

export default function LeaveCard(): JSX.Element {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
      {leaveData.map(({ id, icon: Icon, count, label, color }) => (
        <div key={id} className="card">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className={`btn size-12 flex items-center justify-center ${colorClasses[color]}`}
              >
                <Icon size={24} />
              </div>
              <div>
                <h5 className="mb-1 text-base text-heading font-semibold">
                  <span className="counter-value">{count}</span>
                </h5>
                <p className="text-default-500">{label}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
