function startPreload() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded_hiding');
        window.setTimeout( () => {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
        }, 500);
    }); 
}

export default startPreload;