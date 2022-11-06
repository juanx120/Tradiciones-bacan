var imPro = document.querySelector('#idimagen')
var btiPro = document.querySelector('#btnimagen')
var IdPro = document.querySelector('#iDmodal')
var NomPro = document.querySelector('#nombremodal')
var PrePro = document.querySelector('#presmodal')
var DesPro =document.getElementById("desmodal")
var TConf = document.querySelector('#TituloConfirm')
var BConfir=document.querySelector('#BodyConfirm')
var ProID, ProNom, Propre, ProDes, modificarnombre, modificarprecio, modificardescripcion, modificarimagen;

function Modificarprod(id_producto) {
    console.log("id producto", id_producto);
    db.collection("Productos").doc(id_producto).get().then((doc) => {
        selecionarch.value="";
        AProcucto=false;
        imPro.src=doc.data().Imagen;
        btiPro.required=false;
        IdPro.value = ProID = doc.id;
        IdPro.disabled= true;
        NomPro.value= ProNom = doc.data().Nombre;
        PrePro.value= Propre= doc.data().Precio;
        ProDes = doc.data().Descripcion;
        document.getElementById("desmodal").value="";
        for(x=0;x<doc.data().Descripcion.length;x++)
        {
            if(x!=doc.data().Descripcion.length-1)
                DesPro.value+=doc.data().Descripcion[x]+"\n";
            else
                DesPro.value+=doc.data().Descripcion[x];
        }
        $('#ModalAgre').modal('show');
    });
}

function actualizarP(){
    modificarnombre = modificarprecio = modificardescripcion = modificarimagen = false;
    console.log(ProID, ProNom, Propre, ProDes)
    TConf.innerHTML = '';
    TConf.innerHTML = `Confirmar actualizacion del producto: ${ProID}`
    BConfir.innerHTML = '';
    BConfir.innerHTML =`Los datos que se van a actualizar son:`;
    if(ProNom != NomPro.value){
        modificarnombre=true;
        BConfir.innerHTML +=`<br>Nombre del producto`;
    }
    Precio=PrePro.value.split('.').join('');
    if(Propre != Precio){
        modificarprecio=true;
        BConfir.innerHTML +=`<br>Precio del producto`;
    }
    var Descripcion = DesPro.value.split("\n")
    if(ProDes.length != Descripcion.length)
        modificardescripcion=true;
    else{
        for(x=0;x<ProDes.length;x++)
            if(ProDes[x] != Descripcion[x] )
                modificardescripcion=true;
        }
    if(modificardescripcion)
        BConfir.innerHTML +=`<br>Descripcion del producto`;
    if(selecionarch.value != ""){
        modificarimagen=true;
        BConfir.innerHTML +=`<br>Imagen del producto`;
    }
    if(!modificarprecio && !modificarnombre && !modificarimagen && !modificardescripcion)
        BConfir.innerHTML +=`<br>No va a modificar nada`;
    else{
        BConfir.innerHTML +=`<br><button type="button" class="btn-confirmar-actualizacion">Confirmar cambios</button>`;
        var btnact = document.querySelector('.btn-confirmar-actualizacion')
        btnact.addEventListener('click', (e) =>{
            e.preventDefault();
            actualizarafirbase();
        });
    }
    $('#Confirmacion').modal('show');
}

function actualizarafirbase(){
    if(modificarprecio){
        Precio=PrePro.value.split('.').join('');
        Precio=parseInt(Precio)
        db.collection("Productos").doc(IdPro.value).update({Precio: Precio})
    }
    if(modificarnombre)
        db.collection("Productos").doc(IdPro.value).update({Nombre: NomPro.value})
    if(modificardescripcion){
        var Descripcion = DesPro.value.split("\n")
        db.collection("Productos").doc(IdPro.value).update({Descripcion: Descripcion})
    }
    if(modificarimagen){
        actualizarimagen();
    }
    alert("Datos actualizados")
    $('#Confirmacion').modal('hide');
    $('#ModalAgre').modal('hide');
}

function actualizarimagen(){
    var desertRef = storage.ref('Imagenes productos/' + IdPro.value);
    desertRef.delete().then(function() {
        // File deleted successfully
        guardarimagen();
    }).catch(function(error) {
        // Uh-oh, an error occurred!
        alert("No se ha podido actulizar la imagen")
    });
}

PrePro.addEventListener('input' || 'change', (e)=>{
    var Precio=e.target.value;
    Precio=Precio.toString()
    Precio=Precio.split('.').join('');
    Precio=Precio.split('').reverse();
    var paginador=Math.ceil(Precio.length/3);
    var salida=[];
    var p;
    var aux='';
    for(let i=0;i<paginador;i++){
        for(let j=0;j<3;j++){
            if(Precio[j+(i*3)]!=undefined)
            aux+=Precio[j+(i*3)];
        }
        salida.push(aux);
        aux='';
        e.target.value=salida.join('.').split("").reverse().join('');
    }
})