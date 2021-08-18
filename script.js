//document.addEventListener nos sirve para registra un evento a un objeto en específico.

document.addEventListener("DOMContentLoaded", () => {
    //querySelector() Devuelve el primer elemento del documento (utilizando un recorrido primero en profundidad pre ordenado de los nodos del documento) que coincida con el grupo especificado de selectores.

    const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido"),
        $btnIniciar = document.querySelector("#btnIniciar"),
        $btnPausar = document.querySelector("#btnPausar"),
        $btnMarca = document.querySelector("#btnMarca"),
        $btnDetener = document.querySelector("#btnDetener"),
        $contenedorMarcas = document.querySelector("#contenedorMarcas");

    //let permite declarar variables limitando su alcance (scope) al bloque, declaración, o expresión donde se está usando.

    let marcas = [],
        idInterval,
        tiempoInicio = null;
    let diferenciaTemporal = 0;

    const ocultarElemento = (elemento) => {
        elemento.style.display = "none";
    };

    const mostrarElemento = (elemento) => {
        elemento.style.display = "";
    };

    const agregarCeroSiEsNecesario = (valor) => {
        if (valor < 10) {
            return "0" + valor;
        } else {
            return "" + valor;
        }
    };

    const milisegundosAMinutosYSegundos = (milisegundos) => {
        const minutos = parseInt(milisegundos / 1000 / 60);
        milisegundos -= minutos * 60 * 1000;
        segundos = milisegundos / 1000;
        return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(
            segundos.toFixed(1)
        )}`;
    };

    const iniciar = () => {
        //Date obtener una fecha, el día la hora actuales y otras cosas. Para trabajar con fechas necesitamos instanciar un objeto de la clase Date y con él ya podemos realizar las operaciones que necesitemos.

        const ahora = new Date();

        tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal); //getTime Devuelve el valor numérico correspondiente a la hora para la fecha especificada según la hora universal.
        clearInterval(idInterval); // clearInterval Este método se utiliza para detener el bucle cronometrado que se inició con el método setInterval () anterior. Con el fin de utilizarlo, el bucle debe ser asignado a una variable.

        idInterval = setInterval(refrescarTiempo, 100); //método llama a una función o evalúa una expresión a intervalos especificados (in milliseconds) .

        ocultarElemento($btnIniciar);
        ocultarElemento($btnDetener);
        mostrarElemento($btnMarca);
        mostrarElemento($btnPausar);
    };
    const pausar = () => {
        diferenciaTemporal = new Date() - tiempoInicio.getTime();
        clearInterval(idInterval); //Este método se utiliza para detener el bucle cronometrado que se inició con el método setInterval () anterior. Con el fin de utilizarlo, el bucle debe ser asignado a una variable.
        mostrarElemento($btnIniciar);
        ocultarElemento($btnMarca);
        ocultarElemento($btnPausar);
        mostrarElemento($btnDetener);
    };
    const refrescarTiempo = () => {
        const ahora = new Date();
        const diferencia = ahora.getTime() - tiempoInicio.getTime(); //devuelve el valor numérico correspondiente a la hora para la fecha especificada según la hora universal.
        $tiempoTranscurrido.textContent =
            milisegundosAMinutosYSegundos(diferencia);
    };
    const ponerMarca = () => {
        marcas.unshift(new Date() - tiempoInicio.getTime()); //devuelve el valor numérico correspondiente a la hora para la fecha especificada según la hora universal.
        dibujarMarcas();
    };
    const dibujarMarcas = () => {
        $contenedorMarcas.innerHTML = "";
        for (const [indice, marca] of marcas.entries()) {
            const $p = document.createElement("p");
            $p.innerHTML = `<strong class="is-size-4">${
                marcas.length - indice
            }.</strong> ${milisegundosAMinutosYSegundos(marca)}`;
            $p.classList.add("is-size-3");
            $contenedorMarcas.append($p); //método inserta un conjunto de Nodeobjetos u DOMStringobjetos después del último hijo de Element
        }
    };

    const detener = () => {
        if (!confirm("¿Detener?")) {
            return;
        }
        clearInterval(idInterval);
        init();
        marcas = [];
        dibujarMarcas();
        diferenciaTemporal = 0;
    };

    const init = () => {
        $tiempoTranscurrido.textContent = "00:00.0";
        ocultarElemento($btnPausar);
        ocultarElemento($btnMarca);
        ocultarElemento($btnDetener);
    };
    init();

    $btnIniciar.onclick = iniciar;
    $btnMarca.onclick = ponerMarca;
    $btnPausar.onclick = pausar;
    $btnDetener.onclick = detener;
});
