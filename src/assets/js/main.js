
window.addEventListener("load", (event) => {
    
    const btnMenu = document.getElementById('btn-menu')
    const parentMenu = document.getElementById('parent-menu')
    const title = document.getElementById('title')
    const mainMenu = document.getElementById('main-menu')
    const cross = document.getElementById('cross')

    // let active = false

    btnMenu.addEventListener('click', function(e) {
        // if (active) {
        parentMenu.style.height = "100%"
            // title.style.display = 'none'
        mainMenu.style.display = 'block'
        cross.style.display = 'block'
        active = !active
        // } else {
        //     parentMenu.style.height = "10%"
        //     this.style.display = 'block'
        // // title.style.display = 'block'
        //     mainMenu.style.display = 'none'
        // // btnMenu.style.display = 'block'
        //     this.style.display = 'none'
        //     active = !active
        // }
    })

    cross.addEventListener('click', function(e) {
        parentMenu.style.height = "10%"
        this.style.display = 'block'
        // title.style.display = 'block'
        mainMenu.style.display = 'none'
        // btnMenu.style.display = 'block'
        this.style.display = 'none'
    })

})
