export function winningBetCalculator(amountTotal: number, amountBet: number, amountWin: number, tax: number = 0.3) {
  const betWon = (amountBet / amountWin) * amountTotal * (1 - tax);
  return betWon;
}
