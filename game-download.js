// game-download.js - Функционал скачивания игры Farmailos

// Функция для скачивания файла с Google Drive
function downloadFromGoogleDrive() {
    const progressElement = document.getElementById('downloadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const downloadSpeed = document.getElementById('downloadSpeed');
    
    // Показываем индикатор загрузки
    if (progressElement) progressElement.style.display = 'block';
    
    // Имитация процесса загрузки
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Завершаем загрузку и открываем ссылку
            setTimeout(() => {
                // РЕАЛЬНАЯ ССЫЛКА НА СКАЧИВАНИЕ
                const downloadUrl = 'https://drive.google.com/uc?export=download&id=1g-8x_-_aPdj-6mCp-yrEes8fJZhCs8Gm';
                
                // Открываем ссылку в новом окне
                window.open(downloadUrl, '_blank');
                
                // Скрываем индикатор через 3 секунды
                setTimeout(() => {
                    if (progressElement) progressElement.style.display = 'none';
                }, 3000);
            }, 2000);
        }
        
        // Обновляем прогресс
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressPercentage) progressPercentage.textContent = `${Math.round(progress)}%`;
        
        // Имитация скорости загрузки
        const speed = Math.round(500 + Math.random() * 1500);
        if (downloadSpeed) downloadSpeed.textContent = `${speed} KB/s`;
    }, 100);
}

// Функция для показа уведомления о Linux
function showLinuxNotification() {
    const notification = document.getElementById('linuxNotification');
    if (notification) notification.style.display = 'flex';
}

// Функция для закрытия уведомления
function closeNotification() {
    const notification = document.getElementById('linuxNotification');
    if (notification) notification.style.display = 'none';
}

// Функция для закрытия индикатора загрузки
function closeProgress() {
    const progress = document.getElementById('downloadProgress');
    if (progress) progress.style.display = 'none';
}

// Защита от инспектирования кода
function preventDevTools() {
    // Блокировка F12, Ctrl+Shift+I, Ctrl+U и др.
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'U') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'F5')) {
            e.preventDefault();
            
            // Показываем предупреждение
            const warning = document.getElementById('protectionWarning');
            if (warning) {
                warning.textContent = '⚠️ Инструменты разработчика отключены для защиты контента.';
                warning.style.display = 'block';
                
                setTimeout(() => {
                    warning.style.display = 'none';
                }, 3000);
            }
            
            return false;
        }
    });
}

// Создание анимированного фона
function createParticles() {
    const container = document.getElementById('bgAnimation');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайный размер
        const size = Math.random() * 10 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Случайная позиция
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Случайная длительность анимации
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Случайная задержка
        const delay = Math.random() * 5;
        particle.style.animationDelay = `-${delay}s`;
        
        container.appendChild(particle);
    }
}

// Фильтрация версий игры
function setupVersionFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const updateCards = document.querySelectorAll('.update-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Фильтруем карточки
            updateCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-type') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Управление модальными окнами
function setupModals() {
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadModal = document.getElementById('downloadModal');
    const closeModal = document.getElementById('closeModal');
    const windowsDownload = document.getElementById('windowsDownload');
    const linuxDownload = document.getElementById('linuxDownload');
    const closeNotificationBtn = document.getElementById('closeNotification');
    const closeProgressBtn = document.getElementById('closeProgress');
    
    // Открытие модального окна загрузки
    if (downloadBtn && downloadModal) {
        downloadBtn.addEventListener('click', function() {
            downloadModal.style.display = 'flex';
        });
    }
    
    // Закрытие модального окна загрузки
    if (closeModal && downloadModal) {
        closeModal.addEventListener('click', function() {
            downloadModal.style.display = 'none';
        });
    }
    
    // Скачивание для Windows
    if (windowsDownload) {
        windowsDownload.addEventListener('click', function(e) {
            e.preventDefault();
            if (downloadModal) downloadModal.style.display = 'none';
            downloadFromGoogleDrive();
        });
    }
    
    // Уведомление для Linux
    if (linuxDownload) {
        linuxDownload.addEventListener('click', function(e) {
            e.preventDefault();
            if (downloadModal) downloadModal.style.display = 'none';
            showLinuxNotification();
        });
    }
    
    // Закрытие уведомления для Linux
    if (closeNotificationBtn) {
        closeNotificationBtn.addEventListener('click', closeNotification);
    }
    
    // Закрытие индикатора загрузки
    if (closeProgressBtn) {
        closeProgressBtn.addEventListener('click', closeProgress);
    }
    
    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(event) {
        const downloadModal = document.getElementById('downloadModal');
        const linuxNotification = document.getElementById('linuxNotification');
        
        if (downloadModal && event.target === downloadModal) {
            downloadModal.style.display = 'none';
        }
        if (linuxNotification && event.target === linuxNotification) {
            closeNotification();
        }
    });
}

// Плавная прокрутка для навигации
function setupSmoothScrolling() {
    document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Защита контента
function setupContentProtection() {
    let warningTimeout;
    const warning = document.getElementById('protectionWarning');
    
    // Запрет копирования
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        if (warning) {
            warning.textContent = '⚠️ Копирование контента запрещено! Это официальный сайт Farmailos.';
            warning.style.display = 'block';
            
            clearTimeout(warningTimeout);
            warningTimeout = setTimeout(() => {
                warning.style.display = 'none';
            }, 3000);
        }
    });
    
    // Запрет контекстного меню
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if (warning) {
            warning.textContent = '⚠️ Контекстное меню отключено для защиты контента.';
            warning.style.display = 'block';
            
            clearTimeout(warningTimeout);
            warningTimeout = setTimeout(() => {
                warning.style.display = 'none';
            }, 3000);
        }
    });
    
    // Запрет перетаскивания изображений
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            if (warning) {
                warning.textContent = '⚠️ Сохранение изображений запрещено.';
                warning.style.display = 'block';
                
                clearTimeout(warningTimeout);
                warningTimeout = setTimeout(() => {
                    warning.style.display = 'none';
                }, 3000);
            }
        }
    });
    
    // Защита от выделения текста
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        if (warning) {
            warning.textContent = '⚠️ Выделение текста ограничено для защиты контента.';
            warning.style.display = 'block';
            
            clearTimeout(warningTimeout);
            warningTimeout = setTimeout(() => {
                warning.style.display = 'none';
            }, 3000);
        }
    });
}

// Основная функция инициализации
function init() {
    // Защита от инструментов разработчика
    preventDevTools();
    
    // Создаем анимированный фон
    createParticles();
    
    // Настраиваем фильтры версий
    setupVersionFilters();
    
    // Настраиваем модальные окна
    setupModals();
    
    // Настраиваем плавную прокрутку
    setupSmoothScrolling();
    
    // Настраиваем защиту контента
    setupContentProtection();
    
    console.log('Farmailos website initialized successfully!');
}

// Запускаем инициализацию после полной загрузки DOM
document.addEventListener('DOMContentLoaded', init);