var Nusuario = document.querySelector('.Nuser')
const TTA=document.querySelector('#divcotiza')
const db = firebase.firestore();
var tabla = document.getElementById('datosTabla')
var TConf = document.querySelector('#TituloConfirm')
var BConfir=document.querySelector('#BodyConfirm')

const loginchec = user =>{
    if(user){
        obtenerifuser()
        console.log(email, uid)
        Nusuario.innerHTML = '';
        Nusuario.innerHTML += `
            <h2>Hola ${user.email}</h2>
        `;
        TTA.hidden=false;
    }
    else{
    Nusuario.innerHTML = '';
    Nusuario.innerHTML += `
        <h1>No ha iniciado sesion</h1>
    `;
    TTA.hidden=true;
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        obtenerifuser();
        loginchec(user);
        llenartabla()
    } else {
        loginchec(user);
    }
})


//------------------------------------ Datos de la tabla---------------------------------

function llenartabla(){
    db.collection('Cotizaciones').onSnapshot((snapshot) => {
        tabla.innerHTML = '';
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            tabla.innerHTML += `
            <tr>
                    <td class="IDC"> ${doc.id} </td>
                    <td> ${doc.data().nombre} </td>
                    <td> ${doc.data().apellido} </td>
                    <td> ${doc.data().email} </td>
                    <td> ${doc.data().telefono} </td>
                    <td id="CanP${doc.id}"></td>
                    <td> ${doc.data().precio} </td>
                    <td id="F${doc.id}"></td>
                    <td><button class="material-icons btnBorrar" data-id="${doc.id}" title="Borrar">delete_forever</button></td>
            </tr>
            `;
            var fecha = new Date(doc.data().fecha.seconds * 1000);
            var fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
            var hora = new Date(doc.data().fecha.seconds * 1000);
            var horaFormateada = `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;
            var mensaje=fechaFormateada+" "+horaFormateada;
            var HoraT=document.getElementById("F"+doc.id);
            HoraT.innerHTML=`${mensaje}`;
            var productos = document.getElementById("CanP"+doc.id);
            for(x=0;x<doc.data().CantidadProductos.length;x++)
            {
                if(x!=doc.data().CantidadProductos.length-1)
                    productos.innerHTML +=`${doc.data().ProductosTotal[x]}: 
                    ${doc.data().CantidadProductos[x]}</br>`;
                else
                    productos.innerHTML +=`${doc.data().ProductosTotal[x]}: 
                    ${doc.data().CantidadProductos[x]}`;
            }

            const btn_borrar = document.querySelectorAll('.btnBorrar')
            btn_borrar.forEach(btn =>{
                btn.addEventListener('click', (e)=>{
                console.log("Npro", e.target.dataset.id)
                Borrarprod(e.target.dataset.id);
                })
            })
        })
    });
}
$(document).ready(function() {
    $("#Codigo").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#datosTabla tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function Borrarprod(IDborrar){
    if(IDborrar != undefined){
        TConf.innerHTML = '';
        TConf.innerHTML = `Confirmar cotizacion a borrar: ${IDborrar}`
        BConfir.innerHTML = '';
        BConfir.innerHTML =`Va a borrar la cotizacion con id: ${IDborrar}<br>Recuerde que la cotizacion se eliminara de forma definitiva
                            <br><input type="checkbox" id="confborrar" placeholder="confirmar">
                            ¿Acepta eliminar el producto?
                            <br><button type="button" class="btn-conf-borrar" disabled>Borrar producto</button>`;
        var confbo = document.querySelector('#confborrar')
        var btnborr = document.querySelector('.btn-conf-borrar')
        confbo.addEventListener('change', (e)=> {
            if(confbo.checked == true)
                btnborr.disabled = false;
            else
                btnborr.disabled = true;
        })
        btnborr.addEventListener('click',(e)=>{
            e.preventDefault();
            borrardefirebase(IDborrar);
        })
        $('#Confirmacion').modal('show');
    }
}

function borrardefirebase(IDborrar){
    db.collection("Cotizaciones").doc(IDborrar).delete().then(() => {
        console.log("Document successfully deleted!"); 
        //alert("Cotizacion borrada");
        $('#Confirmacion').modal('hide');
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}