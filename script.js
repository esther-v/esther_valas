//anim navbar

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if(window.scrollY > 30) {
        nav.classList.add('anim-nav');
    } else {
        nav.classList.remove('anim-nav');
    }
})


//menu
let burgerButton = document.querySelector('.burger');
let menu = document.querySelector('.menu');

burgerButton.addEventListener('click', () => {
    menu.classList.toggle('open')
})




class Portfolio{

    constructor(selector){
        this.activeContent = null
        this.activeItem = null
        this.container = document.querySelector(selector);
        if (this.container === null) {
            throw new Error(`L'élément ${selector} n'existe pas`)
        }
        this.children = Array.prototype.slice.call(this.container.querySelectorAll('.js-item'));
        this.children.forEach((child) => {
            child.addEventListener('click', (e) => {
                e.preventDefault();
                this.show(child)
            } )
        })
        
    }
    //Affiche le contenu d'un projet au clic
    show(child) {
        let offset = 0
        if (this.activeContent !== null) {
            this.slideUp(this.activeContent)
            if(this.activeContent.offsetTop < child.offsetTop) {
                offset = this.activeContent.offsetHeight
            }
        }
        if (this.activeItem === child) {
            this.activeContent = null
            this.activeItem = null
        } else {
            let content = child.querySelector('.js-body').cloneNode(true)
            child.after(content)
            this.slideDown(content)
            this.scrollTo(child, offset)
            this.activeContent = content
            this.activeItem = child
        }
        
    }
    //Affiche l'élement avec un effet d'animation
    slideDown (element) {
        let height = element.offsetHeight
        element.style.height = '0px'
        element.style.transitionDuration = '.5s';
        element.offsetHeight // Force le repaint
        element.style.height = height + 'px';
        window.setTimeout( () => {
            element.style.height = null
        }, 500)
    }

    //Masquer un élément avec un effet d'animation
    slideUp (element) {
        let height = element.offsetHeight
        element.style.height = height + 'px';
        element.offsetHeight // Force le repaint
        element.style.height = '0px'
        window.setTimeout( () => {
            element.parentNode.removeChild(element)
        }, 500)
    }

    //Fait défiler la fenêtre jusqu'à l'élément
    scrollTo (element, offset = 0) {
        window.scrollTo({
            behavior : "smooth",
            left : 0,
            top : element.offsetTop - offset
        })
    }

}

new Portfolio('#js-portfolio');


