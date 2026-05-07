import { moneyFormatter } from "../../utils/analytics";

export const categoryColors = {
  Alimentação: "#FF4D6D",
  Lazer: "#8B5CF6",
  Transporte: "#14B8A6",
  Saúde: "#38BDF8",
  Moradia: "#F97316",
  Vestuário: "#EC4899",
  Outros: "#F59E0B"
};

export const fallbackColor = "#64748B";

export { moneyFormatter };

export const getCategoryColor = category =>
  categoryColors[category] || fallbackColor;
