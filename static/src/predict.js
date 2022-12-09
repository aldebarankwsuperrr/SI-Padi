const btnPenanganan = document.querySelector('#btnPenanganan');
const formPenanganan = document.querySelector('.formPenanganan');

btnPenanganan.addEventListener('click', () => {
    formPrediksi.classList.add('hidden');
    loader.classList.remove('hidden');

    setInterval(() => {
        formPenanganan.classList.remove('hidden');
        loader.classList.add('hidden');
    }, 2000);
    
})