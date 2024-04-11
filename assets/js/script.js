

const customSelects =  document.querySelectorAll('.custom-select');

if (customSelects) {
    customSelects.forEach(el => {
        console.log(el)
        let currentOptionsMenu = el.querySelector('.custom-select-list' )
        let currentOptions = el.querySelectorAll('.custom-select-list li' );
        el.addEventListener('click' , () => {
            currentOptionsMenu.classList.add('active');
        })
        el.querySelector('p').addEventListener('click' , () => {
            currentOptionsMenu.classList.add('active');
        })
        currentOptions.forEach(elem => {
            elem.addEventListener('click' , ()=> {
                el.querySelector('p').innerHTML = elem.innerHTML;
                el.dataset.current = elem.dataset.value;
                currentOptionsMenu.classList.remove('active')
            })
        })
        document.addEventListener('click' , (e)=> {
            if ((!e.target.closest('.custom-select')) && currentOptionsMenu.classList.contains('active')) {
                currentOptionsMenu.classList.remove('active');
            }
        })
    })
}
