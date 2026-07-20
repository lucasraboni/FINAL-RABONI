// PAGE VIEWS
import { createPage } from '../page/utils.js'

// PAGINA DE GENERO
export function createGeneroPage(genero, vinilos) {
    let html = `<section class="container-xxl my-4 px-0">
        <h2 class="mb-3 fs-2 p-1 text-center bg-dark fw-bold">${genero}</h2>`

    if (vinilos.length === 0) {
        html += `<p class="text-center p-4">No hay vinilos en esta categoría todavía.</p>`
    } else {
        html += `<div class="mx-3 mx-xxl-0 px-2 pt-4 bg-dark row">`
        vinilos.forEach(v => {
            html += `<div class="mb-4 col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="text-center bg-black p-2">
                    <div class="image-container" style="width:100%;aspect-ratio:1/1;overflow:hidden;position:relative;">
                        <img class="img-fluid" style="width:100%;height:100%;object-fit:cover;display:block;" src="/img/${v.portada}" alt="${v.titulo}">
                        <img class="img-fluid hover-image" style="width:100%;height:100%;object-fit:cover;display:block;position:absolute;top:0;left:0;" src="/img/${v.foto_artista}" alt="${v.titulo}">
                    </div>
                    <div class="flex-column">
                        <h3 class="mt-2 mb-1 fs-2 fw-bold text-uppercase bs-purpura">${v.artista}</h3>
                        <h4 class="fs-5 mb-2">${v.titulo}</h4>
                        <ul class="px-1 list-unstyled">
                            <li><p class="descripcion-tarjeta px-3 fs-6 text-start">${v.descripcion}</p></li>
                            <li><p class="fs-6 text-start"><strong>Género:</strong> ${v.generos.join(', ')}</p></li>
                            <li><p class="fs-6 text-start"><strong>Lanzamiento:</strong> ${v.lanzamiento}</p></li>
                            <li><p class="fs-6 text-start"><strong>País:</strong> ${v.pais}</p></li>
                            <li><p class="fs-4 fw-bold">$${v.precio.toFixed(2)}</p></li>
                            <li class="mt-2 d-flex gap-2">
                                <a href="/vinilo/${v._id}" class="fs-6 fw-bold text-white text-uppercase btn btn-dark flex-fill">Ver</a>
                                <a href="/vinilos/editar/${v._id}" class="fs-6 fw-bold text-white text-uppercase btn btn-admin flex-fill">Editar</a>
                                <a href="/vinilos/borrar/${v._id}" class="fs-6 fw-bold text-white text-uppercase btn btn-danger flex-fill">Borrar</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`
        })
        html += `</div>`
    }
    html += `</section>`
    return createPage(html)
}

// PAGINA DE DETALLE DE UN VINILO
export function createViniloPage(vinilo) {
    let html = `<section class="container-xxl my-4 px-0">
        <h2 class="mb-3 fs-2 p-1 text-center bg-dark fw-bold">${vinilo.titulo}</h2>
        <div class="row bg-dark p-4 mx-0">
            <div class="col-md-6 text-center">
                <div style="width:400px;max-width:100%;aspect-ratio:1/1;overflow:hidden;margin:0 auto;">
                    <img src="/img/${vinilo.portada}" alt="${vinilo.titulo}" style="width:100%;height:100%;object-fit:cover;display:block;">
                </div>
                <p class="fs-4 fw-bold mt-3">$${vinilo.precio.toFixed(2)}</p>
            </div>
            <div class="col-md-6">
                <h3 class="bs-purpura">${vinilo.artista}</h3>
                <p class="fs-6 text-start"><strong>Género:</strong> ${vinilo.generos.join(', ')}</p>
                <p><strong>País:</strong> ${vinilo.pais}</p>
                <p><strong>Lanzamiento:</strong> ${vinilo.lanzamiento}</p>
                <p class="mt-3">${vinilo.descripcion}</p>
                <div class="mt-3 d-flex gap-2 flex-wrap">
                    <a href="${vinilo.link}" target="_blank" class="btn btn-admin">Ver en Spotify</a>
                    <a href="/vinilos/editar/${vinilo._id}" class="btn btn-admin">Editar</a>
                    <a href="/vinilos/borrar/${vinilo._id}" class="btn btn-danger">Borrar</a>
                    <a href="/genero/${vinilo.generos[0]}" class="btn btn-dark">Volver</a>
                </div>
            </div>
        </div>
    </section>`
    return createPage(html)
}

// FORMULARIO - AGREGAR VINILO
export function createViniloForm(artistas = []) {
    let html = `<section class="container-xxl my-4 px-0">
        <h2 class="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Agregar Vinilo</h2>
        <form action="/vinilos/agregar" method="post" class="p-4 bg-dark">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Título</label>
                    <input type="text" name="titulo" class="form-control" required placeholder="Nombre del vinilo">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Artista</label>
                    <select name="artista" class="form-select" required>
                        <option disabled selected value="">Seleccionar artista...</option>
                        ${artistas.map(a => `<option value="${a.nombre}">${a.nombre}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Precio</label>
                    <input type="number" name="precio" class="form-control" required placeholder="Ej: 29.99" step="0.01">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Género</label>
                    <select name="genero" class="form-select" required>
                        <option disabled selected value="">Seleccionar género...</option>
                        <option value="techno">Techno</option>
                        <option value="progressive">Progressive</option>
                        <option value="minimal">Minimal</option>
                        <option value="house">House</option>
                        <option value="trance">Trance</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">País</label>
                    <input type="text" name="pais" class="form-control" required placeholder="Ej: Alemania">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Lanzamiento</label>
                    <input type="text" name="lanzamiento" class="form-control" required placeholder="Ej: Enero 2024">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Portada (nombre del archivo)</label>
                    <input type="text" name="portada" class="form-control" required placeholder="Ej: MiVinilo.jpg">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Link Spotify</label>
                    <input type="text" name="link" class="form-control" required placeholder="https://open.spotify.com/...">
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label fs-5 bs-purpura">Descripción</label>
                    <textarea name="descripcion" class="form-control" rows="3" required placeholder="Descripción del vinilo"></textarea>
                </div>
            </div>
            <button type="submit" class="btn btn-admin fs-5 fw-bold text-uppercase">Agregar</button>
            <a href="/" class="btn btn-dark fs-5 fw-bold text-uppercase ms-2">Cancelar</a>
        </form>
    </section>`
    return createPage(html)
}

// FORMULARIO - EDITAR VINILO
export function editViniloForm(vinilo, artistas = []) {
    let html = `<section class="container-xxl my-4 px-0">
        <h2 class="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Editar Vinilo</h2>
        <form action="/vinilos/editar/${vinilo._id}" method="post" class="p-4 bg-dark">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Título</label>
                    <input type="text" name="titulo" class="form-control" required value="${vinilo.titulo}">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Artista</label>
                    <select name="artista" class="form-select" required>
                        ${artistas.map(a => `<option value="${a.nombre}" ${vinilo.artista === a.nombre ? 'selected' : ''}>${a.nombre}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Precio</label>
                    <input type="number" name="precio" class="form-control" required value="${vinilo.precio}" step="0.01">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Género</label>
                    <select name="genero" class="form-select" required>
                        <option value="techno" ${vinilo.generos[0] === 'techno' ? 'selected' : ''}>Techno</option>
                        <option value="progressive" ${vinilo.generos[0] === 'progressive' ? 'selected' : ''}>Progressive</option>
                        <option value="minimal" ${vinilo.generos[0] === 'minimal' ? 'selected' : ''}>Minimal</option>
                        <option value="house" ${vinilo.generos[0] === 'house' ? 'selected' : ''}>House</option>
                        <option value="trance" ${vinilo.generos[0] === 'trance' ? 'selected' : ''}>Trance</option>
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">País</label>
                    <input type="text" name="pais" class="form-control" required value="${vinilo.pais}">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Lanzamiento</label>
                    <input type="text" name="lanzamiento" class="form-control" required value="${vinilo.lanzamiento}">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Portada</label>
                    <input type="text" name="portada" class="form-control" required value="${vinilo.portada}">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Link Spotify</label>
                    <input type="text" name="link" class="form-control" required value="${vinilo.link}">
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label fs-5 bs-purpura">Descripción</label>
                    <textarea name="descripcion" class="form-control" rows="3" required>${vinilo.descripcion}</textarea>
                </div>
            </div>
            <button type="submit" class="btn btn-admin fs-5 fw-bold text-uppercase">Guardar</button>
            <a href="/vinilo/${vinilo._id}" class="btn btn-dark fs-5 fw-bold text-uppercase ms-2">Cancelar</a>
        </form>
    </section>`
    return createPage(html)
}

// FORMULARIO - CONFIRMAR BORRADO
export function deleteViniloForm(vinilo) {
    let html = `<section class="container-xxl my-4 px-0">
        <h2 class="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Borrar Vinilo</h2>
        <div class="p-4 bg-dark text-center">
            <img src="/img/${vinilo.portada}" style="max-width:300px; border-radius:8px;" class="mb-4">
            <h3 class="bs-purpura">${vinilo.titulo}</h3>
            <p class="fs-5">¿Estás seguro que querés borrar este vinilo?</p>
            <form action="/vinilos/borrar/${vinilo._id}" method="post">
                <button type="submit" class="btn btn-danger fs-5 fw-bold text-uppercase me-2">Sí, borrar</button>
                <a href="/vinilo/${vinilo._id}" class="btn btn-dark fs-5 fw-bold text-uppercase">Cancelar</a>
            </form>
        </div>
    </section>`
    return createPage(html)
}

// FORMULARIO - AGREGAR ARTISTA
export function createArtistaForm(ok = false) {
    let html = `<section class="container-xxl my-4 px-0">
        <h2 class="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Agregar Artista</h2>
        ${ok ? `<div class="alert alert-success mx-4">Artista agregado correctamente!</div>` : ''}
        <form action="/artistas/agregar" method="post" class="p-4 bg-dark">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Nombre</label>
                    <input type="text" name="nombre" class="form-control" required placeholder="Nombre del artista">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label fs-5 bs-purpura">Foto (nombre del archivo)</label>
                    <input type="text" name="foto" class="form-control" required placeholder="Ej: artista.jpg">
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label fs-5 bs-purpura">Descripción</label>
                    <textarea name="descripcion" class="form-control" rows="3" required placeholder="Biografía del artista"></textarea>
                </div>
            </div>
            <button type="submit" class="btn btn-admin fs-5 fw-bold text-uppercase">Agregar</button>
            <a href="/" class="btn btn-dark fs-5 fw-bold text-uppercase ms-2">Cancelar</a>
        </form>
    </section>`
    return createPage(html)
}

// PAGINA DE GRACIAS
export function createGraciasPage() {
    let html = `<section class="container-xxl my-4 px-0 text-center py-5">
        <h2 class="bs-purpura fs-1">¡Gracias por contactarte!</h2>
        <p class="fs-4 mt-3">Tu mensaje fue recibido. Te respondemos a la brevedad.</p>
        <a href="/" class="btn btn-admin mt-4">Volver al inicio</a>
    </section>`
    return createPage(html)
}

// PAGINA 404
export function create404Page() {
    let html = `<section class="container-xxl my-4 px-0 text-center py-5">
        <h2 class="bs-purpura" style="font-size:4rem;">404</h2>
        <p class="fs-4">Página no encontrada.</p>
        <a href="/" class="btn btn-admin mt-3">Volver al inicio</a>
    </section>`
    return createPage(html)
}
