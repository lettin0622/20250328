let seaweeds = []; // 儲存花園鰻的資料
let colors = ['#99E2B4', '#78C6A3', '#56AB91', '#248277', '#036666']; // 預設的五種顏色

function setup() {
  // 設定透明背景的畫布
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute'); // 設定畫布絕對定位
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1'); // 畫布層級較高
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件

  // 新增 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('border', 'none');
  iframe.size(windowWidth * 0.8, windowHeight * 0.8); // 設定 iframe 寬高為視窗的 80%
  iframe.position(windowWidth * 0.1, windowHeight * 0.1); // 將 iframe 置於畫布中間
  iframe.style('z-index', '0'); // iframe 層級較低

  initializeSeaweeds(); // 初始化花園鰻
}

function draw() {
  clear(); // 清除畫布，讓背景透明
  blendMode(BLEND); // 設定混合模式為 BLEND

  // 繪製每條花園鰻
  for (let seaweed of seaweeds) {
    stroke(seaweed.color); // 設定花園鰻顏色
    strokeWeight(seaweed.thickness); // 設定花園鰻粗細

    beginShape();
    for (let y = 0; y > -seaweed.lineHeight; y -= 5) {
      // 計算每個點的 X 偏移量，越靠近底部搖晃越慢
      let offsetX = seaweed.swayAmplitude * sin((frameCount + y) * seaweed.swaySpeed);
      vertex(seaweed.baseX + offsetX, seaweed.baseY + y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小
  initializeSeaweeds(); // 重新初始化花園鰻
}

function initializeSeaweeds() {
  seaweeds = []; // 清空現有的花園鰻資料
  let spacing = width / 120; // 計算每條花園鰻的間距，平均分布
  for (let i = 0; i < 120; i++) { // 增加花園鰻數量至 120
    let seaweedColor = color(random(50, 150), random(150, 255), random(50, 150), 150); // 設定整條水草的顏色和透明度一致
    seaweeds.push({
      baseX: spacing * i + spacing / 2, // 平均分布在畫布寬度內
      baseY: height, // 從畫布底部開始
      lineHeight: random(100, 200), // 高度介於 100 到 200，讓花園鰻更高
      swaySpeed: random(0.005, 0.02), // 搖晃速度
      swayAmplitude: random(10, 30), // 搖晃幅度，讓花園鰻更輕微地搖晃
      color: seaweedColor, // 使用一致的顏色和透明度
      thickness: random(3, 8) // 線的粗細，讓花園鰻更細
    });
  }
}
