// إنشاء الجسيمات والنجوم
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const starsContainer = document.getElementById('stars');
    const calculatorRect = document.querySelector('.calculator').getBoundingClientRect();
    
    // مساحة الآلة الحاسبة لتجنب وضع الجسيمات فوقها
    const calculatorArea = {
        x1: calculatorRect.left - 100,
        y1: calculatorRect.top - 100,
        x2: calculatorRect.right + 100,
        y2: calculatorRect.bottom + 100
    };
    
    // إنشاء الجسيمات العشوائية
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // حجم عشوائي بين 5 و20 بكسل
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // موضع عشوائي مع تجنب الآلة الحاسبة
        let x, y;
        do {
            x = Math.random() * window.innerWidth;
            y = Math.random() * window.innerHeight;
        } while (
            x > calculatorArea.x1 && 
            x < calculatorArea.x2 && 
            y > calculatorArea.y1 && 
            y < calculatorArea.y2
        );
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // لون متدرج داكن
        const hue = Math.random() * 60 + 240; // ألوان بين الأزرق والبنفسجي
        const saturation = Math.random() * 30 + 50;
        const lightness = Math.random() * 20 + 10;
        particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;
        
        // مدة وتأخير عشوائي للحركة
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * -20;
        particle.style.animation = `float ${duration}s infinite linear`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
        
        // جعل الجسيمات تتفاعل مع الماوس
        particle.addEventListener('mouseenter', () => {
            gsap.to(particle, {
                scale: 1.5,
                duration: 0.3,
                backgroundColor: `hsla(${hue}, ${saturation}%, 70%, 0.8)`
            });
        });
        
        particle.addEventListener('mouseleave', () => {
            gsap.to(particle, {
                scale: 1,
                duration: 0.3,
                backgroundColor: `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`
            });
        });
    }
    
    // إنشاء النجوم
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // حجم عشوائي للنجوم
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // لون متدرج داكن
        const hue = Math.random() * 60 + 240;
        const saturation = Math.random() * 30 + 50;
        star.style.backgroundColor = `hsla(${hue}, ${saturation}%, 80%, 0.8)`;
        
        // توقيت ومدة الوميض
        const duration = Math.random() * 3 + 1;
        const delay = Math.random() * -5;
        star.style.animation = `twinkle ${duration}s infinite alternate`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// استدعاء الدالة عند تحميل الصفحة وعند تغيير حجم النافذة
window.addEventListener('load', createParticles);
window.addEventListener('resize', function() {
    document.getElementById('particles').innerHTML = '';
    document.getElementById('stars').innerHTML = '';
    createParticles();
});

// العناصر الرئيسية
const firstNumberDisplay = document.getElementById('first-number');
const operatorDisplay = document.getElementById('operator');
const secondNumberDisplay = document.getElementById('second-number');
const resultDisplay = document.getElementById('result-display');
const calculator = document.querySelector('.calculator');
const buttons = document.querySelectorAll('.btn');

// المتغيرات
let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = null;
let isCalculated = false;

// إضافة تأثيرات عند النقر على الأزرار
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // تأثير الجسيمات عند النقر
        createClickParticles(e);
        
        // تأثير اهتزاز
        gsap.to(button, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    });
    
    // إضاءة الزر عند المرور عليه
    button.addEventListener('mouseenter', function() {
        this.classList.add('highlight');
        gsap.to(this, {
            scale: 1.05,
            duration: 0.2
        });
    });
    
    button.addEventListener('mouseleave', function() {
        this.classList.remove('highlight');
        gsap.to(this, {
            scale: 1,
            duration: 0.2
        });
    });
});

// إنشاء جسيمات عند النقر
function createClickParticles(e) {
    const colors = ['#6e45e2', '#88d3ce', '#b7e8eb', '#f0f9ff', '#d9b8ff'];
    const particleContainer = document.querySelector('.calculator');
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('click-particle');
        
        const x = e.clientX - particleContainer.getBoundingClientRect().left;
        const y = e.clientY - particleContainer.getBoundingClientRect().top;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particleContainer.appendChild(particle);
        
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: Math.random() * 2 + 1,
            duration: 1,
            onComplete: () => {
                particle.remove();
            }
        });
    }
}

// إضافة رقم
function appendNumber(number) {
    if (isCalculated) {
        clearAll();
        isCalculated = false;
    }
    
    if (operator === '') {
        if (number === '.' && firstNumber.includes('.')) return;
        firstNumber += number;
        firstNumberDisplay.textContent = firstNumber;
        highlightElement(firstNumberDisplay);
    } else {
        if (number === '.' && secondNumber.includes('.')) return;
        secondNumber += number;
        secondNumberDisplay.textContent = secondNumber;
        highlightElement(secondNumberDisplay);
    }
}

// إضافة عامل حسابي
function appendOperator(op) {
    if (isCalculated) {
        isCalculated = false;
        firstNumber = result.toString();
        secondNumber = '';
        result = null;
    }
    
    if (firstNumber === '' && op === '-') {
        firstNumber = '-';
        firstNumberDisplay.textContent = firstNumber;
        highlightElement(firstNumberDisplay);
        return;
    }
    
    if (firstNumber === '' || firstNumber === '-') return;
    
    if (secondNumber !== '') {
        calculate();
        firstNumber = result.toString();
        secondNumber = '';
        result = null;
    }
    
    operator = op;
    operatorDisplay.textContent = operator;
    highlightElement(operatorDisplay);
}

// حساب النتيجة
function calculate() {
    if (firstNumber === '' || secondNumber === '' || operator === '') return;
    
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    
    switch (operator) {
        case '+':
            result = num1 + num2;
            addEffect();
            break;
        case '-':
            result = num1 - num2;
            subtractEffect();
            break;
        case '*':
            result = num1 * num2;
            multiplyEffect();
            break;
        case '/':
            if (num2 === 0) {
                result = 'خطأ';
            } else {
                result = num1 / num2;
                divideEffect();
            }
            break;
        default:
            return;
    }
    
    showResult();
    isCalculated = true;
}

// عرض النتيجة
function showResult() {
    resultDisplay.textContent = result;
    resultDisplay.classList.add('show');
    
    // إخفاء أجزاء العملية الحسابية
    firstNumberDisplay.textContent = '';
    operatorDisplay.textContent = '';
    secondNumberDisplay.textContent = '';
}

// مسح الكل
function clearAll() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = null;
    firstNumberDisplay.textContent = '';
    operatorDisplay.textContent = '';
    secondNumberDisplay.textContent = '';
    resultDisplay.textContent = '';
    resultDisplay.classList.remove('show');
}

// إضاءة العنصر
function highlightElement(element) {
    element.classList.add('active');
    gsap.to(element, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });
    setTimeout(() => {
        element.classList.remove('active');
    }, 300);
}

// تأثير الجمع
function addEffect() {
    gsap.to([firstNumberDisplay, secondNumberDisplay], {
        x: (i) => i === 0 ? -30 : 30,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
    
    createOperationParticles('+');
}

// تأثير الطرح
function subtractEffect() {
    gsap.to([firstNumberDisplay, secondNumberDisplay], {
        opacity: 0,
        duration: 0.5,
        yoyo: true,
        repeat: 1
    });
    
    createOperationParticles('-');
}

// تأثير الضرب
function multiplyEffect() {
    gsap.to(calculator, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 5
    });
    
    createOperationParticles('*');
}

// تأثير القسمة
function divideEffect() {
    gsap.to(firstNumberDisplay, {
        clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
        duration: 0.5
    });
    
    gsap.to(secondNumberDisplay, {
        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
        duration: 0.5,
        onComplete: () => {
            gsap.to([firstNumberDisplay, secondNumberDisplay], {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 0.5
            });
        }
    });
    
    createOperationParticles('/');
}

// إنشاء جسيمات خاصة بالعمليات
function createOperationParticles(operation) {
    const colors = {
        '+': ['#6e45e2', '#88d3ce'],
        '-': ['#ff7e5f', '#feb47b'],
        '*': ['#ffcc00', '#ff6600'],
        '/': ['#00ccff', '#0066ff']
    };
    
    const operationColors = colors[operation] || ['#6e45e2', '#88d3ce'];
    const container = document.querySelector('.calculator');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('click-particle');
        
        const x = Math.random() * container.offsetWidth;
        const y = Math.random() * container.offsetHeight / 2;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = operationColors[Math.floor(Math.random() * operationColors.length)];
        particle.style.width = '8px';
        particle.style.height = '8px';
        
        container.appendChild(particle);
        
        gsap.to(particle, {
            y: container.offsetHeight,
            opacity: 0,
            scale: Math.random() * 2 + 1,
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => {
                particle.remove();
            }
        });
    }
}