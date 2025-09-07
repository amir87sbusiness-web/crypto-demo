const cryptoData = [
  {name:"Bitcoin", symbol:"BTC", price:110925, daily:1.34, volume:11370467338, market:2210000000000, weekly:2.32, chart:[110,112,111,115,114,116,117]},
  {name:"Ethereum", symbol:"ETH", price:4296, daily:2.67, volume:440374547, market:519000000000, weekly:1.08, chart:[42,43,44,45,43,46,47]},
  {name:"XRP", symbol:"XRP", price:2.814, daily:-2.10, volume:288421, market:168000000000, weekly:-0.69, chart:[2.7,2.8,2.6,2.5,2.55,2.53,2.51]},
  {name:"Tether", symbol:"USDT", price:1.000, daily:0.02, volume:102509, market:169000000000, weekly:0.03, chart:[0.99,1.0,1.01,1.0,0.995,1.0,1.0]},
  {name:"BNB", symbol:"BNB", price:861.67, daily:-0.79, volume:88326177, market:120000000000, weekly:-0.89, chart:[850,860,852,845,843,847,848]},
];

const cryptoBody = document.getElementById("crypto-body");

cryptoData.forEach((coin, i) => {
  const tr = document.createElement("tr");

  // انتخاب رنگ بر اساس مثبت یا منفی بودن تغییر
  const dailyClass = coin.daily >=0 ? 'price-up' : 'price-down';
  const weeklyClass = coin.weekly >=0 ? 'price-up' : 'price-down';

  tr.innerHTML = `
    <td>${coin.name} (${coin.symbol})</td>
    <td>$${coin.price.toLocaleString()}</td>
    <td class="${dailyClass}">${coin.daily}%</td>
    <td>${coin.volume.toLocaleString()}</td>
    <td>$${(coin.market/1e9).toFixed(1)}B</td>
    <td class="${weeklyClass}">${coin.weekly}%</td>
    <td><canvas id="chart-${i}" width="100" height="40"></canvas></td>
  `;

  cryptoBody.appendChild(tr);

  const ctx = document.getElementById(`chart-${i}`).getContext("2d");

  // نمودار پیشرفته با رنگ دینامیک و افکت نرم
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: coin.chart.map((_, idx)=>idx+1),
      datasets: [{
        data: coin.chart,
        borderColor: coin.daily>=0?'#22c55e':'#ef4444',
        backgroundColor: coin.daily>=0?'rgba(34,197,94,0.2)':'rgba(239,68,68,0.2)',
        fill: true,
        tension: 0.3, // منحنی نرم‌تر
        pointRadius: 2,
        pointHoverRadius: 4,
      }]
    },
    options: {
      responsive: false,
      plugins:{legend:{display:false}},
      scales:{x:{display:false},y:{display:false}},
      interaction:{mode:'index',intersect:false},
      animation:{duration:800,easing:'easeOutQuart'}
    }
  });
});

// ترندها
const trendingData = [
  {name:"POL", price:0.2763, change:3.27},
  {name:"Pump.fun", price:0.004707, change:-2.41},
  {name:"Trusta.AI", price:0.1558, change:9.53},
];

const trendingGrid = document.getElementById("trending-grid");

trendingData.forEach(coin=>{
  const div = document.createElement("div");
  div.className="card";
  const changeClass = coin.change>=0?'price-up':'price-down';
  div.innerHTML = `
    <h4>${coin.name}</h4>
    <p>قیمت: $${coin.price}</p>
    <p class="${changeClass}">روزانه: ${coin.change}%</p>
  `;
  trendingGrid.appendChild(div);
});

// اخبار
const newsList = document.getElementById("news-list");
const newsData = [
  "بانک مرکزی اروپا بر توسعه یورو دیجیتال تأکید کرد",
  "شرکت‌های عمومی بیش از یک میلیون بیت کوین ذخیره کرده‌اند",
  "تتر میلیاردها دلار در صنعت طلا سرمایه‌گذاری می‌کند"
];
newsData.forEach(news=>{
  const li = document.createElement("li");
  li.textContent = news;
  newsList.appendChild(li);
});

// زبان
function toggleLang(){ alert("تغییر زبان هنوز فعال نیست 😅"); }
