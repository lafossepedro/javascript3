document.addEventListener('DOMContentLoaded', function() {
    // Recuperar resultados almacenados en LocalStorage
    var resultadosGuardados = localStorage.getItem('resultados');
  
    if (resultadosGuardados) {
      // Mostrar los resultados almacenados
      document.getElementById('resultados').innerHTML = resultadosGuardados;
  
      // Mostrar un mensaje informando al usuario
      alert('¡Bienvenido de nuevo! Hemos cargado los resultados de tu último presupuesto.');
    }
  });

function calcularPresupuesto() {
    // Obtener valores del usuario
    var destino = document.getElementById('destino').value;
    var presupuesto = parseFloat(document.getElementById('presupuesto').value);
    var frecuencia = document.getElementById('frecuencia').value;
    var periodo = parseInt(document.getElementById('periodo').value);
  
    // Obtener prioridades
    var transporte = parseInt(document.getElementById('transporte').value);
    var alojamiento = parseInt(document.getElementById('alojamiento').value);
    var excursiones = parseInt(document.getElementById('excursiones').value);
    var comidas = parseInt(document.getElementById('comidas').value);
    var imprevistos = parseInt(document.getElementById('imprevistos').value);
  
    // Validar que se haya ingresado el presupuesto y al menos una prioridad
    if (isNaN(presupuesto) || presupuesto <= 0 || isNaN(transporte + alojamiento + excursiones + comidas + imprevistos)) {
      alert("Ingresá un presupuesto válido y asigná un número del 1 al 5 según tus prioridades para este viaje.");
      return;
    }
  
    // Ordenar las prioridades
    var prioridades = [
      { categoria: "transporte", prioridad: transporte },
      { categoria: "alojamiento", prioridad: alojamiento },
      { categoria: "excursiones", prioridad: excursiones },
      { categoria: "comidas", prioridad: comidas },
      { categoria: "imprevistos", prioridad: imprevistos }
    ];
  
    // Ordenar de menor a mayor prioridad
    prioridades.sort(function(a, b) {
      return a.prioridad - b.prioridad;
    });
  
    // Calcular porcentajes
    var totalPorcentaje = 100;
    var porcentajes = [25, 20, 20, 15, 10];
  
    // Calcular asignación por categoría
    var asignaciones = {};
    for (var i = 0; i < prioridades.length; i++) {
      var categoria = prioridades[i].categoria;
      asignaciones[categoria] = (presupuesto * (porcentajes[i] / totalPorcentaje)) / periodo;
    }

  // Mostrar resultados
  var resultados = document.getElementById('resultados');
  resultados.innerHTML = `
    <p>Asignación de presupuesto por ${frecuencia} para tu viaje a ${destino}:</p>
    <ul>
      <li>Transporte por ${frecuencia}: $${asignaciones['transporte'].toFixed(2)}</li>
      <li>Alojamiento por ${frecuencia}: $${asignaciones['alojamiento'].toFixed(2)}</li>
      <li>Excursiones por ${frecuencia}: $${asignaciones['excursiones'].toFixed(2)}</li>
      <li>Comidas por ${frecuencia}: $${asignaciones['comidas'].toFixed(2)}</li>
      <li>Imprevistos por ${frecuencia}: $${asignaciones['imprevistos'].toFixed(2)}</li>
    </ul>
  `;

  // Almacenar resultados en LocalStorage
  localStorage.setItem('resultados', resultados.innerHTML);
}