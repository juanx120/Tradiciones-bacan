var Nusuario = document.querySelector('.Nuser')
var Ccards = document.querySelector('#card-container')


const loginchec = user =>{
    if(user){
        console.log(email, uid)
        Nusuario.innerHTML = '';
        Nusuario.innerHTML += `
            <h2>Hola ${user.email}</h2>
        `;
        Ccards.hidden = false;
    }
    else{
    Nusuario.innerHTML = '';
    Nusuario.innerHTML += `
        <h1>No ha iniciado sesion</h1>
    `;
    Ccards.hidden = true;
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        loginchec(user);
    } else {
        loginchec(user);
    }
})