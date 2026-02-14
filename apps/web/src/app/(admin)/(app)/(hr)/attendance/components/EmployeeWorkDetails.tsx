import { LuClock, LuOctagonX, LuRefreshCw } from "react-icons/lu";
import { IconType } from "react-icons";

type ColorVariant = "info" | "danger" | "warning";

type WorkDetail = {
  id: number;
  value: number;
  label: string;
  icon: IconType;
  color: ColorVariant;
};

const workDetails: WorkDetail[] = [
  {
    id: 1,
    value: 187,
    label: "Approved Hours",
    icon: LuClock,
    color: "info",
  },
  {
    id: 2,
    value: 19,
    label: "Rejected Hours",
    icon: LuOctagonX,
    color: "danger",
  },
  {
    id: 3,
    value: 32,
    label: "Pending Hours",
    icon: LuRefreshCw,
    color: "warning",
  },
];

const colorClasses: Record<ColorVariant, string> = {
  info: "text-info bg-info/10",
  danger: "text-danger bg-danger/10",
  warning: "text-warning bg-warning/10",
};

export default function EmployeeWorkDetails(): JSX.Element {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-5">
      {workDetails.map(({ id, value, label, icon: Icon, color }) => (
        <div className="card" key={id}>
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className={`btn size-12 ${colorClasses[color]}`}>
                <Icon className="size-6" />
              </div>
              <div>
                <h5 className="mb-1 text-base text-heading font-semibold">
                  <span className="counter-value">{value}</span>
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
