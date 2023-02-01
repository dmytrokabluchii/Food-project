function smoothScroll(linkFirst, linkSecond, linkThird) {
    const anchors = document.querySelectorAll(linkFirst, linkSecond, linkThird);
    for (let i of anchors) {
      i.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = i.getAttribute('href');
        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
}

export default smoothScroll;