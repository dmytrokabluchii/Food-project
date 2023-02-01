function fixHeader(el) {
    const headerClass = document.querySelector(el);
    window.onscroll = function() {
      functionFixHeader();
    };
    function functionFixHeader() {
      if (window.pageYOffset > 0) {
        headerClass.classList.add("fixed_header");
      } else {
        headerClass.classList.remove("fixed_header");
      }
    } 
}

export default fixHeader;