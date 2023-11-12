export function winningBetCalculator(amountTotal: number, amountBet: number, amountWin: number, tax: number = 0.3) {
  const betWon = (amountBet / amountWin) * amountTotal * (1 - tax);
  return betWon;
}

// winningBetCalculator(6000, 2000, 3000); => 2800
// winningBetCalculator(6000, 1000, 3000); => 1400
