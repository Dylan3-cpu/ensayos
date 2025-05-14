// script.js
// Variables globales
let personajesDC = []
let personajesMarvel = []
let modoJuego = ""
let universoSeleccionado = ""
let personajeSeleccionado1 = null
let personajeSeleccionado2 = null
let turnoJugador1 = true
let vidaInicial1 = 100
let vidaInicial2 = 100
const estadisticasCombate = {
  dañoRealizado: 0,
  dañoRecibido: 0,
  ataquesCriticos: 0,
  ataquesDébiles: 0,
}

// Cargar datos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos desde el JSON-Server
  cargarDatos()

  // Configurar eventos según la página actual
  configurarEventosPagina()
})

// Función para cargar datos desde el JSON-Server
function cargarDatos() {
  // En un entorno real, esto sería una llamada fetch a JSON-Server
  // Para este ejemplo, usaremos datos estáticos

  personajesDC = [
    {
      id: 1,
      nombre: "Batman",
      nombreClave: "Bruce Wayne",
      descripcion:
        "El Caballero Oscuro de Gotham City, un vigilante que lucha contra el crimen utilizando su intelecto, habilidades físicas y tecnología avanzada.",
      imagen: "images/batman.jpg",
      fuerza: 7,
      ataque: 8,
      debilidad: "Psicológica",
      vida: 100,
      universo: "DC", // Añadido para identificar el universo
      trajes: ["Clásico", "Armadura", "Sigilo", "Knightmare", "Táctico"],
      poderes: ["Maestro detective", "Artes marciales", "Tecnología avanzada", "Estratega"],
      historia:
        "Tras presenciar el asesinato de sus padres cuando era niño, Bruce Wayne juró venganza contra los criminales, entrenando física y mentalmente para combatir el mal en Gotham City.",
      ataques: [
        { nombre: "Batarang", daño: 15, tipo: "Distancia", animacion: "batarang" },
        { nombre: "Puñetazo", daño: 20, tipo: "Físico", animacion: "puñetazo" },
        { nombre: "Bomba de humo", daño: 10, tipo: "Área", animacion: "humo" },
        { nombre: "Ataque sorpresa", daño: 25, tipo: "Crítico", animacion: "sorpresa" },
      ],
    },
    {
      id: 2,
      nombre: "Superman",
      nombreClave: "Clark Kent",
      descripcion:
        "El Hombre de Acero, un alienígena de Krypton con poderes sobrehumanos que protege la Tierra como su mayor héroe.",
      imagen: "images/superman.jpg",
      fuerza: 10,
      ataque: 9,
      debilidad: "Kryptonita",
      vida: 100,
      universo: "DC", // Añadido para identificar el universo
      trajes: ["Clásico", "Negro", "Recuperación", "Kryptoniano", "Elite"],
      poderes: ["Super fuerza", "Vuelo", "Visión de calor", "Aliento helado", "Invulnerabilidad"],
      historia:
        "Nacido en el planeta Krypton como Kal-El, fue enviado a la Tierra por sus padres antes de la destrucción de su mundo. Criado como Clark Kent, usa sus poderes para proteger a la humanidad.",
      ataques: [
        { nombre: "Visión de calor", daño: 25, tipo: "Energía", animacion: "calor" },
        { nombre: "Super fuerza", daño: 30, tipo: "Físico", animacion: "fuerza" },
        { nombre: "Aliento helado", daño: 20, tipo: "Hielo", animacion: "hielo" },
        { nombre: "Vuelo supersónico", daño: 35, tipo: "Crítico", animacion: "vuelo" },
      ],
    },
    {
      id: 3,
      nombre: "Wonder Woman",
      nombreClave: "Diana Prince",
      descripcion:
        "Princesa Amazona y guerrera, bendecida por los dioses con habilidades sobrehumanas y destreza en combate.",
      imagen: "images/wonder_woman.jpg",
      fuerza: 9,
      ataque: 8,
      debilidad: "Ataduras",
      vida: 100,
      universo: "DC", // Añadido para identificar el universo
      trajes: ["Clásico", "Armadura", "Amazona", "Dorado", "Casual"],
      poderes: ["Fuerza sobrehumana", "Velocidad", "Vuelo", "Brazaletes deflectores", "Lazo de la verdad"],
      historia:
        "Diana es hija de Hipólita, reina de las Amazonas, y Zeus. Creció en Themyscira antes de partir al mundo de los hombres para combatir el mal y promover la paz.",
      ataques: [
        { nombre: "Lazo de la verdad", daño: 20, tipo: "Mágico", animacion: "lazo" },
        { nombre: "Brazaletes", daño: 15, tipo: "Defensa", animacion: "brazaletes" },
        { nombre: "Espada divina", daño: 25, tipo: "Físico", animacion: "espada" },
        { nombre: "Furia amazona", daño: 30, tipo: "Crítico", animacion: "furia" },
      ],
    },
    {
      id: 4,
      nombre: "Flash",
      nombreClave: "Barry Allen",
      descripcion:
        "El hombre más rápido del mundo, capaz de moverse a velocidades sobrehumanas y manipular la Speed Force.",
      imagen: "images/flash.jpg",
      fuerza: 6,
      ataque: 7,
      debilidad: "Frío",
      vida: 100,
      universo: "DC", // Añadido para identificar el universo
      trajes: ["Clásico", "Futuro", "Velocidad", "Experimental", "Oscuro"],
      poderes: ["Super velocidad", "Viaje en el tiempo", "Faseado molecular", "Lanzamiento de rayos"],
      historia:
        "Barry Allen era un científico forense que adquirió super velocidad tras ser alcanzado por un rayo y bañado en productos químicos. Usa sus poderes para proteger Central City.",
      ataques: [
        { nombre: "Puño supersónico", daño: 20, tipo: "Físico", animacion: "puño" },
        { nombre: "Tornado", daño: 15, tipo: "Área", animacion: "tornado" },
        { nombre: "Viaje en el tiempo", daño: 10, tipo: "Especial", animacion: "tiempo" },
        { nombre: "Velocidad máxima", daño: 30, tipo: "Crítico", animacion: "velocidad" },
      ],
    },
    {
      id: 5,
      nombre: "Aquaman",
      nombreClave: "Arthur Curry",
      descripcion: "Rey de la Atlántida, con fuerza sobrehumana y la capacidad de comunicarse con la vida marina.",
      imagen: "images/aquaman.jpg",
      fuerza: 8,
      ataque: 7,
      debilidad: "Deshidratación",
      vida: 100,
      universo: "DC", // Añadido para identificar el universo
      trajes: ["Clásico", "Rey", "Gladiador", "Atlante", "Casual"],
      poderes: ["Respiración acuática", "Comunicación con vida marina", "Fuerza sobrehumana", "Control del agua"],
      historia:
        "Hijo de un farero humano y una reina atlante, Arthur Curry descubrió sus orígenes y poderes, eventualmente reclamando su lugar como rey de la Atlántida y protector de los océanos.",
      ataques: [
        { nombre: "Tridente", daño: 25, tipo: "Físico", animacion: "tridente" },
        { nombre: "Control marino", daño: 20, tipo: "Agua", animacion: "agua" },
        { nombre: "Llamada a criaturas", daño: 15, tipo: "Invocación", animacion: "criaturas" },
        { nombre: "Furia de los mares", daño: 35, tipo: "Crítico", animacion: "marea" },
      ],
    },
    {
      id: 6,
      nombre: "Green Lantern",
      nombreClave: "Hal Jordan",
      descripcion:
        "Miembro del Cuerpo de Linternas Verdes, utiliza un anillo de poder alimentado por la fuerza de voluntad.",
      imagen: "images/linterna_verde2.jpg",
      fuerza: 7,
      ataque: 8,
      debilidad: "Miedo",
      vida: 100,
      universo: "DC", // Añadido para identificar el universo
      trajes: ["Clásico", "Espectro", "Parallax", "Rebirth", "Piloto"],
      poderes: ["Anillo de poder", "Vuelo", "Creación de constructos", "Escudo de energía"],
      historia:
        "Hal Jordan era un piloto de pruebas que recibió un anillo de poder de un Linterna Verde moribundo. Se convirtió en el protector del Sector 2814 como miembro del Cuerpo de Linternas Verdes.",
      ataques: [
        { nombre: "Puño de energía", daño: 20, tipo: "Energía", animacion: "puño-energia" },
        { nombre: "Ametralladora", daño: 15, tipo: "Distancia", animacion: "ametralladora" },
        { nombre: "Escudo", daño: 10, tipo: "Defensa", animacion: "escudo" },
        { nombre: "Voluntad absoluta", daño: 30, tipo: "Crítico", animacion: "voluntad" },
      ],
    },
  ]

  personajesMarvel = [
    {
      id: 1,
      nombre: "Iron Man",
      nombreClave: "Tony Stark",
      descripcion:
        "Genio inventor y multimillonario que creó una armadura de alta tecnología para salvar su vida y combatir el mal.",
      imagen: "images/ironman.jpg",
      fuerza: 8,
      ataque: 9,
      debilidad: "Energía",
      vida: 100,
      universo: "MARVEL", // Añadido para identificar el universo
      trajes: ["Mark III", "Hulkbuster", "Nanotecnología", "Bleeding Edge", "Extremis"],
      poderes: ["Inteligencia superior", "Armadura tecnológica", "Vuelo", "Armas de energía"],
      historia:
        "Tony Stark, un genio inventor y CEO de Stark Industries, fue secuestrado y obligado a construir un arma. En su lugar, creó una armadura para escapar y se convirtió en Iron Man para proteger al mundo.",
      ataques: [
        { nombre: "Repulsor", daño: 20, tipo: "Energía", animacion: "repulsor" },
        { nombre: "Misiles", daño: 25, tipo: "Explosivo", animacion: "misiles" },
        { nombre: "Láser", daño: 15, tipo: "Precisión", animacion: "laser" },
        { nombre: "Unibeam", daño: 35, tipo: "Crítico", animacion: "unibeam" },
      ],
    },
    {
      id: 2,
      nombre: "Thor",
      nombreClave: "Thor Odinson",
      descripcion: "Dios del Trueno asgardiano que empuña el martillo encantado Mjolnir y controla el poder del rayo.",
      imagen: "images/thor.jpg",
      fuerza: 10,
      ataque: 9,
      debilidad: "Magia",
      vida: 100,
      universo: "MARVEL", // Añadido para identificar el universo
      trajes: ["Asgardiano", "Gladiador", "Rey", "Unworthy", "Ultimate"],
      poderes: ["Fuerza sobrehumana", "Control del rayo", "Vuelo", "Longevidad", "Resistencia"],
      historia:
        "Thor es el hijo de Odín y príncipe de Asgard. Fue enviado a la Tierra para aprender humildad y se convirtió en uno de sus mayores defensores, usando su martillo Mjolnir para controlar el trueno.",
      ataques: [
        { nombre: "Mjolnir", daño: 25, tipo: "Contundente", animacion: "martillo" },
        { nombre: "Relámpago", daño: 30, tipo: "Eléctrico", animacion: "rayo" },
        { nombre: "Stormbreaker", daño: 28, tipo: "Cortante", animacion: "hacha" },
        { nombre: "Furia de Asgard", daño: 40, tipo: "Crítico", animacion: "tormenta" },
      ],
    },
    {
      id: 3,
      nombre: "Spider-Man",
      nombreClave: "Peter Parker",
      descripcion:
        "Joven héroe con habilidades arácnidas que equilibra su vida de superhéroe con sus responsabilidades personales.",
      imagen: "images/spiderman.jpg",
      fuerza: 7,
      ataque: 8,
      debilidad: "Responsabilidad",
      vida: 100,
      universo: "MARVEL", // Añadido para identificar el universo
      trajes: ["Clásico", "Simbionte", "Iron Spider", "Stealth", "Future Foundation"],
      poderes: ["Fuerza proporcional", "Agilidad sobrehumana", "Sentido arácnido", "Trepamuros", "Lanzatelarañas"],
      historia:
        "Peter Parker adquirió poderes arácnidos tras ser mordido por una araña radiactiva. Después de la muerte de su tío Ben, aprendió que un gran poder conlleva una gran responsabilidad.",
      ataques: [
        { nombre: "Telaraña", daño: 15, tipo: "Restricción", animacion: "telaraña" },
        { nombre: "Patada", daño: 20, tipo: "Físico", animacion: "patada" },
        { nombre: "Sentido arácnido", daño: 10, tipo: "Evasión", animacion: "sentido" },
        { nombre: "Combo arácnido", daño: 30, tipo: "Crítico", animacion: "combo" },
      ],
    },
    {
      id: 4,
      nombre: "Hulk",
      nombreClave: "Bruce Banner",
      descripcion: "El gigante esmeralda, una entidad de fuerza ilimitada que surge cuando Bruce Banner se enfurece.",
      imagen: "images/hulk.jpg",
      fuerza: 10,
      ataque: 10,
      debilidad: "Control mental",
      vida: 100,
      universo: "MARVEL", // Añadido para identificar el universo
      trajes: ["Clásico", "Gladiador", "Profesor", "Joe Fixit", "Worldbreaker"],
      poderes: ["Fuerza ilimitada", "Regeneración", "Resistencia", "Saltos enormes", "Inmunidad a toxinas"],
      historia:
        "El Dr. Bruce Banner fue expuesto a radiación gamma durante un experimento fallido, lo que le dio la capacidad de transformarse en Hulk cuando se enfada o está en peligro.",
      ataques: [
        { nombre: "Aplastamiento", daño: 35, tipo: "Físico", animacion: "aplastamiento" },
        { nombre: "Salto sísmico", daño: 25, tipo: "Área", animacion: "salto" },
        { nombre: "Rugido", daño: 15, tipo: "Intimidación", animacion: "rugido" },
        { nombre: "Furia incontrolable", daño: 45, tipo: "Crítico", animacion: "furia-hulk" },
      ],
    },
    {
      id: 5,
      nombre: "Captain America",
      nombreClave: "Steve Rogers",
      descripcion:
        "El primer vengador, un super soldado con fuerza, agilidad y resistencia mejoradas que porta un escudo de vibranium.",
      imagen: "images/capitan_america.jpg",
      fuerza: 7,
      ataque: 8,
      debilidad: "Lealtad",
      vida: 100,
      universo: "MARVEL", // Añadido para identificar el universo
      trajes: ["Clásico", "Stealth", "Vengador", "Nómada", "Comandante"],
      poderes: ["Fuerza mejorada", "Agilidad sobrehumana", "Resistencia", "Curación acelerada", "Maestro táctico"],
      historia:
        "Steve Rogers era un joven débil que se ofreció para un experimento gubernamental durante la Segunda Guerra Mundial. El suero del super soldado lo transformó en Captain America.",
      ataques: [
        { nombre: "Escudo", daño: 20, tipo: "Físico", animacion: "escudo" },
        { nombre: "Combate cuerpo a cuerpo", daño: 25, tipo: "Físico", animacion: "combate" },
        { nombre: "Lanzamiento de escudo", daño: 15, tipo: "Distancia", animacion: "lanzamiento" },
        { nombre: "Espíritu americano", daño: 30, tipo: "Crítico", animacion: "espiritu" },
      ],
    },
    {
      id: 6,
      nombre: "Black Widow",
      nombreClave: "Natasha Romanoff",
      descripcion: "Espía maestra y asesina entrenada, experta en combate y espionaje.",
      imagen: "images/viuda_negra.jpg",
      fuerza: 6,
      ataque: 8,
      debilidad: "Pasado",
      vida: 100,
      universo: "MARVEL", // Añadido para identificar el universo
      trajes: ["Clásico", "Stealth", "Blanco", "Táctico", "Vengador"],
      poderes: [
        "Maestría en artes marciales",
        "Experta en armas",
        "Espionaje",
        "Agilidad mejorada",
        "Resistencia a toxinas",
      ],
      historia:
        "Entrenada desde joven en la Habitación Roja, Natasha Romanoff fue una de las mejores espías soviéticas antes de desertar y unirse a S.H.I.E.L.D. y posteriormente a los Vengadores.",
      ataques: [
        { nombre: "Mordida de viuda", daño: 20, tipo: "Eléctrico", animacion: "mordida" },
        { nombre: "Patada giratoria", daño: 15, tipo: "Físico", animacion: "patada-giratoria" },
        { nombre: "Pistolas", daño: 18, tipo: "Distancia", animacion: "pistolas" },
        { nombre: "Técnica letal", daño: 30, tipo: "Crítico", animacion: "tecnica" },
      ],
    },
  ]

  // Si estamos en la página DcMv.html, cargar tarjetas DC y Marvel
  if (window.location.pathname.includes("DcMv.html")) {
    // Cargar ambas secciones de personajes
    cargarTarjetasPersonajes("dc-heroes", personajesDC)
    cargarTarjetasPersonajes("marvel-heroes", personajesMarvel)
  }
}

// Función para configurar eventos según la página actual
function configurarEventosPagina() {
  const rutaActual = window.location.pathname

  if (rutaActual.includes("arena.html")) {
    // Configurar eventos para la página Arena
    const modos = document.querySelectorAll(".modo")
    modos.forEach((modo) => {
      modo.addEventListener("click", function () {
        const id = this.getAttribute("onclick").match(/'([^']+)'/)[1]
        seleccionarModo(id)
      })
    })
  }

  if (rutaActual.includes("personajes.html")) {
    // Configurar eventos para la página Personajes
    document.getElementById("btn-dc").addEventListener("click", () => {
      mostrarPersonajesUniverso("DC")
    })

    document.getElementById("btn-marvel").addEventListener("click", () => {
      mostrarPersonajesUniverso("MARVEL")
    })

    document.getElementById("btn-aleatorio").addEventListener("click", seleccionarPersonajeAleatorio)
    document.getElementById("btn-luchar").addEventListener("click", iniciarCombate)
  }

  if (rutaActual.includes("enfrentamiento.html")) {
    // Configurar eventos para la página Enfrentamiento
    cargarPersonajesCombate()

    document.querySelectorAll(".ataque-aleatorio").forEach((btn) => {
      btn.addEventListener("click", realizarAtaqueAleatorio)
    })

    // FIX: Corregido el evento de revancha para reiniciar correctamente la vida
    document.getElementById("btn-revancha").addEventListener("click", () => {
      reiniciarCombate()
    });

    document.getElementById("btn-nuevos-personajes").addEventListener("click", () => {
      const rutaBase = window.location.pathname.includes("/html/") ? "" : "html/"
      window.location.href = `${rutaBase}personajes.html`
    })

    document.getElementById("btn-nuevo-modo").addEventListener("click", () => {
      const rutaBase = window.location.pathname.includes("/html/") ? "" : "html/"
      window.location.href = `${rutaBase}arena.html`
    })
  }

  // Si estamos en la página DcMv.html, configurar eventos para cargar las tarjetas según el hash
  if (window.location.pathname.includes("DcMv.html")) {
    // Actualizar la clase active en los enlaces según el hash
    function actualizarNavegacion() {
      const hash = window.location.hash || '#dcpin';
      const dcLink = document.querySelector('a[href="#dcpin"]');
      const marvelLink = document.querySelector('a[href="#marvelpin"]');
      
      if (dcLink) dcLink.classList.toggle('active', hash === '#dcpin');
      if (marvelLink) marvelLink.classList.toggle('active', hash === '#marvelpin');
    }
    
    // Actualizar navegación al cargar y al cambiar el hash
    actualizarNavegacion();
    window.addEventListener('hashchange', actualizarNavegacion);
  }
}

// Función para cargar tarjetas de personajes (DC o Marvel)
function cargarTarjetasPersonajes(contenedorId, personajes) {
  const contenedor = document.getElementById(contenedorId)
  if (!contenedor) return

  contenedor.innerHTML = ""

  // Determinar la ruta base para las imágenes
  const rutaBase = window.location.pathname.includes("/html/") ? "../" : ""

  personajes.forEach((personaje) => {
    const tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"

    // Corregir la ruta de la imagen
    const rutaImagen = `${rutaBase}${personaje.imagen || "images/placeholder.jpg"}`

    tarjeta.innerHTML = `
            <div class="tarjeta-frente">
                <div class="tarjeta-imagen">
                    <img src="${rutaImagen}" alt="${personaje.nombre}">
                </div>
                <div class="tarjeta-info">
                    <h3>${personaje.nombre}</h3>
                    <button class="boton-info">Info</button>
                </div>
            </div>
            <div class="tarjeta-reverso">
                <h3>${personaje.nombre}</h3>
                <div class="info-detallada">
                    <p><strong>Nombre clave:</strong> ${personaje.nombreClave}</p>
                    <p><strong>Descripción:</strong> ${personaje.descripcion}</p>
                    <p><strong>Historia:</strong> ${personaje.historia}</p>
                    <div class="seccion-info">
                        <h4>Poderes:</h4>
                        <ul>
                            ${personaje.poderes.map((poder) => `<li>${poder}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="seccion-info">
                        <h4>Trajes:</h4>
                        <ul>
                            ${personaje.trajes.map((traje) => `<li>${traje}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="seccion-info">
                        <h4>Estadísticas:</h4>
                        <ul>
                            <li>Fuerza: ${personaje.fuerza}/10</li>
                            <li>Ataque: ${personaje.ataque}/10</li>
                            <li>Vida: ${personaje.vida}</li>
                            <li>Debilidad: ${personaje.debilidad}</li>
                        </ul>
                    </div>
                </div>
                <button class="boton-info">Cerrar</button>
            </div>
        `

    contenedor.appendChild(tarjeta)

    // Agregar evento para voltear la tarjeta
    const botonInfo = tarjeta.querySelectorAll(".boton-info")
    botonInfo.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        e.stopPropagation()
        tarjeta.classList.toggle("volteada")
      })
    })
  })
}

// Función para seleccionar modo de juego
function seleccionarModo(modo) {
  modoJuego = modo
  localStorage.setItem("modoJuego", modo)

  // Determinar la ruta correcta según la ubicación actual
  const rutaBase = window.location.pathname.includes("/html/") ? "" : "html/"
  window.location.href = `${rutaBase}personajes.html`
}

// Función para mostrar personajes según el universo seleccionado
function mostrarPersonajesUniverso(universo) {
  universoSeleccionado = universo
  const personajes = universo === "DC" ? personajesDC : personajesMarvel
  const contenedor = document.getElementById("personajes-container")
  const botonesAccion = document.getElementById("botones-accion")

  contenedor.innerHTML = ""
  botonesAccion.style.display = "flex"

  // Actualizar estilos de los botones
  document.getElementById("btn-dc").classList.toggle("active", universo === "DC")
  document.getElementById("btn-marvel").classList.toggle("active", universo === "MARVEL")

  // Determinar la ruta base para las imágenes
  const rutaBase = window.location.pathname.includes("/html/") ? "../" : ""

  personajes.forEach((personaje) => {
    const card = document.createElement("div")
    card.className = "personaje-card"
    card.dataset.id = personaje.id
    card.dataset.universo = personaje.universo // Añadido para identificar el universo

    // Corregir la ruta de la imagen
    const rutaImagen = `${rutaBase}${personaje.imagen || "images/placeholder.jpg"}`

    card.innerHTML = `
            <div class="personaje-imagen">
                <img src="${rutaImagen}" alt="${personaje.nombre}">
            </div>
            <div class="personaje-datos">
                <h3>${personaje.nombre}</h3>
                <div class="personaje-stats">
                    <p><strong>Fuerza:</strong> <span class="stat-valor">${personaje.fuerza}</span></p>
                    <p><strong>Ataque:</strong> <span class="stat-valor">${personaje.ataque}</span></p>
                    <p><strong>Debilidad:</strong> <span class="stat-valor">${personaje.debilidad}</span></p>
                    <p><strong>Vida:</strong> <span class="stat-valor">${personaje.vida}</span></p>
                </div>
            </div>
        `

    contenedor.appendChild(card)

    // Agregar evento para seleccionar personaje
    card.addEventListener("click", () => {
      seleccionarPersonaje(personaje)
    })
  })
}

// Función para seleccionar personaje
function seleccionarPersonaje(personaje) {
  const cards = document.querySelectorAll(".personaje-card")

  // Determinar la ruta base para las imágenes
  const rutaBase = window.location.pathname.includes("/html/") ? "../" : ""

  // CORRECCIÓN: Verificar si el personaje ya está seleccionado para permitir deseleccionarlo
  if (personajeSeleccionado1 && personaje.id === personajeSeleccionado1.id && personaje.universo === personajeSeleccionado1.universo) {
    // Deseleccionar el personaje 1
    personajeSeleccionado1 = null
    
    // Quitar la marca de seleccionado
    cards.forEach((card) => {
      if (Number.parseInt(card.dataset.id) === personaje.id && card.dataset.universo === personaje.universo) {
        card.classList.remove("seleccionado")
      }
    })
    
    // Limpiar la visualización del personaje 1
    const divPersonaje1 = document.getElementById("personaje1")
    divPersonaje1.querySelector(".imagen-personaje").innerHTML = ""
    divPersonaje1.querySelector(".info-personaje").innerHTML = ""
    
    // Deshabilitar el botón de luchar
    document.getElementById("btn-luchar").disabled = true
    
    return
  }
  
  if (personajeSeleccionado2 && personaje.id === personajeSeleccionado2.id && personaje.universo === personajeSeleccionado2.universo) {
    // Deseleccionar el personaje 2
    personajeSeleccionado2 = null
    
    // Quitar la marca de seleccionado
    cards.forEach((card) => {
      if (Number.parseInt(card.dataset.id) === personaje.id && card.dataset.universo === personaje.universo) {
        card.classList.remove("seleccionado")
      }
    })
    
    // Limpiar la visualización del personaje 2
    const divPersonaje2 = document.getElementById("personaje2")
    divPersonaje2.querySelector(".imagen-personaje").innerHTML = ""
    divPersonaje2.querySelector(".info-personaje").innerHTML = ""
    
    // Deshabilitar el botón de luchar
    document.getElementById("btn-luchar").disabled = true
    
    return
  }

  // CORRECCIÓN: Permitir seleccionar cualquier personaje para cualquier jugador
  if (!personajeSeleccionado1) {
    personajeSeleccionado1 = personaje

    // Marcar la tarjeta como seleccionada
    cards.forEach((card) => {
      if (Number.parseInt(card.dataset.id) === personaje.id && card.dataset.universo === personaje.universo) {
        card.classList.add("seleccionado")
      }
    })

    // Mostrar el personaje seleccionado
    const divPersonaje1 = document.getElementById("personaje1")
    // Corregir la ruta de la imagen
    const rutaImagen = `${rutaBase}${personaje.imagen || "images/placeholder.jpg"}`

    divPersonaje1.querySelector(".imagen-personaje").innerHTML = `<img src="${rutaImagen}" alt="${personaje.nombre}">`
    divPersonaje1.querySelector(".info-personaje").innerHTML = `
            <h3>${personaje.nombre}</h3>
            <p><strong>Fuerza:</strong> <span class="stat-valor">${personaje.fuerza}</span></p>
            <p><strong>Ataque:</strong> <span class="stat-valor">${personaje.ataque}</span></p>
            <p><strong>Vida:</strong> <span class="stat-valor">${personaje.vida}</span></p>
            <p><strong>Debilidad:</strong> <span class="stat-valor">${personaje.debilidad}</span></p>
        `
  } else if (!personajeSeleccionado2) {
    personajeSeleccionado2 = personaje

    // Marcar la tarjeta como seleccionada
    cards.forEach((card) => {
      if (Number.parseInt(card.dataset.id) === personaje.id && card.dataset.universo === personaje.universo) {
        card.classList.add("seleccionado")
      }
    })

    // Mostrar el personaje seleccionado
    const divPersonaje2 = document.getElementById("personaje2")
    // Corregir la ruta de la imagen
    const rutaImagen = `${rutaBase}${personaje.imagen || "images/placeholder.jpg"}`

    divPersonaje2.querySelector(".imagen-personaje").innerHTML = `<img src="${rutaImagen}" alt="${personaje.nombre}">`
    divPersonaje2.querySelector(".info-personaje").innerHTML = `
            <h3>${personaje.nombre}</h3>
            <p><strong>Fuerza:</strong> <span class="stat-valor">${personaje.fuerza}</span></p>
            <p><strong>Ataque:</strong> <span class="stat-valor">${personaje.ataque}</span></p>
            <p><strong>Vida:</strong> <span class="stat-valor">${personaje.vida}</span></p>
            <p><strong>Debilidad:</strong> <span class="stat-valor">${personaje.debilidad}</span></p>
        `

    // Habilitar el botón de luchar
    document.getElementById("btn-luchar").disabled = false
  }
}

// Función para seleccionar personaje aleatorio
function seleccionarPersonajeAleatorio() {
  if (!universoSeleccionado) {
    alert("Primero debes seleccionar un universo (DC o MARVEL)")
    return
  }

  const personajes = universoSeleccionado === "DC" ? personajesDC : personajesMarvel

  // Si no hay personaje 1 seleccionado, seleccionar uno aleatorio
  if (!personajeSeleccionado1) {
    const indiceAleatorio = Math.floor(Math.random() * personajes.length)
    seleccionarPersonaje(personajes[indiceAleatorio])
  }
  // Si no hay personaje 2 seleccionado, seleccionar uno aleatorio
  else if (!personajeSeleccionado2) {
    // CORRECCIÓN: Permitir seleccionar cualquier personaje, incluso el mismo que el jugador 1
    const indiceAleatorio = Math.floor(Math.random() * personajes.length)
    seleccionarPersonaje(personajes[indiceAleatorio])
  }
}

// Función para iniciar combate
function iniciarCombate() {
  if (personajeSeleccionado1 && personajeSeleccionado2) {
    // Guardar los personajes seleccionados en localStorage
    localStorage.setItem("personaje1", JSON.stringify(personajeSeleccionado1))
    localStorage.setItem("personaje2", JSON.stringify(personajeSeleccionado2))

    // Redirigir a la página de enfrentamiento
    const rutaBase = window.location.pathname.includes("/html/") ? "" : "html/"
    window.location.href = `${rutaBase}enfrentamiento.html`
  }
}

// Función para cargar personajes en la página de combate
function cargarPersonajesCombate() {
  // Recuperar personajes del localStorage
  const personaje1 = JSON.parse(localStorage.getItem("personaje1"))
  const personaje2 = JSON.parse(localStorage.getItem("personaje2"))

  if (!personaje1 || !personaje2) {
    const rutaBase = window.location.pathname.includes("/html/") ? "" : "html/"
    window.location.href = `${rutaBase}personajes.html`
    return
  }

  // Guardar vida inicial
  vidaInicial1 = personaje1.vida
  vidaInicial2 = personaje2.vida

  // Actualizar las referencias globales a los personajes seleccionados
  personajeSeleccionado1 = personaje1
  personajeSeleccionado2 = personaje2

  // Determinar la ruta base para las imágenes
  const rutaBase = window.location.pathname.includes("/html/") ? "../" : ""

  // Cargar personaje izquierdo
  const divIzquierda = document.getElementById("personaje-izquierda")
  // Corregir la ruta de la imagen
  const rutaImagen1 = `${rutaBase}${personaje1.imagen || "images/placeholder.jpg"}`

  divIzquierda.querySelector(".imagen-combate").innerHTML = `<img src="${rutaImagen1}" alt="${personaje1.nombre}">`
  divIzquierda.querySelector(".nombre-personaje").textContent = personaje1.nombre
  divIzquierda.querySelector(".vida-actual").style.width = "100%"
  divIzquierda.querySelector(".vida-texto").textContent = `${personaje1.vida}/${vidaInicial1}`

  // Cargar ataques del personaje 1
  const listaAtaquesIzquierda = divIzquierda.querySelector(".lista-ataques")
  listaAtaquesIzquierda.innerHTML = "" // Limpiar ataques existentes
  personaje1.ataques.forEach((ataque) => {
    const botonAtaque = document.createElement("button")
    botonAtaque.className = ataque.tipo === "Crítico" ? "ataque-btn tipo-especial" : "ataque-btn"
    botonAtaque.textContent = `${ataque.nombre} (${ataque.daño})`
    botonAtaque.dataset.nombre = ataque.nombre
    botonAtaque.dataset.daño = ataque.daño
    botonAtaque.dataset.tipo = ataque.tipo
    botonAtaque.dataset.animacion = ataque.animacion

    botonAtaque.addEventListener("click", () => {
      realizarAtaque(personaje1, personaje2, ataque)
    })

    listaAtaquesIzquierda.appendChild(botonAtaque)
  })

  // Cargar personaje derecho
  const divDerecha = document.getElementById("personaje-derecha")
  // Corregir la ruta de la imagen
  const rutaImagen2 = `${rutaBase}${personaje2.imagen || "images/placeholder.jpg"}`

  divDerecha.querySelector(".imagen-combate").innerHTML = `<img src="${rutaImagen2}" alt="${personaje2.nombre}">`
  divDerecha.querySelector(".nombre-personaje").textContent = personaje2.nombre
  divDerecha.querySelector(".vida-actual").style.width = "100%"
  divDerecha.querySelector(".vida-texto").textContent = `${personaje2.vida}/${vidaInicial2}`

  // Cargar ataques del personaje 2
  const listaAtaquesDerecha = divDerecha.querySelector(".lista-ataques")
  listaAtaquesDerecha.innerHTML = "" // Limpiar ataques existentes
  personaje2.ataques.forEach((ataque) => {
    const botonAtaque = document.createElement("button")
    botonAtaque.className = ataque.tipo === "Crítico" ? "ataque-btn tipo-especial" : "ataque-btn"
    botonAtaque.textContent = `${ataque.nombre} (${ataque.daño})`
    botonAtaque.dataset.nombre = ataque.nombre
    botonAtaque.dataset.daño = ataque.daño
    botonAtaque.dataset.tipo = ataque.tipo
    botonAtaque.dataset.animacion = ataque.animacion

    botonAtaque.addEventListener("click", () => {
      realizarAtaque(personaje2, personaje1, ataque)
    })

    listaAtaquesDerecha.appendChild(botonAtaque)
  })

  // Configurar el modo de juego
  configurarModoJuego()
}

// Función para configurar el modo de juego
function configurarModoJuego() {
  const modo = localStorage.getItem("modoJuego")

  if (modo === "usuario-ia") {
    // Deshabilitar controles del personaje 2 (IA)
    const divDerecha = document.getElementById("personaje-derecha")
    divDerecha.querySelectorAll("button").forEach((btn) => {
      btn.disabled = true
    })

    // La IA realizará ataques automáticamente cuando sea su turno
  } else if (modo === "ia-ia") {
    // Deshabilitar controles de ambos personajes
    document.querySelectorAll(".personaje-combate button").forEach((btn) => {
      btn.disabled = true
    })

    // Iniciar combate automático
    setTimeout(combateAutomatico, 1000)
  }
  // En modo usuario-usuario, ambos controles están habilitados por defecto
}

// Función para realizar ataque aleatorio
function realizarAtaqueAleatorio() {
  if (turnoJugador1) {
    const ataqueAleatorio = personajeSeleccionado1.ataques[Math.floor(Math.random() * personajeSeleccionado1.ataques.length)]
    realizarAtaque(personajeSeleccionado1, personajeSeleccionado2, ataqueAleatorio)
  } else {
    const ataqueAleatorio = personajeSeleccionado2.ataques[Math.floor(Math.random() * personajeSeleccionado2.ataques.length)]
    realizarAtaque(personajeSeleccionado2, personajeSeleccionado1, ataqueAleatorio)
  }
}

// Función para realizar ataque
function realizarAtaque(atacante, defensor, ataque) {
  // CORRECCIÓN: Verificar si es el turno correcto usando ID y universo
  const esAtacante1 = atacante.id === personajeSeleccionado1.id && atacante.universo === personajeSeleccionado1.universo;
  const esAtacante2 = atacante.id === personajeSeleccionado2.id && atacante.universo === personajeSeleccionado2.universo;
  
  if ((turnoJugador1 && !esAtacante1) || (!turnoJugador1 && !esAtacante2)) {
    mostrarMensaje("¡No es tu turno!")
    return
  }

  // Calcular daño
  let daño = Number.parseInt(ataque.daño)
  let esCritico = false
  let esDebil = false

  // Verificar si el ataque es crítico (debilidad del defensor)
  if (ataque.tipo.toLowerCase() === defensor.debilidad.toLowerCase()) {
    daño = Math.round(daño * 1.5)
    esCritico = true
    estadisticasCombate.ataquesCriticos++
  }

  // Verificar si el ataque es débil
  if (ataque.tipo === "Débil") {
    daño = Math.round(daño * 0.7)
    esDebil = true
    estadisticasCombate.ataquesDébiles++
  }

  // Actualizar estadísticas
  if (turnoJugador1) {
    estadisticasCombate.dañoRealizado += daño
  } else {
    estadisticasCombate.dañoRecibido += daño
  }

  // Mostrar animación de ataque
  mostrarAnimacionAtaque(ataque.nombre, ataque.animacion, esCritico)

  // FIX: Crear copias profundas de los personajes para evitar problemas de referencia
  let personaje1Actualizado = JSON.parse(JSON.stringify(personajeSeleccionado1));
  let personaje2Actualizado = JSON.parse(JSON.stringify(personajeSeleccionado2));
  
  // Restar daño a la vida del defensor
  if (esAtacante1) {
    personaje2Actualizado.vida -= daño;
    if (personaje2Actualizado.vida < 0) personaje2Actualizado.vida = 0;
    
    // Actualizar el personaje2 en la variable global y localStorage
    personajeSeleccionado2 = personaje2Actualizado;
    localStorage.setItem("personaje2", JSON.stringify(personaje2Actualizado));
    
    // Actualizar la vida en la interfaz
    actualizarVidaEnInterfaz(personaje2Actualizado, false);
    
    // Verificar si el combate ha terminado
    if (personaje2Actualizado.vida <= 0) {
      finalizarCombate(atacante);
      return;
    }
  } else {
    personaje1Actualizado.vida -= daño;
    if (personaje1Actualizado.vida < 0) personaje1Actualizado.vida = 0;
    
    // Actualizar el personaje1 en la variable global y localStorage
    personajeSeleccionado1 = personaje1Actualizado;
    localStorage.setItem("personaje1", JSON.stringify(personaje1Actualizado));
    
    // Actualizar la vida en la interfaz
    actualizarVidaEnInterfaz(personaje1Actualizado, true);
    
    // Verificar si el combate ha terminado
    if (personaje1Actualizado.vida <= 0) {
      finalizarCombate(atacante);
      return;
    }
  }

  // Cambiar turno
  turnoJugador1 = !turnoJugador1;

  // Deshabilitar botones según el turno
  actualizarBotonesTurno();

  // Si es modo usuario-ia y ahora es turno de la IA
  const modo = localStorage.getItem("modoJuego");
  if (modo === "usuario-ia" && !turnoJugador1) {
    // La IA realiza su ataque después de un breve retraso
    setTimeout(ataqueIA, 1500);
  }
}

// NUEVA FUNCIÓN: Actualizar vida en la interfaz
function actualizarVidaEnInterfaz(personaje, esPersonaje1) {
  const vidaInicial = esPersonaje1 ? vidaInicial1 : vidaInicial2;
  
  // Calcular porcentaje de vida
  const porcentajeVida = (personaje.vida / vidaInicial) * 100;
  
  // Seleccionar elementos de la interfaz
  const barraVida = document.querySelector(
    esPersonaje1 ? "#personaje-izquierda .vida-actual" : "#personaje-derecha .vida-actual"
  );
  
  const textoVida = document.querySelector(
    esPersonaje1 ? "#personaje-izquierda .vida-texto" : "#personaje-derecha .vida-texto"
  );
  
  // Actualizar barra de vida
  barraVida.style.width = porcentajeVida + "%";
  textoVida.textContent = `${personaje.vida}/${vidaInicial}`;
  
  // Cambiar color según la vida restante
  if (porcentajeVida < 30) {
    barraVida.style.background = "linear-gradient(90deg, #ff0000, #ff5252)";
  } else if (porcentajeVida < 60) {
    barraVida.style.background = "linear-gradient(90deg, #ffa500, #ffb74d)";
  }
}

// Función para actualizar botones según el turno
function actualizarBotonesTurno() {
  const divIzquierda = document.getElementById("personaje-izquierda")
  const divDerecha = document.getElementById("personaje-derecha")

  const modo = localStorage.getItem("modoJuego")

  if (modo === "usuario-usuario") {
    // En modo usuario vs usuario, habilitar/deshabilitar según el turno
    divIzquierda.querySelectorAll("button").forEach((btn) => {
      btn.disabled = !turnoJugador1
    })

    divDerecha.querySelectorAll("button").forEach((btn) => {
      btn.disabled = turnoJugador1
    })
  }
}

// Función para mostrar animación de ataque
function mostrarAnimacionAtaque(nombreAtaque, animacion, esCritico) {
  const divAnimacion = document.getElementById("animacion-ataque")
  const divMensaje = document.getElementById("mensaje-combate")

  // Mostrar mensaje
  divMensaje.textContent = nombreAtaque + (esCritico ? " ¡CRÍTICO!" : "")
  divMensaje.style.display = "block"

  // Añadir clase para animación
  divAnimacion.className = "animacion-ataque activa"

  // Añadir clase específica para la animación del ataque
  if (animacion) {
    divAnimacion.classList.add(`animacion-${animacion}`)
  }

  if (esCritico) {
    divAnimacion.classList.add("critico")
  }

  // Quitar clases después de la animación
  setTimeout(() => {
    divAnimacion.className = "animacion-ataque"
    divMensaje.style.display = "none"
  }, 1000)
}

// Función para ataque de la IA
function ataqueIA() {
  // CORRECCIÓN: Usar las variables globales actualizadas
  if (!personajeSeleccionado2 || !personajeSeleccionado1) return;
  
  // La IA elige un ataque aleatorio
  const ataqueAleatorio = personajeSeleccionado2.ataques[Math.floor(Math.random() * personajeSeleccionado2.ataques.length)]

  // Realizar el ataque
  realizarAtaque(personajeSeleccionado2, personajeSeleccionado1, ataqueAleatorio)
}

// Función para combate automático (modo IA vs IA)
function combateAutomatico() {
  // CORRECCIÓN: Usar las variables globales actualizadas
  if (!personajeSeleccionado1 || !personajeSeleccionado2) return;
  
  // Si el combate ya terminó no hacer nada
  if (personajeSeleccionado1.vida <= 0 || personajeSeleccionado2.vida <= 0) {
    return
  }

  // Elegir ataque aleatorio según el turno
  if (turnoJugador1) {
    const ataqueAleatorio = personajeSeleccionado1.ataques[Math.floor(Math.random() * personajeSeleccionado1.ataques.length)]
    realizarAtaque(personajeSeleccionado1, personajeSeleccionado2, ataqueAleatorio)
  } else {
    const ataqueAleatorio = personajeSeleccionado2.ataques[Math.floor(Math.random() * personajeSeleccionado2.ataques.length)]
    realizarAtaque(personajeSeleccionado2, personajeSeleccionado1, ataqueAleatorio)
  }

  // Continuar el combate automático después de un tiempo
  if (personajeSeleccionado1.vida > 0 && personajeSeleccionado2.vida > 0) {
    setTimeout(combateAutomatico, 2000)
  }
}

// Función para finalizar combate
function finalizarCombate(ganador) {
  // Mostrar resultado del combate
  const divResultado = document.getElementById("resultado-combate")
  divResultado.style.display = "block"

  // Determinar la ruta base para las imágenes
  const rutaBase = window.location.pathname.includes("/html/") ? "../" : ""

  // Mostrar ganador
  const divGanador = divResultado.querySelector(".imagen-ganador")
  // Corregir la ruta de la imagen
  const rutaImagen = `${rutaBase}${ganador.imagen || "images/placeholder.jpg"}`

  divGanador.innerHTML = `<img src="${rutaImagen}" alt="${ganador.nombre}">`
  divResultado.querySelector(".nombre-ganador").textContent = ganador.nombre

  document.getElementById("daño-realizado").textContent = estadisticasCombate.dañoRealizado
  document.getElementById("daño-recibido").textContent = estadisticasCombate.dañoRecibido
  document.getElementById("ataques-criticos").textContent = estadisticasCombate.ataquesCriticos
  document.getElementById("ataques-debiles").textContent = estadisticasCombate.ataquesDébiles

  document.querySelectorAll(".ataque-btn, .ataque-aleatorio").forEach((btn) => {
    btn.disabled = true
  })
}

// FIX: Nueva función para reiniciar el combate correctamente
function reiniciarCombate() {
  // Ocultar el resultado del combate
  document.getElementById("resultado-combate").style.display = "none";
  
  // Reiniciar estadísticas
  estadisticasCombate.dañoRealizado = 0;
  estadisticasCombate.dañoRecibido = 0;
  estadisticasCombate.ataquesCriticos = 0;
  estadisticasCombate.ataquesDébiles = 0;
  
  // Reiniciar el turno
  turnoJugador1 = true;
  
  // Obtener los personajes originales
  const personaje1Original = JSON.parse(localStorage.getItem("personaje1"));
  const personaje2Original = JSON.parse(localStorage.getItem("personaje2"));
  
  // FIX: Restaurar la vida a los valores iniciales
  personaje1Original.vida = vidaInicial1;
  personaje2Original.vida = vidaInicial2;
  
  // Actualizar los personajes en localStorage y variables globales
  localStorage.setItem("personaje1", JSON.stringify(personaje1Original));
  localStorage.setItem("personaje2", JSON.stringify(personaje2Original));
  personajeSeleccionado1 = personaje1Original;
  personajeSeleccionado2 = personaje2Original;
  
  // Actualizar la interfaz
  const divIzquierda = document.getElementById("personaje-izquierda");
  const divDerecha = document.getElementById("personaje-derecha");
  
  // Actualizar barras de vida
  divIzquierda.querySelector(".vida-actual").style.width = "100%";
  divIzquierda.querySelector(".vida-texto").textContent = `${vidaInicial1}/${vidaInicial1}`;
  divIzquierda.querySelector(".vida-actual").style.background = "linear-gradient(90deg, #4caf50, #8bc34a)";
  
  divDerecha.querySelector(".vida-actual").style.width = "100%";
  divDerecha.querySelector(".vida-texto").textContent = `${vidaInicial2}/${vidaInicial2}`;
  divDerecha.querySelector(".vida-actual").style.background = "linear-gradient(90deg, #4caf50, #8bc34a)";
  
  // Habilitar/deshabilitar botones según el modo de juego
  const modo = localStorage.getItem("modoJuego");
  
  if (modo === "usuario-usuario") {
    // Habilitar botones del jugador 1, deshabilitar los del jugador 2
    divIzquierda.querySelectorAll("button").forEach(btn => btn.disabled = false);
    divDerecha.querySelectorAll("button").forEach(btn => btn.disabled = true);
  } else if (modo === "usuario-ia") {
    // Habilitar botones del jugador 1, deshabilitar los de la IA
    divIzquierda.querySelectorAll("button").forEach(btn => btn.disabled = false);
    divDerecha.querySelectorAll("button").forEach(btn => btn.disabled = true);
  } else if (modo === "ia-ia") {
    // Deshabilitar todos los botones y reiniciar el combate automático
    document.querySelectorAll(".personaje-combate button").forEach(btn => btn.disabled = true);
    setTimeout(combateAutomatico, 1000);
  }
}

// Función para mostrar mensaje
function mostrarMensaje(mensaje) {
  const divMensaje = document.getElementById("mensaje-combate")
  divMensaje.textContent = mensaje
  divMensaje.style.display = "block"

  setTimeout(() => {
    divMensaje.style.display = "none"
  }, 1500)
}