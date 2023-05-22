const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

// функция для расчета процентного отклонения
function calculateDeviation(period) {
  const prices = data.slice(-period).map(candle => parseFloat(candle.close));
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const deviation = Math.sqrt(prices.reduce((sum, price) => sum + Math.pow(price - average, 2), 0) / prices.length);
  return deviation / average * 100;
}

// расчет процентного отклонения для периодов 1 час, 4 часа, 12 часов и 24 часов
const deviation1h = calculateDeviation(21 * 1);
const deviation4h = calculateDeviation(55 * 1);
const deviation12h = calculateDeviation(89 * 1);
const deviation24h = calculateDeviation(144 * 1);

// функция для расчета уровней поддержки и сопротивления
function calculateLevels(period, deviation) {
  const prices = data.slice(-period).map(candle => parseFloat(candle.close));
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const support = average - average * deviation / 100;
  const resistance = average + average * deviation / 100;
  return { support, resistance };
}

// расчет уровней поддержки и сопротивления для периодов 1 час, 4 часа, 12 часов и 24 часов
const levels1h = calculateLevels(20 * 1, deviation1h);
const levels4h = calculateLevels(55 * 1, deviation4h);
const levels12h = calculateLevels(89 * 1, deviation12h);
const levels24h = calculateLevels(144 * 1, deviation24h);

console.log(`1 уровень: 
Поддержка ${levels1h.support.toFixed(2)}, 
Сопротивление: ${levels1h.resistance.toFixed(2)}`);
console.log(`2 уровень: 
Поддержка ${levels4h.support.toFixed(2)}, 
Сопротивление: ${levels4h.resistance.toFixed(2)}`);
console.log(`3 уровень: 
Поддержка ${levels12h.support.toFixed(2)}, 
Сопротивление: ${levels12h.resistance.toFixed(2)}`);
console.log(`4 уровень: 
Поддержка ${levels24h.support.toFixed(2)}, 
Сопротивление: ${levels24h.resistance.toFixed(2)}`);