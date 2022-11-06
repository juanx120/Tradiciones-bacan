const imgproduct = document.querySelector('#idimagen')
const selecionarch = document.querySelector('#btnimagen')
const NProduct = document.querySelector('#btnNuevo')
var AProcucto

NProduct.addEventListener('click',(e)=>{
    AProcucto = true;
    selecionarch.value="";
    imPro.src= "https://via.placeholder.com/200";
    btiPro.required=true;
    IdPro.value = "";
    IdPro.disabled= false;
    NomPro.value="";
    PrePro.value="";
    document.getElementById("desmodal").value="";
    $('#ModalAgre').modal('show');
})

selecionarch.addEventListener('change', (e) => {
    e.preventDefault();
    const archivo=selecionarch.files[0]
    imgproduct.src=URL.createObjectURL(archivo);
})

function agregarproducto()
{
    var Descripcion = DesPro.value.split("\n")
    var Precio=PrePro.value.split('.').join('');
    Precio=parseInt(Precio)
    var datosG={
        'Nombre':NomPro.value,
        'Precio':Precio,
        'Descripcion':Descripcion
    };
    guardarenfirebase(datosG);
    guardarimagen();
    console.log(Descripcion,"Producto agragado")
}

function guardarenfirebase(data){
    db.collection("Productos").doc(IdPro.value).set(data)
    .then(() => {
        guardarimagen();
        $('#ModalAgre').modal('hide');
        alert("Producto guardado");
    })
    .catch((error) => {
        alert("Error al guardar");
        console.error("Error writing document: ", error);
    })
    
}

var metadata = {
    contentType: 'image/jpeg'
};

function guardarimagen(){
    var file=selecionarch.files[0]
    var uploadTask = storage.ref('Imagenes productos/' + IdPro.value).put(file, metadata);
    uploadTask.on('state_changer', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        alert(error);
    }, function() {
        console.log('Imagen subida a firebase')
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            db.collection("Productos").doc(IdPro.value).update({ Imagen: downloadURL })
        });
    });
}