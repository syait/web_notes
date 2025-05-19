/**
 * 520祝福页面动画效果
 */

// 水墨效果
function createInkEffect() {
    const canvas = document.createElement('canvas');
    const container = document.querySelector('.container');
    
    canvas.className = 'ink-canvas';
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.globalAlpha = 0.05;
    
    // 添加到DOM
    container.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    
    // 创建水墨效果
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        drawInkBlot(ctx, x, y);
    }
}

// 绘制水墨点
function drawInkBlot(ctx, x, y) {
    const size = 50 + Math.random() * 100;
    const inkColor = Math.random() > 0.7 ? '#742d5f' : '#3d4e65';
    
    ctx.beginPath();
    ctx.fillStyle = inkColor;
    
    // 创建不规则形状
    for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const radius = size * (0.5 + Math.random() * 0.5);
        const blobX = x + Math.cos(angle) * radius;
        const blobY = y + Math.sin(angle) * radius;
        
        if (angle === 0) {
            ctx.moveTo(blobX, blobY);
        } else {
            ctx.lineTo(blobX, blobY);
        }
    }
    
    ctx.closePath();
    ctx.fill();
}

// 创建竹子背景元素
function createBamboo() {
    const container = document.querySelector('.container');
    const bamboo = document.createElement('div');
    
    bamboo.className = 'bamboo';
    bamboo.style.position = 'absolute';
    bamboo.style.bottom = '0';
    bamboo.style.right = '20px';
    bamboo.style.height = '90%';
    bamboo.style.width = '80px';
    bamboo.style.zIndex = '-1';
    bamboo.style.opacity = '0.2';
    
    // 创建竹节
    for (let i = 0; i < 8; i++) {
        const section = document.createElement('div');
        section.style.position = 'absolute';
        section.style.bottom = `${i * 12}%`;
        section.style.right = '40px';
        section.style.width = '8px';
        section.style.height = '12%';
        section.style.backgroundColor = '#285c3a';
        section.style.borderRadius = '5px';
        
        // 竹节
        if (i > 0) {
            const joint = document.createElement('div');
            joint.style.position = 'absolute';
            joint.style.bottom = `${i * 12}%`;
            joint.style.right = '38px';
            joint.style.width = '12px';
            joint.style.height = '3px';
            joint.style.backgroundColor = '#1a3c26';
            joint.style.borderRadius = '50%';
            bamboo.appendChild(joint);
        }
        
        // 竹叶
        if (i > 3 && i % 2 === 0) {
            createBambooLeaves(bamboo, i);
        }
        
        bamboo.appendChild(section);
    }
    
    container.appendChild(bamboo);
}

// 创建竹叶
function createBambooLeaves(parent, position) {
    const leafContainer = document.createElement('div');
    leafContainer.style.position = 'absolute';
    leafContainer.style.bottom = `${position * 12 + 5}%`;
    leafContainer.style.right = '45px';
    leafContainer.style.width = '100px';
    leafContainer.style.height = '60px';
    
    // 创建3-5片叶子
    const leavesCount = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < leavesCount; i++) {
        const leaf = document.createElement('div');
        const angle = -30 + i * 15;
        
        leaf.style.position = 'absolute';
        leaf.style.bottom = '0';
        leaf.style.right = '0';
        leaf.style.width = '60px';
        leaf.style.height = '15px';
        leaf.style.backgroundColor = '#3a7e4f';
        leaf.style.borderRadius = '100% 0 0 0';
        leaf.style.transform = `rotate(${angle}deg)`;
        leaf.style.transformOrigin = 'right bottom';
        
        leafContainer.appendChild(leaf);
    }
    
    parent.appendChild(leafContainer);
}

// 创建茶杯上方的蒸汽效果
function createSteam() {
    const teacup = document.querySelector('.teacup');
    const steamContainer = document.createElement('div');
    
    steamContainer.className = 'steam';
    steamContainer.style.position = 'absolute';
    steamContainer.style.top = '-20px';
    steamContainer.style.left = '50%';
    steamContainer.style.transform = 'translateX(-50%)';
    steamContainer.style.width = '40px';
    steamContainer.style.height = '40px';
    
    // 创建3条蒸汽
    for (let i = 0; i < 3; i++) {
        const steam = document.createElement('div');
        const delay = i * 0.6;
        const leftOffset = -10 + i * 10;
        
        steam.style.position = 'absolute';
        steam.style.bottom = '0';
        steam.style.left = `${leftOffset}px`;
        steam.style.width = '8px';
        steam.style.height = '20px';
        steam.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        steam.style.borderRadius = '50%';
        steam.style.filter = 'blur(5px)';
        steam.style.animation = `rise 3s infinite ${delay}s`;
        
        steamContainer.appendChild(steam);
    }
    
    // 添加动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rise {
            0% { 
                opacity: 0.5;
                transform: translateY(0) scaleX(1);
            }
            50% {
                opacity: 0.3;
                transform: translateY(-15px) scaleX(1.2);
            }
            100% {
                opacity: 0;
                transform: translateY(-30px) scaleX(1.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    teacup.appendChild(steamContainer);
}

// 动画熊猫和小棕熊
function animateAnimals() {
    // 获取动物元素
    const panda = document.querySelector('.panda');
    const bear = document.querySelector('.bear');
    
    // 添加小动画
    const pandaAnimation = `
        @keyframes pandaSway {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }
        
        @keyframes bearNod {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        .panda {
            animation: pandaSway 3s ease-in-out infinite;
            transform-origin: bottom center;
        }
        
        .bear {
            animation: bearNod 4s ease-in-out infinite;
        }
    `;
    
    // 添加眨眼动画
    const blinkAnimation = `
        @keyframes blink {
            0%, 48%, 52%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.1); }
        }
        
        .panda-eye, .bear-eye {
            animation: blink 4s ease-in-out infinite;
            transform-origin: center center;
        }
        
        .bear-eye {
            animation-delay: 2s;
        }
    `;
    
    // 添加样式到页面
    const styleElement = document.createElement('style');
    styleElement.textContent = pandaAnimation + blinkAnimation;
    document.head.appendChild(styleElement);
}

// 页面加载完成后初始化所有效果
window.addEventListener('DOMContentLoaded', () => {
    // 一秒后开始执行，确保主JS已经加载完毕
    setTimeout(() => {
        createInkEffect();
        createBamboo();
        createSteam();
        animateAnimals();
    }, 1000);
}); 