document.addEventListener('readystatechange', () => {
    const links = [
        {
            trigger: document.getElementById('cv-link'),
            target: document.getElementById('page-career')
        },
        {
            trigger: document.getElementById('contact-link'),
            target: document.getElementById('contact')
        }
    ]

    links.forEach(({ trigger, target }) => {
        trigger.addEventListener('click', () => {
            target.scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
})