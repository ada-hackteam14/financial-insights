import {
  AlertTriangle,
  CircleAlert,
  CheckCircle2,
  Info,
  Lightbulb,
  LucideIcon,
} from "lucide-react";
import { InsightType } from "../utils/analytics";

interface VariantConfig {
  bg: string;
  border: string;
  iconBg: string;
  text: string;
  title: string;
  icon: LucideIcon;
}

interface InsightCardProps {
  type: InsightType;
  message: string;
}

const variants: Record<InsightType, VariantConfig> = {
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100",
    text: "text-red-600",
    title: "Alerta",
    icon: AlertTriangle,
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100",
    text: "text-yellow-600",
    title: "Atenção",
    icon: CircleAlert,
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
    text: "text-green-600",
    title: "Sucesso",
    icon: CheckCircle2,
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    text: "text-blue-600",
    title: "Informação",
    icon: Info,
  },
  tip: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    text: "text-purple-600",
    title: "Dica",
    icon: Lightbulb,
  },
};

export default function InsightCard({
  type,
  message,
}: InsightCardProps): React.ReactElement | null {
  const current = variants[type];

  if (!current) return null;

  const Icon = current.icon;

  return (
    <div
      className={`
        ${current.bg}
        border
        ${current.border}
        rounded-3xl
        p-4
        sm:p-5
        flex
        gap-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-lg
        w-full
      `}
    >
      <div
        className={`
          ${current.iconBg}
          w-12
          h-12
          rounded-2xl
          flex
          items-center
          justify-center
          shrink-0
        `}
      >
        <Icon className={`w-6 h-6 ${current.text}`} />
      </div>

      <div>
        <p
          className={`
            text-sm
            uppercase
            tracking-widest
            font-semibold
            ${current.text}
          `}
        >
          {current.title}
        </p>

        <p className="text-gray-700 mt-1 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
