//CONSIGNA PARA PRIMER PRE ENTREGA DE PROYECTO FINAL

//Colocando todo el codigo en una funcion para llamarlo mediante onclick!

function container() {

  //mi array juegos donde guardo lkos objetos que luego voy a iterar
  const juegos = [{
      id: 1,
      titulo: 'Marvel’s Spider-Man Remastered',
      genero: 'Acción, Aventura, Casual',
      precio: 35000,
      stock: 10
    },
    {
      id: 2,
      titulo: 'Elden Ring',
      genero: 'Acción, Rol',
      precio: 55000,
      stock: 10
    },
    {
      id: 3,
      titulo: 'Battlefield™ 2042',
      genero: 'Acción, Aventura, Casual',
      precio: 86900,
      stock: 10
    },
    {
      id: 4,
      titulo: 'FIFA 22',
      genero: 'Simuladores, Deportes',
      precio: 57900,
      stock: 10
    },
    {
      id: 5,
      titulo: 'Yu-Gi-Oh! Legacy of the Duelist',
      genero: 'Simuladores, Cartas',
      precio: 35000,
      stock: 10
    },
    {
      id: 6,
      titulo: 'Stray',
      genero: 'Aventura, Indie',
      precio: 16600,
      stock: 10
    },
  ];


  // el objeto constructor 
  class Juegos {
    constructor(object) {
      this.id = object.id
      this.titulo = object.titulo
      this.genero = object.genero
      this.precio = object.precio
      this.stock = object.stock
    }
  }

  //array de objetos y variables que uso para almacenar datos y luego llamarlos segu requiera en cada funcion
  const carritoComprar = [];
  let validarObj;
  let arraydeJuegos = [];


  //la funcion validacion, es la que me valida por medio de parametros, por tanto no solo puede validar el nombre si no dependiendo de lo que requiera y el parametro que le de , me retorna la variable validar!
  function validacion(nombre) {
    let nuevaEntrada = prompt(nombre);
    while (nuevaEntrada == '' || nuevaEntrada == null) {
      alert('☠️ Error! - no se ingresaron datos');
      nuevaEntrada = prompt(nombre);
    }
    return validarObj = nuevaEntrada;
  }

  // menu del proyecto carrito de ventas de videojuegos
  function menu() {
    validacion(opciones);
    parseInt(validarObj);
    switch (validarObj) {
      case "1":
        menuLista();
        break;
      case "2":
        //queria agregar algo mas y se me ocurrio agregar algo de distraccion :D
        alert("----- Let's Play Now 🎮 -----")
        iniciar();
        break;
      case "3":
        salir(false);
        break;
      default:
        alert("DATO ERRONEO ☠️");
        menu();
        break;
    }
  }

  //aqui recorremos el array jeugos mediante un for each el cual me permite traer todos los objetos completos en una lista la cual es vista como un sub menu de compras de juegos (entramos al carrito)
  function menuLista() {
    let mostrarJuegos = '';
    let a = 1;
    juegos.forEach((i) => {
      mostrarJuegos += (`${i.id} - ${i.titulo} : ${i.genero}\n        precio = ${i.precio} CLP. ~ disponible ${i.stock} uds.\n`);
      a++;
    });
    let menuJuegos = (`Bx - GAMES // Agrega al carrito :\n\n${mostrarJuegos}${a} - Ir al pago -->\n${a + 1} - Vaciar carrito <--`);
    menuListaProd(menuJuegos, a);
  }

  //aqui validamos los objetos agregados , si hay o no hay con lenght
  function menuListaProd(menuJuegos, a) {
    validacion(menuJuegos);
    if (validarObj == a) {
      if (carritoComprar.length == 0) {
        alert('carrito Vacío');
        menuLista();
      } else {
        mostrandoPedidos();
      }
    } else if (validarObj == a + 1) {
      alert('Vaciando Carrito!');
      let consulta = parseInt(prompt('Bx - GAMES 🎮\n\nDesea continuar? :\n\n1 - menú\n2 - salir'));
      while (consulta != 619) {
        if (consulta == 1) {
          menu();
          break;
        } else if (consulta == 2) {
          salir(false);
          break;
        } else {
          alert("DATO ERRONEO ☠️");
          consulta = parseInt(prompt('Bx - GAMES 🎮\n\nDesea continuar? :\n\n1 - menú\n2 - salir'));
        }
      }
    } else if (validarObj > 0 && validarObj < juegos.length + 1) {
      arrFiltroJuegos();
    } else {
      alert('☠️ Error! - ingresa otra opción');
      menuLista();
    }
  }

  // aqui muy importante  mapeamos los objetos y creamos a base de un cosntructor el arraysdejuegos que usaremos para agregar al carrito el producto y las veces que queramos y se iran sumando gracias a la variable local cantidad 
  function arrFiltroJuegos() {
    let cantidad = 1;
    juegos.map((producto) => {
      if (producto.id == validarObj) {
        arraydeJuegos = {
          id: producto.id,
          titulo: producto.titulo,
          genero: producto.genero,
          precio: producto.precio,
          stock: cantidad,
        };
        return arraydeJuegos;
      }
    });
    agregandoaCarrito(arraydeJuegos);
  }

  //aqui validamos la accion veridicando con true false las id de los objetos , si no hay nada en el carrito se pushea un nuevo objeto al arraydejuegos,
  function agregandoaCarrito(arraydeJuegos) {
    const acumulado = carritoComprar.some((elemento) => elemento.id == validarObj);
    if (acumulado == false) {
      const nuevoCarrito = new Juegos(arraydeJuegos);
      carritoComprar.push(nuevoCarrito);
      alert(`Bx - GAMES 🎮 // CARRITO :\n\nAgregaste -- > ${arraydeJuegos.titulo}`);
    }
    //si ya hay un elemento en el carrito con la misma id pasamos solo a sumar cantidad pues ya lo tenemos agregado.
    else {
      carritoComprar.filter((elemento) => {
        if (elemento.id == validarObj) {
          elemento.stock++
        }
      });
      alert(`Bx - GAMES 🎮 // CARRITO :\n\nAgregaste --> ${arraydeJuegos.titulo}`);
    }
    menuLista();
  }

  // recorremos el arrays carritocomprar con un for each para obtener los valores requeridos(sobre todo precio), realizamos la suma de precios e imprimimos el total sumando precios x cantidad...pasamos a pagar
  function mostrandoPedidos() {
    let mostrarCarrito = "";
    let subTotal = 0;
    total = 0;
    carritoComprar.forEach((i) => {
      subTotal = i.precio * i.stock;
      total += subTotal;
      mostrarCarrito += (`${i.titulo} / valor : ${i.precio} CLP. / unds : ${i.stock}\ncosto x Productos ${subTotal} CLP.\n\n`);
    });
    alert(`Bx - GAMES 🎮 // CARRITO :\n\n${mostrarCarrito}\nTotal a Pagar ${total} CLP.`);
    cobrar();
  }

  //aqui cobramos mediante validacion true false ,usamos el prompt, si el monto ingresado es mayor o igual o menor.
  function cobrar() {
    validacion(cash);
    parseInt(validarObj);
    switch (validarObj >= total) {
      case true:
        alert(`Bx - GAMES 🎮\n\nTu vuelto es ${validarObj - total} CLP.`);
        salir(true);
        break;
      case false:
        alert(`Bx - GAMES 🎮\n\n'☠️' Monto insuficiente`);
        cobrar();
        break;
      default:
        alert('☠️ Error! - ingresa otra opción');
        cobrar();
        break;
    }
  }

  //Mensaje de salida al terminar el programa!
  function salir(mensaje) {
    if (mensaje == false) {
      alert('Bx - GAMES 🎮\n\nGracias Por tu Visita 🤗 Te Esperamos Pronto');
      return;
    } else {
      alert('Bx - GAMES 🎮\n\nPuedes retirar tu pedido en Despacho !');
      alert('Bx - GAMES 🎮\n\nGracias Por tu Compra 👍 te Esperamos Pronto con más Novedades');
      return;
    }
  }


  //Inicializacion del proyecto!
  let nombre = 'Bx - GAMES 🎮\n\nIngrese su nombre :';
  let opciones = 'Bx - GAMES 🎮\n\nIngrese una opcion: \n\n1 - Comprar juegos \n2 - Play to me! (nuevo)\n3 - Salir';
  let cash = 'Bx - GAMES 🎮\n\nIngrese efectivo :';
  validacion(nombre);
  alert('Bx - GAMES 🎮\n\nBienvenido(a)  ' + validarObj.toUpperCase());
  menu();



  //MY GAME IS STONE PAPER SCISORS - Juego recreativo!!!

  //funcion para llamar al juego e iniciar
  function iniciar() {
    alert('Bx - GAMES 🎮\n\nHello Player! ~ Juguemos al Piedra Papel ó Tijera');

    //algoritmo ramdom para la maquina!
    function aleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    //resultado de la elecion
    function eleccion(jugada) {
      let resultado = '';
      if (jugada == 1) {
        resultado = 'Piedra 🪨'
      } else if (jugada == 2) {
        resultado = 'Papel 📃'
      } else if (jugada == 3) {
        resultado = 'Tijera ✂️'
      } else {
        resultado = 'ERROR!'
      }
      return resultado
    }

    //combate player - maquina
    function combate(pc, jugador) {
      let definiendo = '';
      if (pc == jugador) {
        definiendo = 'Bx - GAMES 🎮\n\nEmpate 🤝';
        empates++;
      } else if (jugador == 1 && pc == 3 || jugador == 2 && pc == 1 || jugador == 3 && pc == 2) {
        definiendo = 'Bx - GAMES 🎮\n\nGanaste 🏆';
        triunfos++;
      } else {
        definiendo = 'Bx - GAMES 🎮\n\nPerdiste ☠️';
        perdidas++;
      }
      return definiendo;
    }

    //corona ganador - perdedor
    function coronando() {
      if (triunfos > perdidas) {
        alert('Bx - GAMES 🎮\n\nYOU WIN 🥇')
      } else {
        alert('Bx - GAMES 🎮\n\nYOU LOSE 💀')
      };
    }

    //variables!!
    let jugador = 0;
    let pc = 0;
    let triunfos = 0;
    let perdidas = 0;
    let empates = 0;

    //ciclo del juego - COMBATE!
    while (triunfos < 3 && perdidas < 3) {
      pc = aleatorio(1, 3);
      // 1 es piedra, 2 es papel, 3 es tijera
      jugador = prompt("Bx - GAMES 🎮 // let's go ~ \n\nElige:\n\n1) para 🥌\n2) para 📃\n3) para ✂️");

      alert(`Tu eliges ${eleccion(jugador)}`);
      alert(`Pc elige ${eleccion(pc)}`);
      // COMBATE
      alert(combate(pc, jugador));
    }

    //imprime - VICTORIAS - DERROTAS - EMPATES
    alert(`Player : GANASTE ${triunfos} 🏆 ~ EMPATASTE ${empates} 🤝 ~ PERDISTE ${perdidas} ☠️`);
    coronando();

    //MENU DE SALIDA!
    while (triunfos > perdidas || triunfos < perdidas) {
      let conexion = parseInt(prompt('Bx - GAMES 🎮\n\nVolver a jugar?\n\n1 - jugar \n2 - Ir a menú\n3 - Salir'));
      if (conexion == 1) {
        iniciar();
      } else if (conexion == 2) {
        menu();
        break;
      } else if (conexion == 3) {
        salir(true);
        break;
      } else {
        alert('☠️ Error! - ingresa otra opción');
        conexion = parseInt(prompt('Bx - GAMES 🎮\n\nVolver a jugar?\n\n1 - play \n2 - Ir a menú\n3 - Salir'));
        break;
      }
    }
  }
}