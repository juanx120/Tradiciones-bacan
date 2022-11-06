var db = firebase.firestore();
const form = document.querySelector('#formulario')
var quejas = [];



function addquejaToSystem(pnombre, pcelular, pcorreo, pasunto, pdescripcion) {
    var newqueja = {
        nombre: pnombre,
        celular: pcelular,
        correo: pcorreo,
        asunto: pasunto,
        descripcion: pdescripcion,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    };
    db.collection("Contactenos").doc().set(newqueja).then(() => {
        console.log(newqueja);
    }).catch((err) => {
        console.log("error");
    });;
}

form.addEventListener('submit', (e) => {
    snombre = document.querySelector('#txtnombre').value,
        scelular = document.querySelector('#txtcelular').value,
        scorreo = document.querySelector('#txtcorreo').value,
        sasunto = document.querySelector('#txtasunto').value,
        sdescripcion = document.querySelector('#txtdescripcion').value;
    addquejaToSystem(snombre, scelular, scorreo, sasunto, sdescripcion);
})

