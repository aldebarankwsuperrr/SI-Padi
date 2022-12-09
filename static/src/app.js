const btnUpload = document.querySelector('#btnUpload');
const fitur = document.querySelectorAll('.fitur')
const boxForm = document.querySelector('#boxForm');
const btnKembali = document.querySelector('#btnKembali');
const btnCamera = document.querySelector('#btnLive');
const formPrediksi = document.querySelector('.formPrediksi');
const formCamera = document.querySelector('.formCamera');
const judul = document.querySelector('.judul');
const btnAmbil = document.querySelector('#btnKamera'); 
const canvasVideo = document.querySelector("#canvasVideo");
const hasil = document.querySelector(".hasil");
const loader = document.querySelector('.loader');
const fiturBox = document.querySelector('.fiturBox')
const btnPrediksi = document.querySelector('#btnPrediksi');
const team = document.querySelector('.team')

btnUpload.addEventListener('click', () => {
    fitur.forEach(element => {
        element.classList.add('hidden');
    });
    
    team.classList.add('hidden')
    fiturBox.classList.remove('hidden');
    loader.classList.remove('hidden');
    
    setInterval(() => {
        formPrediksi.classList.remove('hidden');
        loader.classList.add('hidden');
    }, 2000);
    
    judul.innerHTML = ``;

});

btnCamera.addEventListener('click', () => {
    fitur.forEach(element => {
        element.classList.add('hidden');
    });
    team.classList.add('hidden')

    fiturBox.classList.remove('hidden');
    loader.classList.remove('hidden');
    
    setInterval(() => {
        loader.classList.add('hidden');
        location.href='/detect';
    }, 2000);
    
    judul.innerHTML = ``;
    
    // let video = bukaKamera();

    // btnAmbil.addEventListener('click', () => {
    //     takeSnapshot(video);

    //     canvasVideo.classList.toggle('hidden');
    //     canvasVideo.classList.toggle('visible');

    //     hasil.classList.toggle('hidden');
    //     hasil.classList.toggle('visible');
    // })

});


btnKembali.addEventListener('click', () => {
    fitur.forEach(element => {
        element.classList.toggle('hidden');
        element.classList.toggle('visible');
    });

    team.classList.remove('hidden');
    // boxForm.classList.remove('triple');
    // boxForm.classList.add('flex');
    fiturBox.classList.add('hidden');

    formPrediksi.classList.toggle('hidden');
    formPrediksi.classList.toggle('visible');
});

btnPrediksi.addEventListener('click', () => {
    const file = document.querySelector('.file').value;
    
    if(!file){
        alert('Masukan Gambar Terlebih Dahulu!!');
    }
    
})

function check(input){
    const filee = document.querySelector('.file').value;
    const panjang = filee.length;
    
    if(filee.slice(panjang-3, panjang) != 'jpg' && filee.slice(panjang-3, panjang) != 'png' && filee.slice(panjang-4, panjang) != 'jpeg'){
        alert('Extension File Tidak Mendukung!!');
    }else{
        previewFile(input);
    }
}

function previewFile(input){
    var file = $("input[type=file]").get(0).files[0];

    if(file){
      var reader = new FileReader();

      reader.onload = function(){
          $("#previewImg").attr("src", reader.result);
      }

      reader.readAsDataURL(file);
    }

}

// function bukaKamera(){
//     let video = document.querySelector("#video-webcam");
    
//     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

//     if (navigator.getUserMedia) {
//         navigator.getUserMedia({ video: true }, handleVideo, videoError);
//     }

//     function handleVideo(stream) {
//         video.srcObject = stream;
//         console.log(stream);
//     }

//     function videoError(e) {
//         // do something
//         alert("Izinkan menggunakan webcam untuk demo!")
//     }
//     return video;
// }

// function takeSnapshot(video) {
//     var img = document.querySelector('.snap');
//     let file = document.querySelector('.filee');
//     var context;
//     var width = video.offsetWidth
//             , height = video.offsetHeight;

//     canvas = document.createElement('canvas');
//     canvas.width = width;
//     canvas.height = height;

//     context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0, width, height);

//     img.src = canvas.toDataURL('image/png');
//     file.setAttribute('value', img.src);
//     console.log(file.value)
    
// }