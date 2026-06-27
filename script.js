// Efeito de background na Navbar ao rolar a página
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 8%';
        navbar.style.backgroundColor = '#0b0f19';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.padding = '25px 8%';
        navbar.style.backgroundColor = 'rgba(11, 15, 25, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// Suavização para os links internos corretos da navegação
const menuLinks = document.querySelectorAll('.nav-links a, .btn-secondary');
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Lógica de Simulação de Carregamento / Progresso ao Baixar o App
const downloadTriggers = document.querySelectorAll('.download-trigger');
const progressBar = document.getElementById('download-progress-bar');

downloadTriggers.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o clique nativo imediato
        
        // Evita múltiplos cliques se já estiver carregando
        if (button.classList.contains('loading')) return;

        const destinationUrl = button.getAttribute('data-link');
        
        if (destinationUrl) {
            // Ativa classes visuais
            button.classList.add('loading');
            progressBar.classList.add('active');
            
            let currentWidth = 0;
            
            // Simula o progresso incrementando a barra a cada 20ms
            const interval = setInterval(() => {
                if (currentWidth >= 100) {
                    clearInterval(interval);
                    
                    // Pequeno atraso visual após atingir 100% para o usuário notar a conclusão
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                        progressBar.classList.remove('active');
                        button.classList.remove('loading');
                        
                        // Abre o link em uma nova aba (padrão de lojas de apps)
                        const link = document.createElement('a');

link.href = destinationUrl;

link.download = 'Vilataxi.apk';

document.body.appendChild(link);

link.click();

document.body.removeChild(link);
                    }, 200);
                } else {
                    // Velocidade da simulação do download (aqui leva aprox. 1.6 segundos no total)
                    currentWidth += 1.5; 
                    progressBar.style.width = `${Math.min(currentWidth, 100)}%`;
                }
            }, 25);
        }
    });
});
