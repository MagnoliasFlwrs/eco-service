const customSelects = document.querySelectorAll('.custom-select');

if (customSelects.length > 0) {
    customSelects.forEach(el => {
        const currentOptionsMenu = el.querySelector('.custom-select-list');
        const currentOptions = el.querySelectorAll('.custom-select-list li');

        if (Number(el.querySelector('p').dataset.current) !== 0) {
            el.querySelector('p').classList.add('choose')
        } else {
            el.querySelector('p').classList.remove('choose')
        }

        el.querySelector('.custom-input').addEventListener('click', () => {
            currentOptionsMenu.classList.add('active');

        });

        el.querySelector('.custom-input p').addEventListener('click', () => {
            currentOptionsMenu.classList.add('active');
        });



        currentOptions.forEach(option => {
            option.addEventListener('click', () => {
                el.querySelector('p').innerHTML = option.innerHTML;
                el.querySelector('p').dataset.current = option.dataset.value;

                if (Number(el.querySelector('p').dataset.current) !== 0) {
                    el.querySelector('p').classList.add('choose')
                } else {
                    el.querySelector('p').classList.remove('choose')
                }

                currentOptionsMenu.classList.remove('active');


            });
        });

        document.addEventListener('click', (e) => {
            if ((!e.target.closest('.custom-select')) && currentOptionsMenu.classList.contains('active')) {
                currentOptionsMenu.classList.remove('active');
            }
        });

        el.querySelector('.custom-input p').addEventListener('blur', () => {
            currentOptionsMenu.classList.remove('active');
        });


    });
}

document.addEventListener("DOMContentLoaded", function() {
    let slider = document.getElementById('slider');
    let output = document.getElementById('sliderValue');

    noUiSlider.create(slider, {
        start: 5000,
        connect: [true, false],
        range: {
            'min': 0,
            'max': 10000
        },
        step: 10,
        tooltips: false,
    });


    slider.noUiSlider.on('update', function(values, handle) {
        output.textContent = Math.round(Number(values[handle]));
    });
});


const cityModal = document.querySelector('.city-modal');
const cityModalClose = document.querySelector('.city-modal .close-row');
const citySelect = document.querySelector('.city-select');
const cityModalItems = cityModal.querySelectorAll('.city-list li');
const overlay = document.querySelector('.overlay');
const cityInput = document.querySelector('.city-input p');

if (citySelect && cityModal) {
    citySelect.addEventListener('click', () => {
        cityModal.classList.add('active');
        overlay.classList.add('open');
    });
    cityModalClose.addEventListener('click', () => {
        cityModal.classList.remove('active');
        overlay.classList.remove('open');
    });
    overlay.addEventListener('click', () => {
        cityModal.classList.remove('active');
        overlay.classList.remove('open');
    });

    cityModalItems.forEach(el=> {
        el.addEventListener('click', (e) => {
            cityInput.innerHTML = el.innerHTML;
            cityInput.dataset.current = el.dataset.value;
            if (cityInput.dataset.current !== 0) {
                cityInput.classList.add('choose')
            } else {
                cityInput.classList.remove('choose')
            }
            cityModal.classList.remove('active');
            overlay.classList.remove('open');
        })
    })
}

// disable order

const passport = document.querySelector('.passport');
const checkboxList = document.querySelector('.checkbox-list');
const ranges = document.querySelector('.range-wrapper');
const capacity = document.querySelector('.capacity');
const typeOfWaste = document.querySelector('.waste');
const serviceType = document.querySelector('.service-type');
const calcComment = document.querySelector('.calc-comment');
const citySelectInput = document.querySelector('.city-input p');
const serviceTypeInput = serviceType.querySelector('p');
const typeOfWasteInput = typeOfWaste.querySelector('p');

console.log(typeOfWaste)

document.addEventListener('DOMContentLoaded' , () => {
    if(serviceType) {
        let fieldsArr = [serviceType , typeOfWaste , capacity , ranges , checkboxList , passport , calcComment];
        fieldsArr.forEach(field => {
            field.classList.add('disabled');
        })
    }
})


// Функция для удаления класса disabled у элементов
function removeDisabled(element) {
    if (element) {
        element.classList.remove('disabled');
    }
}

function addDisabled(element) {
    if (element) {
        element.classList.add('disabled');
    }
}

const citySelectObserver = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && citySelectInput.classList.contains('choose')) {
            removeDisabled(serviceType);
            observer.disconnect();
        }
    }
});


citySelectObserver.observe(citySelectInput, { attributes: true });


const serviceTypeInputObserver = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && serviceTypeInput.classList.contains('choose')) {
            removeDisabled(typeOfWaste);
            observer.disconnect();
        }
    }
});

serviceTypeInputObserver.observe(serviceTypeInput, { attributes: true });


const typeOfWasteInputObserver = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && typeOfWasteInput.classList.contains('choose')) {
            removeDisabled(capacity);
            removeDisabled(ranges);
            removeDisabled(checkboxList);
            removeDisabled(passport);
            removeDisabled(calcComment);
            observer.disconnect();
        }
    }
});

typeOfWasteInputObserver.observe(typeOfWasteInput, { attributes: true });


addDisabled(serviceType);
addDisabled(typeOfWaste);
addDisabled(capacity);
addDisabled(ranges);
addDisabled(checkboxList);
addDisabled(passport);
addDisabled(calcComment);

function mainFormValidation() {
    const submitBtn = document.querySelector('.calc-submit');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const citySelected = citySelectInput.classList.contains('choose');
        const serviceTypeSelected = serviceTypeInput.classList.contains('choose');
        const typeOfWasteSelected = typeOfWasteInput.classList.contains('choose');

        if(citySelected && serviceTypeSelected && typeOfWasteSelected) {
            showContactModal(submitBtn)
        }

        toggleErrorMessage('.city-select', citySelected);
        toggleErrorMessage('.custom-select.service-type', serviceTypeSelected);
        toggleErrorMessage('.custom-select.waste', typeOfWasteSelected);
    });


    function toggleErrorMessage(selector, isValid) {
        const errorMessage = document.querySelector(`${selector} .error-message`);
        if (!isValid) {
            errorMessage.classList.add('active');
        } else {
            errorMessage.classList.remove('active');
        }
    }


    const observer = new MutationObserver((mutationsList) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                mainFormValidation();
                break;
            }
        }
    });


    observer.observe(citySelectInput, { attributes: true });
    observer.observe(serviceTypeInput, { attributes: true });
    observer.observe(typeOfWasteInput, { attributes: true });
}


mainFormValidation()


function addMaskFromInputCallBackForm(path, maskValue) {
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    }

    function mask(event) {
        let matrix = maskValue,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });

        if (event.type === "blur") {
            if (this.value.length === 2) this.value = "";
        } else setCursorPosition(this.value.length, this);
    }

    let input = document.querySelector(path);

    if (input) {

        input.addEventListener("input", mask, false);

        input.addEventListener("focus", mask, false);

        input.addEventListener("blur", mask, false);
    }
}


addMaskFromInputCallBackForm('.contact-modal-tel', '+7 (___) ___-__-__')

const modalUserName = document.querySelector('.contact-modal-name');
const modalUserEmail = document.querySelector('.contact-modal-email');
const modalUserTel = document.querySelector('.contact-modal-tel');
const contactModal=document.querySelector('.contact-modal');
const contactModalClose = document.querySelector('.contact-modal .close-row span');

function showContactModal(btn) {
    btn.addEventListener('click', (e) => {
        contactModal.classList.add('active');
        overlay.classList.add('open')
    })
}
function closeContactModal() {
    contactModalClose.addEventListener('click', (e) => {
        contactModal.classList.remove('active');
        overlay.classList.remove('open')
    })
    overlay.addEventListener('click', (e) => {
        contactModal.classList.remove('active');
        overlay.classList.remove('open')
    })
}

closeContactModal()


if (contactModal) {
    let inputs = [modalUserEmail , modalUserTel , modalUserName]
    inputs.forEach(input => {
        const placeholderText = input.getAttribute('placeholder');

        input.addEventListener('focus', function() {
            this.setAttribute('placeholder', '');
        });

        input.addEventListener('blur', function() {
            this.setAttribute('placeholder', placeholderText);
        });



        input.addEventListener('input', function() {

            if (this.value.trim()) {
                this.style.backgroundImage = 'none';
            } else {
                this.style.backgroundImage = `url('./assets/images/${this.getAttribute('class').split('-')[2]}.png')`;
            }
        });
    })



    const contactSubmit = document.querySelector('.contact-modal-submit');

    contactSubmit.addEventListener('click', (event) => {
        const nameInput = document.querySelector('.contact-modal-name');
        const telInput = document.querySelector('.contact-modal-tel');
        const emailInput = document.querySelector('.contact-modal-email');


        function showError(input, message) {
            const errorSpan = input.nextElementSibling;
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }

        function hideError(input) {
            const errorSpan = input.nextElementSibling;
            errorSpan.textContent = '';
            errorSpan.style.display = 'none';
        }


        if (!nameInput.value.trim()) {
            showError(nameInput, 'Введите имя');
            nameInput.focus();
            event.preventDefault();
            return;
        }
        const nameRegex = /^[а-яА-ЯёЁ\s\-]+$/;
        if (!nameRegex.test(nameInput.value)) {
            showError(nameInput, 'Имя может содержать только ' +
                'символы кириллического алфавита (а-я, А-Я), а также дефис (-) и пробел');
            nameInput.focus();
            event.preventDefault();
            return;
        }
        hideError(nameInput);


        if (!telInput.value.trim()) {
            showError(telInput, 'Введите телефон');
            telInput.focus();
            event.preventDefault();
            return;
        }
        hideError(telInput);

        if (emailInput.value.trim()) {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Неверный формат электронной почты');
                emailInput.focus();
                event.preventDefault();
                return;
            }
        }
        hideError(emailInput);
    })
}





