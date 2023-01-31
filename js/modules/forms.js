import {closeModal, openModal} from './modal';
import {postDada} from '../services/services';

function forms(formSelector, modalTimerId) {
    // Реализация скрипта отправки данных на сервер
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'icons/spinner.svg',
        success: "'Дякую, Скоро ми з вами зв'яжемося'",
        failure: 'Помилка, щось пішло не так!'
    };
    forms.forEach(item => {
        bindPostData(item);
    });
    // Функ-я отвеч-я за привязку к постингу данных с сервера
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postDada('http://localhost:3000/requests', json)
            .then(data => {
            // console.log(data);      {name: 'Вероника', phone: '+38 (067) 902-42-38', id: 1}
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch( () => {
                showThanksModal(message.failure);
            }).finally( () => {
                form.reset();
            });
        });
    }
    // Оповещение пользователя + Spinner
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout( () => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 5000);
    }
}

export default forms;