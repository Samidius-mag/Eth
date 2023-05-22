const prices = require('./price.json');
const { SMA, RSI, BollingerBands, EMA } = require('technicalindicators');

// Логика для построения RSI с периодом 14
const rsiPeriod = 14;
const rsi = RSI.calculate({ period: rsiPeriod, values: prices.map(price => price.close) });
// Логика для построения MA внутри BB с периодом 20
const bbPeriod = 20;
const bb = BollingerBands.calculate({ period: bbPeriod, stdDev: 2, values: prices.map(price => price.close) });

// Логика для построения Дисперсии вокруг MA (sigma) = 0.01
const sigma = 0.01;
const ma = SMA.calculate({ period: bbPeriod, values: prices.map(price => price.close) });
const dev = bb.map(b => b.upper - b.lower);
const forMult = 2;
const sigmaDev = dev.map(d => d * sigma);
const upper = ma.map((m, i) => m + sigmaDev[i]);
const lower = ma.map((m, i) => m - sigmaDev[i]);
const closePrices = prices.map(price => price.close);
// Сигнал на покупку
const basis = EMA.calculate({ period: bbPeriod, values: rsi });
const buySignal = basis[basis.length - 1] + ((upper[upper.length - 1] - lower[lower.length - 1]) * sigma);
// Сигнал на продажу
const sellSignal = basis[basis.length - 1] - ((upper[upper.length - 1] - lower[lower.length - 1]) * sigma);

const pricesClose = prices.map(candle => candle.close);
const currentPrice = prices[prices.length - 1].close;
const prevPrice = prices[prices.length - 2].close;
const priceChange = currentPrice - prevPrice;
const priceChangePercent = (priceChange / prevPrice) * 100;
const prevPriceMin = prices[prices.length - 2].low;
const prevPriceMax = prices[prices.length - 2].high;

const rsi1h = rsi[rsi.length - 1].toFixed(2)

const overbought1h = rsi1h == 70;
const overdohuyabought1h = rsi1h >= 71;
const oversold1h = rsi1h == 30;
const overdohuyasold1h = rsi1h <= 28;

const overboughtPrice = currentPrice - ((currentPrice - closePrices[closePrices.length - 2]) * (rsi1h));
const oversoldPrice = currentPrice + ((currentPrice - closePrices[closePrices.length - 2]) * (rsi1h));

let recommendation = '-';

if (rsi1h < overbought1h && rsi1h < overdohuyabought1h && rsi1h > buySignal && currentPrice < prevPriceMax) { //верхний порог продажа
recommendation = 'продажа 📤';
} else if (rsi1h == overbought1h || rsi1h == overdohuyabought1h) { //край верха
recommendation = 'продажа 📤';
} else if (rsi1h < sellSignal && currentPrice < prevPriceMin && rsi1h > oversold1h && rsi1h > overdohuyasold1h ) { //нижний порог продажа 
recommendation = 'продажа 📤';
} else if (rsi1h > oversold1h && rsi1h <= sellSignal && currentPrice > prevPriceMin) { //нижний порог покупка
recommendation = 'покупка 📥';
} else if (rsi1h == overdohuyasold1h || rsi1h == oversold1h ) { //край низа
recommendation = 'покупка 📥';
} else if (rsi1h >= buySignal && currentPrice > prevPriceMin && rsi1h > overbought1h) { //верхний порог покупка
recommendation = 'покупка 📥';
} else if (rsi1h >= sellSignal && rsi <= buySignal) {
recommendation = 'боковик ❌';

console.log(`Текущая цена: ${currentPrice.toFixed(2)}`);
console.log(`Изменение: ${priceChange.toFixed(2)} (${priceChangePercent.toFixed(2)}%)`);
console.log(`Рекомендация: ${recommendation}`);
console.log(`Индекс Перекуп/Перепрод
      >ОТ 30.00 ДО 70.00<
                > ${rsi1h} <
 ${oversold1h ? 'Перепродано 😬 ПОКУПАЙ!' : overbought1h ? 'Перекупленно 😬 ПРОДАВАЙ!' : overdohuyasold1h ? 'Ахуеть как Перепродано 😵 ЗОНА АКТИВНОЙ ПОКУПКИ!' : overbought1h ? 'Ахуеть как Перекупленно 😵 ЗОНА АКТИВНОЙ ПРОДАЖИ!' : '🚬🚬 Жди профита 🚬🚬'}`);
