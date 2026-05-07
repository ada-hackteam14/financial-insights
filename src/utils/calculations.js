const API_URL = "http://localhost:3001";

// Busca os dados do usuário
export async function getUser() {
  const response = await fetch(`${API_URL}/user`);
  const data = await response.json();
  return data[0];
}

// Busca todas as transações
export async function getTransactions() {
  const response = await fetch(`${API_URL}/transactions`);
  return await response.json();
}

// Total gasto no mês
export async function getTotalSpent() {
  const transactions = await getTransactions();
  return transactions.reduce((acc, t) => acc + t.amount, 0);
}

// Saldo restante
export async function getBalance() {
  const user = await getUser();
  const totalSpent = await getTotalSpent();
  return user.monthlyIncome - totalSpent;
}

// Percentual gasto da renda
export async function getSpentPercentage() {
  const user = await getUser();
  const totalSpent = await getTotalSpent();
  return ((totalSpent / user.monthlyIncome) * 100).toFixed(1);
}

// Total gasto por categoria
export async function getSpendingByCategory() {
  const transactions = await getTransactions();
  return transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
}

// Categoria que mais gastou
export async function getDominantCategory() {
  const byCategory = await getSpendingByCategory();
  return Object.entries(byCategory).reduce((a, b) => (a[1] > b[1] ? a : b));
}

// Média de gasto por transação
export async function getAverageTransaction() {
  const transactions = await getTransactions();
  const totalSpent = await getTotalSpent();
  return (totalSpent / transactions.length).toFixed(2);
}

// Insights automáticos
export async function getInsights() {
  const insights = [];
  const user = await getUser();
  const balance = await getBalance();
  const spentPct = parseFloat(await getSpentPercentage());
  const [dominantCat, dominantVal] = await getDominantCategory();
  const byCategory = await getSpendingByCategory();

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

  if (byCategory["Alimentação"]) {
    const economia = (byCategory["Alimentação"] * 0.1).toFixed(2);
    insights.push({
      type: "tip",
      message: `💡 Se economizar 10% em Alimentação, você teria R$ ${economia} a mais por mês.`,
    });
  }

  return insights;
}
