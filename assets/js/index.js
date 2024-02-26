const navBarElement = document.querySelector('.dot-menu')
const landingPageHeader = document.querySelector('header')

const sushiElement = document.querySelector('.sushi-wrapper')
const exploreButtonElement = document.querySelector('.explore-wrapper button')
const chopstickElement = document.querySelector('.chopstick-wrapper')
const createButtonElement = document.querySelector('.create-wrapper button')

const expressEmbraceGrowElement = document.querySelector('.express-embrace-grow')
const progressBarElement = document.querySelector('.progress-bar')

const navObserver = 
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting){
                navBarElement.classList.remove('hidden')
            } else {
                navBarElement.classList.add('hidden')
            }
        }),
        {
            threshold: 0.0
        }
    }
)

// const progressBarObserver = 
//         new IntersectionObserver((entries, observer) => {
//             console.log(entries)
//             entries.forEach(entry => {
//                 if(entry.isIntersecting){
//                     document.addEventListener('scroll',(event) => {
//                         onProgresScroll(event)
//                     })
//                 }
//             })
//         }
// )
document.addEventListener('scroll',(event) => {
    onProgressScroll(event)
})

function onProgressScroll(event) {
    const documentRelativePositionY = expressEmbraceGrowElement.getBoundingClientRect().top + document.documentElement.scrollTop
    const scrollYWithOffset = window.scrollY + 400
    if (
         scrollYWithOffset >= documentRelativePositionY &&
         scrollYWithOffset <= 
         documentRelativePositionY + expressEmbraceGrowElement.getBoundingClientRect().height
        ) {
            console.log('We are in!')
            const distanceFromTopOfElement = scrollYWithOffset - documentRelativePositionY
            const percentageScrolled = (distanceFromTopOfElement / expressEmbraceGrowElement.getBoundingClientRect().height) * 100 
            progressBarElement.style.height = (percentageScrolled) + '%'
            
            const currentRow = Math.floor(percentageScrolled / 33)
            
            console.log(currentRow)
            const fadedElements = 
                document
                .querySelectorAll
                    (`.express-embrace-grow>:not(.progress-bar,:nth-child(${1 + currentRow * 2 + 1}),:nth-child(${1 + currentRow * 2 + 2}))`);
            let fadedArray = Array.from(fadedElements)            
            let childrenOfExpressEmbraceGrow = document.querySelectorAll('.express-embrace-grow>*:not(.progress-bar)')
            childrenOfExpressEmbraceGrow.forEach(e => {
                if(fadedArray.includes(e)) {
                    if (!e.classList.contains('faded')){
                        e.classList.add('faded')
                    }
                    if(e.querySelector('h2') && e.querySelector('h2').classList.contains('underlined')){
                        e.querySelector('h2').classList.remove('underlined')
                    }
                  
                } else {
                    if (e.classList.contains('faded')){
                        e.classList.remove('faded')
                    }
                    if(e.querySelector('h2')){
                        e.querySelector('h2').classList.add('underlined')
                    }
                   
                }
            })
            if (currentRow === 0){
                progressBarElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--red-color').trim();
                document.body.classList.add('body-dark')
                document.querySelector('.express-yourself h2').classList.add('underlined')
            }
            else if (currentRow === 1){
                progressBarElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--green-color').trim();
            } else {
                progressBarElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--beige-color').trim();
            }
        } else {
            document.body.classList.remove('body-dark')
        }
}

navObserver.observe(landingPageHeader)
// progressBarObserver.observe(expressEmbraceGrowElement)

exploreButtonElement.addEventListener('click',event => {
    sushiElement.classList.toggle('swapped')
    exploreButtonElement.classList.toggle('swapped')
})

createButtonElement.addEventListener('click',event => {
    const ingredientImage = chopstickElement.querySelector('.ingredients')
    const preparedFoodImage = chopstickElement.querySelector('.prepared-food')
    ingredientImage.classList.toggle('hidden')
    preparedFoodImage.classList.toggle('hidden')
})

const landingLogoCenterElement = document.querySelector('#logo-center')


landingLogoCenterElement.addEventListener('mouseover', onLogoHover)
document.querySelectorAll('#rays path')
        .forEach(element => element
            .addEventListener('animationend', onAnimationEnd))

function onAnimationEnd(event) {
    console.log('animation ended')
    document
        .querySelectorAll('#rays path')
        .forEach(element => element.classList.remove('animated'))
}

function onLogoHover(event) {
    document
        .querySelectorAll('#rays path')
        .forEach(element => element.classList.add('animated'))
}