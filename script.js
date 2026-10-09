let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let container = document.querySelector('.container')
let items = container.querySelectorAll('.list .item')
let indicator = document.querySelector('.indicators')
let list = container.querySelector('.list')
let dots = indicator.querySelectorAll('ul li')
let indicatorNumber = indicator.querySelector('.number')

let active = 0
let firstPosition = 0
let lastPosition = items.length - 1

// Função centralizada para mudar os slides com efeito de direção correto
function changeSlide(direction) {
    // 1. Identifica o item atual que vai sair da tela e adiciona a animação de saída
    let oldActiveItem = items[active]
    oldActiveItem.classList.remove('active')
    oldActiveItem.classList.add('old-active')
    
    dots[active].classList.remove('active')
    
    // 2. Define a direção (1 para avançar vindo da direita, -1 para voltar vindo da esquerda)
    let calculationValue = direction === 'next' ? 1 : -1
    
    // 3. Atualiza o índice do próximo item ativo
    if (direction === 'next') {
        if (active >= lastPosition) {
            active = firstPosition
        } else {
            active++
        }
    } else {
        if (active <= firstPosition) {
            active = lastPosition
        } else {
            active--
        }
    }
    
    // 4. Aplica o cálculo de direção no novo item que vai entrar
    let nextActiveItem = items[active]
    nextActiveItem.style.setProperty('--calculation', calculationValue)
    
    // Pequeno truque para limpar classes antigas e sincronizar a saída do item anterior
    setTimeout(() => {
        items.forEach(item => {
            if (item !== nextActiveItem) item.classList.remove('old-active')
        })
        oldActiveItem.style.setProperty('--calculation', calculationValue)
        
        // Ativa o novo item e a bolinha correspondente
        nextActiveItem.classList.add('active')
        dots[active].classList.add('active')
        
        if (indicatorNumber) {
            indicatorNumber.textContent = String(active + 1).padStart(2, '0')
        }
    }, 20)
}


nextButton.onclick = () => {
    changeSlide('next')
}

prevButton.onclick = () => {
    changeSlide('prev')
}
