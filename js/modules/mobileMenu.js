// Hamburger-menu
function burgerMenu({btn, menu, links}) {
    const burgerButton = document.querySelector(btn),
          mobileMenu = document.querySelector(menu),
          burgerLinks = document.querySelectorAll(links);
    burgerButton.addEventListener('click', function(){
        burgerButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      document.body.classList.toggle('open');
      // добав-м стиль не позвол-й прокручивать стр-цу
      document.body.classList.toggle('overflow');
    });
    // Закрыти бургер-меню при нажатии на ссылку
    burgerLinks.forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        burgerButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('open');
        document.body.classList.remove('overflow');
      });
    });
}

export default burgerMenu;