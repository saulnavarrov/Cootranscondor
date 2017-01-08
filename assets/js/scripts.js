var urlPath = window.location.pathname; // identificador de la pagina.

/**************************************************************************************************
*                                                                                                 *
*                                                  ZONAS                                          *
*                                                                                                 *
***************************************************************************************************/
// SOCKET
io.socket.on('zonas', (r) => {
  console.log(r);
});

var Zonas = {
  getListZ: (li,sk,sn,sa,wh) => {
    let options = {},
        errorList     = $('#errorList'),
        searchList    = $('#searchList'),
        tableList     = $('#tableList'),
        tableListBody = $('#tableList tbody'),
        listCero      = $('#listZero'),
        paginations   = $('#paginations'),
        loadersList   = $('#loadersList'),
        skip          = sk || 0,
        limt          = li || 10;

    // Peticion a la base de datos.
    Crud.rea(options, (e,d,r) => {
      // En caso de error
      if(e){
        loadersList.attr({"hidden": ''});
        errorList.removeAttr('hidden');
        errorList.html('');
        errorList.html(`<div class="col-md-12">
            <h3 class="text-danger text-center">Error</h3>
            <p class="text-center">Se ha presentado un error en el Servidor.<br>
            Intentelo de nuevo. <br>Sí el error persiste avise a soporte.</p>
          </div>`);
      }
      // Si el Servidor falla o la peticion.
      else if(r.statusCode !== 200){
        oadersList.attr({"hidden": ''});
        errorList.removeAttr('hidden');
        errorList.html('');
        errorList.html(`<div class="col-md-12">
            <h3 class="text-danger text-center">Error</h3>
            <p class="text-center">Se ha presentado al cargar la lista Operadores.<br>
            Intentelo de nuevo. <br>Sí el error persiste, contacte con soporte.</p>
          </div>`);
      }
      else{
        // En caso de que no hallan zonas agregadas.
        if (!d.length) {
          loadersList.attr({"hidden": ''});
          tableList.removeAttr('hidden');
          listCero.removeAttr('hidden');
          listCero.html(`<div class="col-md-12">
            <p class="text-center">No se ha encontrado ningun Operario Agregado en la lista</p>
          </div>`);
        }
        // Cuando hay zonas agregadas.
        else{
          listCero.attr({'hidden':''});
          loadersList.attr({"hidden": ''});
          tableList.removeAttr('hidden');
          searchList.removeAttr('hidden');
          paginations.removeAttr('hidden');
          tableListTbody.html(''); //Clear Table
        }
      }
    });
  }
}

/**************************************************************************************************
*                                                                                                 *
*                                          Menu function                                          *
*                                                                                                 *
***************************************************************************************************/
// Funcion para activar el menu y ver cual esta seleccionado
if(location.pathname){
  switch (location.pathname) {
    case '/':                  setChangeActiveMenu('das'); break;
    case '/history':           setChangeActiveMenu('his'); break;
    case '/consultas':         setChangeActiveMenu('con'); break;
    case '/permisos':          setChangeActiveMenu('per'); break;
    case '/taxis':             setChangeActiveMenu('tax'); break;
    case '/zonas':             setChangeActiveMenu('zon'); Zonas.getListZ(); break;
    case '/profile':           setChangeActiveMenu('pro'); break;
    case '/notificaciones':    setChangeActiveMenu('not'); break;
    case '/ajustes/users':     setChangeActiveMenu('aUse', 'aju'); break;
    case '/ajustes/logs':      setChangeActiveMenu('aLog','aju'); break;
    default: break;
  }
}

/**
 * setChangeActiveMenu description
 * @param {[Strign]} z [El id del li del menu]
 * @param {[Strign]} x [El id del li del menu, en caso de que tenga un padre el li ajustes > logs]
 */
function setChangeActiveMenu(z,x){
  var a = $(`#${z}`); // Busca el identificador que se ha seleccionado
  var b = $(`#${x}`); // Busca el identificador Padre selecionado ajustes > generales
  a.addClass('active'); // añade la clase
  b.addClass('active');
}
