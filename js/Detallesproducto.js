function escribirmodal(id_producto) {
    console.log("id producto", id_producto);
    titulomodal.innerHTML = '';
    titulomodal2.innerHTML = '';
    modalcontenidoI.innerHTML = '';
    modaldescripcion.innerHTML = '';
    precio.innerHTML = '';
    db.collection("Productos").doc(id_producto).get().then((doc) => {
        titulomodal.innerHTML = `
        ${doc.id}:
        `;
        modalcontenidoI.innerHTML = `
            <img class="imgproductD" src="${doc.data().Imagen}" alt="">
        `;

        titulomodal2.innerHTML = `
        ${doc.data().Nombre}
        `
        precio.innerHTML = `
            <b>Precio: $${doc.data().Precio}</b>
        `

        botonesdetalles.innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button class="boton_agregar" data-id="${doc.id}" data-bs-dismiss="modal">Agregar al carrito</button>
        `

        const btn_agregar = document.querySelectorAll('.boton_agregar')
        btn_agregar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log(e.target.dataset.id)
                btn_agregar_detalles(e,e.target.dataset.id);
            })
        })

        console.log(doc.data().Descripcion.length)

        for (var i = 0; i < doc.data().Descripcion.length; i++) {
            modaldescripcion.innerHTML += `
                <li>
                ${doc.data().Descripcion[i]}
                </li>
            `
        }
    });
}