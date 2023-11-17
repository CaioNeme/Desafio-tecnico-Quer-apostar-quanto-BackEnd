import { bettingCalculators } from '@/utils/bettingCalculator';

const amountTotal = 6000;
const amountBet = 1000;
const amountWin = 3000;

describe('bettingCalculators', () => {
  it('should return betWon', () => {
    const betWon = bettingCalculators(amountTotal, amountBet, amountWin);
    expect(betWon).toBe(1400);
  });
});
