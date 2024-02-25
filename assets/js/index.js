const navBarElement = document.querySelector('.dot-menu')
const landingPageHeader = document.querySelector('header')

console.log(navBarElement)

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


navObserver.observe(landingPageHeader)