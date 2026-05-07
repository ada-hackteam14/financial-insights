export type InsightType = "danger" | "warning" | "success" | "info" | "tip";

export type User = {
  id: number;
  name: string;
  monthlyIncome: number;
};

export type Transaction = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
};

export type CategorySummary = {
  category: string;
  total: number;
  percentage: number;
};

export type TrendPoint = {
  label: string;
  total: number;
};

export type Insight = {
  type: InsightType;
  message: string;
};

export type FinancialDashboard = {
  balance: number;
  categories: CategorySummary[];
  dominantCategory: CategorySummary;
  insights: Insight[];
  possibleSavings: number;
  spentPercentage: number;
  totalSpent: number;
  trend: TrendPoint[];
};

const categoryNames: Record<string, string> = {
  "AlimentaÃ§Ã£o": "Alimentação",
  Alimentacao: "Alimentação",
  Alimentação: "Alimentação",
  "SaÃºde": "Saúde",
  Saude: "Saúde",
  Saúde: "Saúde",
  "VestuÃ¡rio": "Vestuário",
  Vestuario: "Vestuário",
  Vestuário: "Vestuário",
  Moradia: "Moradia",
  Transporte: "Transporte",
  Lazer: "Lazer"
};

export const normalizeCategory = (category: string) =>
  categoryNames[category] || category || "Outros";

export const moneyFormatter = (value: number) =>
  `R$ ${Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

const buildCategories = (
  transactions: Transaction[],
  monthlyIncome: number
): CategorySummary[] => {
  const totals = transactions.reduce<Record<string, number>>(
    (acc, transaction) => {
      const category = normalizeCategory(transaction.category);
      acc[category] = (acc[category] || 0) + Number(transaction.amount);
      return acc;
    },
    {}
  );

  return Object.entries(totals)
    .map(([category, total]) => ({
      category,
      total,
      percentage: monthlyIncome > 0 ? (total / monthlyIncome) * 100 : 0
    }))
    .sort((a, b) => b.total - a.total);
};

const buildTrend = (transactions: Transaction[]): TrendPoint[] => {
  const totalsByWeek = transactions.reduce<Record<string, number>>(
    (acc, transaction) => {
      const day = new Date(`${transaction.date}T00:00:00`).getDate();
      const week = Math.ceil(day / 7);
      const label = `Semana ${week}`;

      acc[label] = (acc[label] || 0) + Number(transaction.amount);
      return acc;
    },
    {}
  );

  let accumulated = 0;

  return Object.entries(totalsByWeek)
    .sort(
      ([weekA], [weekB]) =>
        Number(weekA.replace("Semana ", "")) -
        Number(weekB.replace("Semana ", ""))
    )
    .map(([label, total]) => {
      accumulated += total;

      return {
        label,
        total: accumulated
      };
    });
};

const buildInsights = (
  user: User,
  balance: number,
  dominantCategory: CategorySummary,
  possibleSavings: number,
  spentPercentage: number
): Insight[] => {
  const insights: Insight[] = [];

  if (spentPercentage > 90) {
    insights.push({
      type: "danger",
      message: `Atenção: você já usou ${spentPercentage.toFixed(1)}% da sua renda mensal.`
    });
  } else if (spentPercentage > 70) {
    insights.push({
      type: "warning",
      message: `Você já usou ${spentPercentage.toFixed(1)}% da sua renda. Vale revisar gastos variáveis.`
    });
  } else {
    insights.push({
      type: "success",
      message: `Bom controle: ainda restam ${moneyFormatter(balance)} da renda mensal de ${moneyFormatter(user.monthlyIncome)}.`
    });
  }

  insights.push({
    type: "info",
    message: `${dominantCategory.category} é a categoria dominante, com ${moneyFormatter(dominantCategory.total)} em gastos.`
  });

  insights.push({
    type: "tip",
    message: `Reduzindo 10% em ${dominantCategory.category}, você pode economizar cerca de ${moneyFormatter(possibleSavings)} neste mês.`
  });

  return insights;
};

export const buildFinancialDashboard = (
  user: User,
  transactions: Transaction[]
): FinancialDashboard => {
  const categories = buildCategories(transactions, user.monthlyIncome);
  const totalSpent = categories.reduce((sum, item) => sum + item.total, 0);
  const balance = user.monthlyIncome - totalSpent;
  const spentPercentage =
    user.monthlyIncome > 0 ? (totalSpent / user.monthlyIncome) * 100 : 0;
  const dominantCategory = categories[0] || {
    category: "Outros",
    percentage: 0,
    total: 0
  };
  const possibleSavings = dominantCategory.total * 0.1;

  return {
    balance,
    categories,
    dominantCategory,
    insights: buildInsights(
      user,
      balance,
      dominantCategory,
      possibleSavings,
      spentPercentage
    ),
    possibleSavings,
    spentPercentage,
    totalSpent,
    trend: buildTrend(transactions)
  };
};
