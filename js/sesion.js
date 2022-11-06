const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const Nconexion = document.querySelectorAll('.Nconexion')
var myModal = new bootstrap.Modal(document.getElementById('SigninModal'), {})
var email, uid;

const logincheck = user => {
    if (user) {
        loggedInLinks.forEach(link => link.style.display = 'inline');
        loggedOutLinks.forEach(link => link.style.display = 'none');
        Nconexion.forEach(link => link.style.display = 'none');
    } else {
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'inline');
        Nconexion.forEach(link => link.style.display = 'none');
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('sesion iniciada')
        logincheck(user);
        obtenerifuser();
    } else {
        console.log('sesion cerrada')
        logincheck(user);
    }
})

//--------------------------iniciar sesion-----------------------------------
const signinForm = document.querySelector('#login-form')

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#loginemail').value
    const password = document.querySelector('#loginpassword').value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log('logeado')
            const user = userCredential.user;
            //limpiar formulario
            signinForm.reset();
            //Cerrar Modal
            myModal.hide()
            window.location.href = "/tradicionesbacan-project/html/Gestionar.html"
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (error.code == "auth/user-not-found")
                alert("Usuario no registrado")
            if(error.code == "auth/wrong-password")
                alert("Contraseña incorrecta")
            console.log(errorCode)
            console.log(errorMessage)
        });
})

//------------------------Salir------------------
const logout = document.querySelector('.salir')

logout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('sign out')
        window.location.href = "/tradicionesbacan-project/index.html"
    }).catch((error) => {
        // An error happened.
    });
})

function obtenerifuser() {
    const user = firebase.auth().currentUser;
    if (user) {
    const displayName = user.displayName;
    email = user.email;
    uid = user.uid;
    }else
    console.log("no sirvo :'v")
}