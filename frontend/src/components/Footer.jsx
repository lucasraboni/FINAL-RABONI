const Footer = () => {
    return (
        <footer className="container-fluid py-4 bg-dark mt-5">
            <div className="container-xxl">
                <h2 className="mb-4 fs-2 text-center fw-bold">Datos del Alumno</h2>
                <div className="row text-center text-md-start align-items-center">
                    <div className="col-md-4 col-12 mb-3">
                        <h3 className="fs-4 bs-purpura">Información</h3>
                        <p className="fs-5 mb-1">Lucas Raboni</p>
                        <p className="fs-5 mb-1">30 / 04 / 2003</p>
                        <p className="fs-5 mb-0">lucasraboni7@gmail.com</p>
                    </div>
                    <div className="col-md-4 col-12 text-center mb-3">
                        <img className="img-fluid foto-personal" src={`${import.meta.env.VITE_API_URL}/img/foto-personal-2.jpg`} alt="Lucas Raboni" />
                    </div>
                    <div className="col-md-4 col-12 mb-3">
                        <h3 className="fs-4 bs-purpura">Contacto</h3>
                        <p className="fs-5 mb-1">Teléfono: +54 2325 561252</p>
                        <p className="fs-5 mb-1">San Andres de Giles, Buenos Aires, Argentina</p>
                        <div className="text-uppercase">
                            <a href="https://www.facebook.com/LucasRaboni94/" className="me-2 links" target="_blank">Facebook</a>
                            <a href="https://twitter.com/Lucasraboni_" className="me-2 links" target="_blank">Twitter</a>
                            <a href="https://www.instagram.com/lucasraboni_/" className="me-2 links" target="_blank">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <hr />
                <p className="fs-6 text-light">© 2026 Todos los derechos reservados</p>
            </div>
        </footer>
    )
}

export default Footer