// 成員名單
const members = ['jinan', 'joker', 'kally', 'moshue', 'whoareyou', 'yechen', 'yishuan'];

const listContainer = document.getElementById('member-list');
const svgCanvas = document.getElementById('svg-canvas');
const modal = document.getElementById('myModal');
const wantedImg = document.getElementById('wanted-img');

// 初始化
function init() {
    // 1. 產生角色卡片
    members.forEach(name => {
        const card = document.createElement('div');
        card.className = 'avatar-card';
        card.innerHTML = `
            <img src="assets/images/${name}.png" class="avatar-img" alt="${name}">
            <div class="member-name">${name}</div>
        `;
        // 點擊事件：開啟通緝令
        card.onclick = (e) => {
            e.stopPropagation();
            openModal(`assets/images/${name}_wanted.png`);
        };
        listContainer.appendChild(card);
    });

    // 2. 繪製連線（需等圖片載入完成，位置才準確）
    window.addEventListener('load', drawLines);
    window.addEventListener('resize', drawLines);
}

// 繪製紅色連線邏輯
function drawLines() {
    const cards = document.querySelectorAll('.avatar-card');
    if (cards.length < 2) return;

    svgCanvas.innerHTML = ''; // 清空畫布
    
    // 取得畫布相對於頁面的座標
    const canvasRect = svgCanvas.getBoundingClientRect();

    for (let i = 0; i < cards.length - 1; i++) {
        const rect1 = cards[i].querySelector('.avatar-img').getBoundingClientRect();
        const rect2 = cards[i+1].querySelector('.avatar-img').getBoundingClientRect();

        // 計算兩個中心點位置（扣除畫布位移與捲軸）
        const x1 = rect1.left + rect1.width / 2 - canvasRect.left + window.scrollX;
        const y1 = rect1.top + rect1.height / 2 - canvasRect.top + window.scrollY;
        const x2 = rect2.left + rect2.width / 2 - canvasRect.left + window.scrollX;
        const y2 = rect2.top + rect2.height / 2 - canvasRect.top + window.scrollY;

        // 建立 SVG Line
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        
        // 設定紅線樣式
        line.setAttribute("stroke", "#cc0000"); // 警方辦案用的深紅色
        line.setAttribute("stroke-width", "3");
        line.setAttribute("stroke-dasharray", "4,2"); // 虛線感，更有連線氛圍
        line.setAttribute("opacity", "0.7");

        svgCanvas.appendChild(line);
    }
}

// 彈窗控制
function openModal(imgSrc) {
    wantedImg.src = imgSrc;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 開啟時禁止頁面捲動
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 關閉時恢復捲動
}

// 執行
init();
