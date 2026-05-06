import transactions from "../data/transactions.json";

const { user, transactions: list } = transactions;

// Total gasto no mês
export function getTotalSpent() {
  return list.reduce((acc, t) => acc + t.amount, 0);
}

// Saldo restante
export function getBalance() {
  return user.monthlyIncome - getTotalSpent();
}

// Percentual gasto da renda
export function getSpentPercentage() {
  return ((getTotalSpent() / user.monthlyIncome) * 100).toFixed(1);
}

// Total gasto por categoria
export function getSpendingByCategory() {
  return list.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
}

// Categoria que mais gastou
export function getDominantCategory() {
  const byCategory = getSpendingByCategory();
  return Object.entries(byCategory).reduce((a, b) => (a[1] > b[1] ? a : b));
}

// Média de gasto por transação
export function getAverageTransaction() {
  return (getTotalSpent() / list.length).toFixed(2);
}

// Lista de transações completa
export function getTransactions() {
  return list;
}

// Dados do usuário
export function getUser() {
  return user;
}

// Insights automáticos
export function getInsights() {
  const insights = [];
  const balance = getBalance();
  const spentPct = parseFloat(getSpentPercentage());
  const [dominantCat, dominantVal] = getDominantCategory();
  const byCategory = getSpendingByCategory();

  if (spentPct > 90) {
    insights.push({
      type: "danger",
      message: `Atenção! Você já gastou ${spentPct}% da sua renda mensal.`,
    });
  } else if (spentPct > 70) {
    insights.push({
      type: "warning",
      message: `Você já usou ${spentPct}% da sua renda. Fique de olho nos gastos.`,
    });
  } else {
    insights.push({
      type: "success",
      message: `Bom controle! Você usou ${spentPct}% da renda e ainda tem R$ ${balance.toFixed(2)} disponível.`,
    });
  }

  insights.push({
    type: "info",
    message: `Sua maior despesa é com ${dominantCat}: R$ ${dominantVal.toFixed(2)} no mês.`,
  });

  if (byCategory["Lazer"]) {
    const lazerPct = ((byCategory["Lazer"] / user.monthlyIncome) * 100).toFixed(
      1,
    );
    if (lazerPct > 15) {
      insights.push({
        type: "warning",
        message: `Gastos com Lazer representam ${lazerPct}% da sua renda. Considere reduzir.`,
      });
    }
  }

  // Simulação: economia de 10% em alimentação
  if (byCategory["Alimentação"]) {
    const economia = (byCategory["Alimentação"] * 0.1).toFixed(2);
    insights.push({
      type: "tip",
      message: `💡 Se economizar 10% em Alimentação, você teria R$ ${economia} a mais por mês.`,
    });
  }

  return insights;
}
