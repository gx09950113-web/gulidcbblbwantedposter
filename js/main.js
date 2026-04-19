// 成員名單自定義：id 為圖片檔名，name 為網頁顯示名稱
const members = [
    { id: 'jinan', name: '程錦安' },
    { id: 'joker', name: '揪可有點火' },
    { id: 'kally', name: '巴太太挖系凱利' },
    { id: 'moshue', name: '點墨雪' },
    { id: 'whoareyou', name: '寧桂〇' },
    { id: 'yechen', name: '顧燁晨' },
    { id: 'yishuan', name: '卞逸軒' }
];

const listContainer = document.getElementById('member-list');
const svgCanvas = document.getElementById('svg-canvas');
const modal = document.getElementById('myModal');
const wantedImg = document.getElementById('wanted-img');

// 初始化：產生角色卡片
function init() {
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'avatar-card';
        
        // 使用 member.id 讀取圖片，使用 member.name 顯示文字
        card.innerHTML = `
            <img src="assets/images/${member.id}.png" class="avatar-img" alt="${member.name}">
            <div class="member-name">${member.name}</div>
        `;
        
        // 點擊開啟通緝令 (assets/images/檔名_wanted.png)
        card.onclick = (e) => {
            e.stopPropagation();
            openModal(`assets/images/${member.id}_wanted.png`);
        };
        listContainer.appendChild(card);
    });

    // 繪製連線邏輯
    window.addEventListener('load', drawLines);
    window.addEventListener('resize', drawLines);
}

// 繪製紅色連線
function drawLines() {
    const cards = document.querySelectorAll('.avatar-card');
    if (cards.length < 2) return;

    svgCanvas.innerHTML = ''; 
    const canvasRect = svgCanvas.getBoundingClientRect();

    for (let i = 0; i < cards.length - 1; i++) {
        const rect1 = cards[i].querySelector('.avatar-img').getBoundingClientRect();
        const rect2 = cards[i+1].querySelector('.avatar-img').getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - canvasRect.left + window.scrollX;
        const y1 = rect1.top + rect1.height / 2 - canvasRect.top + window.scrollY;
        const x2 = rect2.left + rect2.width / 2 - canvasRect.left + window.scrollX;
        const y2 = rect2.top + rect2.height / 2 - canvasRect.top + window.scrollY;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "#cc0000"); 
        line.setAttribute("stroke-width", "3");
        line.setAttribute("stroke-dasharray", "5,3"); 
        line.setAttribute("opacity", "0.6");

        svgCanvas.appendChild(line);
    }
}

// 彈窗控制
function openModal(imgSrc) {
    wantedImg.src = imgSrc;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

init();
