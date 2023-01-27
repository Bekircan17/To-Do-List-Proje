const yeniGorev = document.querySelector('.input-gorev');

const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');

const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);

gorevListesi.addEventListener('click', gorevSilTamamla);

document.addEventListener('DOMContentLoaded', localStorageOku);


function gorevSilTamamla(e){
    const tiklanilanEleman = e.target;

    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){

        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi'); 
        
    }


    if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
        tiklanilanEleman.parentElement.classList.toggle('kaybol');


        if(confirm('Silmek istediğinize emin misiniz?')){

            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev);

            tiklanilanEleman.parentElement.addEventListener('transitionend', function(){

                tiklanilanEleman.parentElement.remove();

            });
        }
    }
}

function gorevItemOlustur(gorev){
   
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);

    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML = '<i class="fa fa-check-square" aria-hidden="true"></i>';
    gorevDiv.appendChild(gorevTamamBtn);
   

    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    gorevDiv.appendChild(gorevSilBtn);
    

    gorevListesi.appendChild(gorevDiv);
}

function gorevEkle(e){
    e.preventDefault();


    if(yeniGorev.value.length> 0){

        gorevItemOlustur(yeniGorev.value);
     
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value='';
    }else{
        alert('Boş görev tanımı olamaz');
    }

   
}





function localStorageKaydet(yeniGorev){
    let gorevler = localStorageArrayeDonustur();

    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStorageOku(){
    let gorevler = localStorageArrayeDonustur();

   


    gorevler.forEach(function(gorev){
        gorevItemOlustur(gorev);
        
    });
}

function localStorageArrayeDonustur(){
    let gorevler;

    if(localStorage.getItem('gorevler')=== null){
        gorevler = [];
    }else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;

}
function localStorageSil(gorev){
    let gorevler = localStorageArrayeDonustur();

   

    
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex, 1); 

    localStorage.setItem('gorevler', JSON.stringify(gorevler));

    


}