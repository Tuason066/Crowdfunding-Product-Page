// =============== NAVBAR ==================
const overlay = document.querySelector('.overlay');
const menuButton = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navbarList = document.querySelector('.navbar__list');

// === navbar function ===
menuButton.addEventListener('click', e => {
    const navbarListHeight = navbarList.getBoundingClientRect().height;

    if(!e.currentTarget.classList.contains('open-menu-btn')) {
        e.currentTarget.classList.add('open-menu-btn');
        navbar.classList.add('show-navbar');
        navbar.style.height = `${navbarListHeight}px`;
    } else {
        e.currentTarget.classList.remove('open-menu-btn');
        navbar.classList.remove('show-navbar');
        navbar.style.height = '0px';
    };

});

// =============== MAIN ==================
window.document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('bookmarked')) {
        bookmarkButton.classList.add('active-bookmark-btn');
    } else {
        bookmarkButton.classList.remove('active-bookmark-btn');
    };
});

const bookmark = () => {
    if(!bookmarkButton.classList.contains('active-bookmark-btn')) {
        bookmarkButton.classList.add('active-bookmark-btn');
        localStorage.setItem('bookmarked', 'active bookmarked');
    } else {
        bookmarkButton.classList.remove('active-bookmark-btn');
        localStorage.removeItem('bookmarked');
    };
}

const projectButton = document.querySelector('.project-btn');
const bookmarkButton = document.querySelector('.bookmark-btn');
bookmarkButton.addEventListener('click', () => bookmark());
projectButton.addEventListener('click', () => bookmark());

// =============== MODAL ==================
const pledgeForm = card => {

    const form = card.querySelector('.payment__form');
    const inputPledge = card.querySelector('.payment__input-field--input');
    const pledgeBtn = card.querySelector('.payment__btn');

    form.addEventListener('submit', e => {
        e.preventDefault();
        // ==== LOCAL STORAGE ==== 
        // total amount
        // number of backers
        // bamboo left
        // black-edition left
        // mahogany
        
        const id = inputPledge.dataset.id;
        const value = parseInt(inputPledge.value);

        // =========== total amount =========
        let totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
        totalAmount = parseInt(totalAmount) + value;
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount));

        // =========== number of backers =========
        let numberOfBackers = JSON.parse(localStorage.getItem('numberOfBackers')) || 0;
        numberOfBackers = parseInt(numberOfBackers) + 1;
        localStorage.setItem('numberOfBackers', JSON.stringify(numberOfBackers));

        // =========== respective storage =========
        if(id != 'no-reward') {
            let respectiveStorage = JSON.parse(localStorage.getItem(id)) || 0;
            if(parseInt(respectiveStorage) > 0) {
                respectiveStorage = parseInt(respectiveStorage) - 1;
            }
            localStorage.setItem(id, JSON.stringify(respectiveStorage));
        };

        // =========== success modal =========
        const successModal = document.querySelector('.success-modal');
        successModal.classList.add('show-success-modal');
        const successModalButton = successModal.querySelector('button');
        successModalButton.addEventListener('click', () => window.location.replace('./index.html'));

        const modal = document.querySelector('.modal');
        modal.classList.add('modal-scrollbar-body');
    });
}

const radioChecking = card => {
    const radio = card.querySelector('.modal-card__input-radio');
    const payment = card.querySelector('.payment');
    const paymentContainer = card.querySelector('.payment__container');
    const paymentHeight = payment.getBoundingClientRect().height;
    
    if(radio.checked) {
        paymentContainer.style.height = `${paymentHeight}px`;
        pledgeForm(card);
    };
};

const dynamicRadioChecking = card => {
    const payment = card.querySelector('.payment');
    const paymentContainer = card.querySelector('.payment__container');
    const paymentHeight = payment.getBoundingClientRect().height;
    modalCards.forEach(item => {
        if(item !== card) {
            item.querySelector('.payment__container').style.height = '0px';
        }
        paymentContainer.style.height = `${paymentHeight}px`;
    });
    // submitting pledge
    pledgeForm(card);
}

// ==== ONLOAD
window.document.addEventListener('DOMContentLoaded', () => {
    // =========== show checked radio ===========
    modalCards.forEach(card => radioChecking(card));

    // =========== set Local storage ===========
    // total amount 
    if(!JSON.parse(localStorage.getItem('totalAmount'))) {
        localStorage.setItem('totalAmount', '89914');
    } else {
        let value = parseInt(JSON.parse(localStorage.getItem('totalAmount')));
        if(value >= 1e5) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => card.classList.add('out-of-stock'));
            const limitText = document.querySelector('#total-amount + .dashboard__text');
            limitText.textContent = `of $${value.toLocaleString('en-US')} backed`;
        }
        const element = document.querySelector('#total-amount');
        element.textContent = `$${value.toLocaleString('en-US')}`;
    }
    // number of backers
    if(!JSON.parse(localStorage.getItem('numberOfBackers'))) {
        localStorage.setItem('numberOfBackers', '5007');
    } else {
        const value = JSON.parse(localStorage.getItem('numberOfBackers'));
        const element = document.querySelector('#total-backers');
        element.textContent = `$${parseInt(value).toLocaleString('en-US')}`;
    }
    // bamboo stand
    if(!JSON.parse(localStorage.getItem('bamboo'))) {
        localStorage.setItem('bamboo', '101');
    } else {
        const value = JSON.parse(localStorage.getItem('bamboo'));
        const element = document.querySelector('#bamboo .card__left span');
        const modalElement = document.querySelector('#bamboo .modal-card__left span');
        element.textContent = `${parseInt(value).toLocaleString('en-US')}`;
        modalElement.textContent = `${parseInt(value).toLocaleString('en-US')}`;
    }
    // black-edition stand
    if(!JSON.parse(localStorage.getItem('black-edition'))) {
        localStorage.setItem('black-edition', '64');
    } else {
        const value = JSON.parse(localStorage.getItem('black-edition'));
        const element = document.querySelector('#black-edition .card__left span');
        const modalElement = document.querySelector('#black-edition .modal-card__left span');
        element.textContent = `${parseInt(value).toLocaleString('en-US')}`;
        modalElement.textContent = `${parseInt(value).toLocaleString('en-US')}`;
    }
    // mahogany stand
    if(!JSON.parse(localStorage.getItem('mahogany'))) {
        localStorage.setItem('mahogany', '0');
    } else {
        const value = JSON.parse(localStorage.getItem('mahogany'));
        const element = document.querySelector('#mahogany .card__left span');
        const modalElement = document.querySelector('#mahogany .modal-card__left span');
        element.textContent = `${parseInt(value).toLocaleString('en-US')}`;
        modalElement.textContent = `${parseInt(value).toLocaleString('en-US')}`;
    }

    // STATUS BAR
    const statusBar = document.querySelector('.status-bar__highlight');
    const statusBarAmount = JSON.parse(localStorage.getItem('totalAmount'));

    if(parseInt(statusBarAmount) > 1e5) {
        statusBar.style.width = `${(parseInt(statusBarAmount) / parseInt(statusBarAmount)) * 100}%`;
    } else {
        statusBar.style.width = `${(parseInt(statusBarAmount) / 1e5) * 100}%`;
    }

});

const modalCards = document.querySelectorAll('.modal-card');
const inputRadios = document.querySelectorAll('.modal-card__input-radio');

modalCards.forEach(card => {
    const radio = card.querySelector('.modal-card__input-radio');
    radio.addEventListener('change', () => dynamicRadioChecking(card));
});

// select radio
const inputRadio = document.querySelectorAll('.modal-card__input-radio');
const buttonRadio = document.querySelectorAll('.select-radio');

const modal = document.querySelector('.modal');
for(let i = 0; i < buttonRadio.length; i++) {
    
    buttonRadio[i].addEventListener('click', () => {
        // show modal
        modal.classList.add('show-modal');

        const body = document.querySelector('body');
        body.classList.add('scrollbar-body');

        inputRadio.forEach(input => {
            input.checked = false;
        });

        inputRadio[i + 1].checked = true;

        const card = inputRadio[i + 1].parentElement.parentElement.parentElement;
        dynamicRadioChecking(card);

        modal.scrollTo({
            top: card.offsetTop - 32,
            left: 0,
            behavior: 'smooth'
        });

    });
};
// CLOSE modal
const closeModal = document.querySelector('.modal__close-btn');
closeModal.addEventListener('click', () => {
    modal.classList.remove('show-modal');

    const body = document.querySelector('body');
    body.classList.remove('scrollbar-body');

    inputRadio.forEach(input => {
        input.checked = false;
    });
});

// CLOSE MODAL ON KEYPRESS
window.addEventListener('keydown', e => {
    const keyCode = e.key;
    if(keyCode == 'Escape') {
        modal.classList.remove('show-modal');

        const body = document.querySelector('body');
        body.classList.remove('scrollbar-body');

        inputRadio.forEach(input => {
            input.checked = false;
        });
    };
});