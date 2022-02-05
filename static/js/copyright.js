document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.getElementById('copyright-year').innerHTML = new Date().getFullYear();
    }
}