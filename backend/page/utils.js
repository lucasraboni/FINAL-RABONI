// Funcion que arma el HTML base
export function createPage(content) {
    let html = ''
    html += `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vinyl Vibes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&family=Saira+Condensed:wght@100;300;400;700&display=swap" rel="stylesheet">
    <link href="/css/style.css" rel="stylesheet">
</head>
<body>
    <header class="container-fluid py-2">
        <div class="container-xxl px-3 px-xxl-0 d-flex flex-column flex-md-row justify-content-md-between align-items-center">
            <h1 class="fs-1 text-black fw-bold text-uppercase">Vinyl Vibes</h1>
            <img class="d-none d-md-block m-2 logo-vinilo" src="/img/logo-vinyl.png" alt="logo">
        </div>
        <nav class="navbar navbar-expand-lg text-uppercase">
            <div class="container-xxl px-3 px-xxl-0">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarMain">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="/nosotros.html">Nosotros</a></li>
                        <li class="nav-item"><a class="nav-link" href="/vinilos/agregar">+ Agregar Vinilo</a></li>
                        <li class="nav-item"><a class="nav-link" href="/artistas/agregar">+ Agregar Artista</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Géneros</a>
                            <ul class="dropdown-menu bg-dark">
                                <li><a class="dropdown-item text-white" href="/genero/techno">Techno</a></li>
                                <li><a class="dropdown-item text-white" href="/genero/progressive">Progressive</a></li>
                                <li><a class="dropdown-item text-white" href="/genero/minimal">Minimal</a></li>
                                <li><a class="dropdown-item text-white" href="/genero/house">House</a></li>
                                <li><a class="dropdown-item text-white" href="/genero/trance">Trance</a></li>
                            </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="/contacto.html">Contacto</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    ${content}
    <footer class="container-fluid py-4 bg-dark">
        <div class="container-xxl">
            <h2 class="mb-4 fs-2 text-center fw-bold">Datos del Alumno</h2>
            <div class="row text-center text-md-start align-items-center">
                <div class="col-md-4 col-12 mb-3">
                    <h3 class="fs-4 bs-purpura">Informacion</h3>
                    <p class="fs-5 mb-1">Lucas Raboni</p>
                    <p class="fs-5 mb-1">30 / 04 / 2003</p>
                    <p class="fs-5 mb-0">lucasraboni7@gmail.com</p>
                </div>
                <div class="col-md-4 col-12 text-center mb-3">
                    <img class="img-fluid" src="/img/foto-personal-2.jpg" style="max-width:250px;" alt="imagen del autor">
                </div>
                <div class="col-md-4 col-12 mb-3">
                    <h3 class="fs-4 bs-purpura">Contacto</h3>
                    <p class="fs-5 mb-1">Teléfono: +54 2325 561252</p>
                    <p class="fs-5 mb-1">Dirección: San Andres de Giles, Buenos Aires, Argentina</p>
                    <div class="text-uppercase">
                        <a href="https://www.facebook.com/LucasRaboni94/" class="me-2 links" target="_blank">Facebook</a>
                        <a href="https://twitter.com/Lucasraboni_" class="me-2 links" target="_blank">Twitter</a>
                        <a href="https://www.instagram.com/lucasraboni_/" class="me-2 links" target="_blank">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-4"><hr><p class="fs-6 text-light">© 2026 Todos los derechos reservados</p></div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`
    return html
}