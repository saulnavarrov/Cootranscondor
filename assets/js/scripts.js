var urlPath = window.location.pathname; // identificador de la pagina.

/**************************************************************************************************
*                                                                                                 *
*                                                  Users                                         *
*                                                                                                 *
***************************************************************************************************/
// SOCKET
io.socket.on('users', (rs) => {});

/**************************************************************************************************
*                                                                                                 *
*                                                  ZONAS                                          *
*                                                                                                 *
***************************************************************************************************/
// SOCKET
io.socket.on('zonas', (rs) => {});

var cantZo; // Paginacion.
var Zonas = {
  "errorList":      $('#errorList'),
  "searchList":     $('#searchList'),
  "tableList":      $('#tableList'),
  "tableListTbody":  $('#tableList tbody'),
  "listCero":       $('#listZero'),
  "paginations":    $('#paginations'),
  "loadersList":    $('#loadersList'),

  /**
   * @description :: Peticion de listado, e imprimira si hay o no resultados
   * @param  {[Integer]} li [cantidad de resultados]
   * @param  {[Integer]} sk [Resultados omitidos o paginación]
   * @param  {[String]}  sn [orden de la lista]
   * @param  {[String]}  sa [orden ASC o DESC]
   * @param  {[String]}  wh [busqueda]
   * @param  {[String]}  ac [resultados Activos]
   * @return {[type]}       [description]
   */
  getListZ: (li,sk,sn,sa,wh,ac) => {
    let _this = Zonas;
    let options = {url:'zonas', lim: li, ski: sk, sna: sn, sad: sa, act: ac },
        skip          = sk || 0,
        limt          = li || 10;

    // Peticion a la base de datos.
    Crud.rea(options, (e,d,r) => {
      // En caso de error
      if(e){
        _this.loadersList.attr({"hidden": ''});
        _this.errorList.removeAttr('hidden');
        _this.errorList.html('');
        _this.errorList.html(`<div class="col-md-12">
            <h3 class="text-danger text-center">Error</h3>
            <p class="text-center">Se ha presentado un error en el Servidor. Intentelo de nuevo. <br>Sí el error persiste avise a soporte.</p>
          </div>`);
      }
      // Si el Servidor falla o la peticion.
      else if(r.statusCode !== 200){
        _this.loadersList.attr({"hidden": ''});
        _this.errorList.removeAttr('hidden');
        _this.errorList.html('');
        _this.errorList.html(`<div class="col-md-12">
            <h3 class="text-danger text-center">Error</h3>
            <p class="text-center">Se ha presentado al cargar la lista Operadores.<br>
            Intentelo de nuevo. <br>Sí el error persiste, contacte con soporte.</p>
          </div>`);
      }
      else{
        // En caso de que no hallan zonas agregadas.
        if (!d.length) {
          _this.loadersList.attr({"hidden": ''});
          _this.tableList.removeAttr('hidden');
          _this.listCero.removeAttr('hidden');
          _this.listCero.html(`<div class="col-md-12">
            <p class="text-center">No se ha encontrado ningun Operario Agregado en la lista</p>
          </div>`);
        }
        // Cuando hay zonas agregadas.
        else{
          _this.listCero.attr({'hidden':''});
          _this.loadersList.attr({"hidden": ''});
          _this.tableList.removeAttr('hidden');
          _this.searchList.removeAttr('hidden');
          _this.paginations.removeAttr('hidden');
          _this.tableListTbody.html(''); //Clear Table
          // Imprimiendo resultados.
          d.forEach((it, ind) => {
            _this.printListResultZ(it, ((skip*limt)+ind));
          });
          _this.paginationList(limt, skip)
        }
      }
    });
  },

  /**
   * @description :: Imprimira en pantalla la lista de resultados
   * @param  {[Object]}  it  []
   * @param  {[Integer]} ind []
   * @return {[type]}        []
   */
  printListResultZ: (it, ind) => {
    let _this = Zonas;
    _this.tableListTbody.append(`<tr id="zo-${it.id}">
      <td id="zoi-${it.id}">${ind+1}</td>
      <td>
        <input type="checkbox" id="zoc-${it.id}" name="zoc-${it.id}" disabled/>
        <label for="dev-${it.id}"></label>
      </td>
      <td>${it.numberZona}</td>
      <td>${it.nameZona}</td>
      <td>${it.cityZona}</td>
      <td class="hidden-xs">${it.latitudZona === null ? '-':it.latitudZona}</td>
      <td class="hidden-xs">${it.longitudZona === null ? '-':it.longitudZona}</td>
      <td class="hidden-xs">${it.horariZona ? it.hourStart : ''} - ${it.horariZona ? it.hourEnd : ''}</td>
      <td>
        <!-- Single button -->
        <div class="btn-group">
            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" style="right: 0px; left: inherit;">
            <li role="separator" class="divider"></li>
              <li><a href="#" onclick="Zonas.view('${it.id}')">Ver</a></li>
              <li><a href="#" onclick="Zonas.edit('${it.id}')">Editar</a></li>
              <li><a href="#" onclick="Zonas.dele('${it.id}')">Eliminar</a></li>
            <li role="separator" class="divider"></li>
          </ul>
        </div>
      </td>
    </tr>`);

    // Checkbox activo
    it.activeZona === 'active' ? $(`#zoc-${it.id}`).prop('checked','true') : $(`#zoc-${it.id}`).prop('checked','');
  },

  /**
   * @description :: Actualiza el item que esta en la lista.
   * @param  {[type]} it [description]
   * @return {[type]}    [description]
   */
  updatedItemList: it => {
    let id = $(`#zo-${it.id}`);
    let ind = $(`#zoi-${it.id}`).text();

    id.html('');
    id.html(`
      <td id="zoi-${it.id}">${ind}</td>
      <td>
        <input type="checkbox" id="zoc-${it.id}" name="zoc-${it.id}" disabled/>
        <label for="dev-${it.id}"></label>
      </td>
      <td>${it.numberZona}</td>
      <td>${it.nameZona}</td>
      <td>${it.cityZona}</td>
      <td class="hidden-xs">${it.latitudZona === null ? '-':it.latitudZona}</td>
      <td class="hidden-xs">${it.longitudZona === null ? '-':it.longitudZona}</td>
      <td class="hidden-xs">${it.horariZona ? it.hourStart : ''} - ${it.horariZona ? it.hourEnd : ''}</td>
      <td>
        <!-- Single button -->
        <div class="btn-group">
            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" style="right: 0px; left: inherit;">
            <li role="separator" class="divider"></li>
              <li><a href="#" onclick="Zonas.view('${it.id}')">Ver</a></li>
              <li><a href="#" onclick="Zonas.edit('${it.id}')">Editar</a></li>
              <li><a href="#" onclick="Zonas.dele('${it.id}')">Eliminar</a></li>
            <li role="separator" class="divider"></li>
          </ul>
        </div>
      </td>
    `);
    it.activeZona === 'active' ? $(`#zoc-${it.id}`).prop('checked','true') : $(`#zoc-${it.id}`).prop('checked','');
  },

  /**
   * @description :: Elimina el item de la lista.
   * @param  {[type]} it [description]
   * @return {[type]}    [description]
   */
  deleteItemList: it => {
    let _this = Zonas,
        item = $('#tableList tbody tr');

    // Remuevo el iten de la lista.
    item.remove(`#zo-${it.id}`);

    // Actualiza la pagina.
    _this.getListZ();

  },

  /**
   * @description :: Impresion y control de la paginacion.
   * @param  {[type]} l [description]
   * @param  {[type]} p [description]
   * @return {[type]}   [description]
   */
  paginationList: (l,p) => {
    let _this = Zonas,
        pag = p || 0, // Numero de la pagina activa
        options = {url:'zonas', lim: 0, ski: 0};

    // Peticion de cantidad.
    Crud.rea(options, (e,d,r)=>{
      if(e){}
      else{
        cantZo = Math.ceil(d.length / l); // Cantidad paginas <li>

        $('#pagNum').html(''); // Clear content paginacion
        $('#pagNum').append(`<li class="paginate_button previous disabled" id="prevZon"><a href="#" >Previous</a></li>`); // Preview List

        for(let a=0;a<cantZo;a++){
          // paginas <li>
          $('#pagNum').append(`<li class="paginate_button ${a === pag ? 'active':''}"><a href="#" onclick="Zonas.listPag(${a === pag ? '': a})">${a+1}</a></li>`);
        }

        $('#pagNum').append(`<li class="paginate_button next disabled" id="nextZon"><a href="#">Next</a></li>`); // Next List

        // activa o desactiva prev o next
        _this.prevNextPagZona(pag);
      }
    });
  },

  /**
   * @description :: Cambia la cantidad de resultados
   * @return {[type]} [description]
   */
  limitPage: () => {
    let _this = Zonas,
        l = $('#limitItemsPag').val(); // litite de resultado por paginas
    _this.getListZ(Number(l), null, null, null, null, null); // Cambia la cantidad de resultados de la lista
  },

  /**
   * @description :: Cambia de pagina y actualiza la paginacion
   * @param  {[type]} s [description]
   * @return {[type]}   [description]
   */
  listPag: s => {
    let _this = Zonas,
        l = $('#limitItemsPag').val(); // Obtiene la cantidad de resultados a imprimir
        // sna = JSON.parse(sessionStorage.getItem('orderTitleTableZonas')) || ''; // Ordena la tabla, como quedo guardada

        // Cambia la pagina
        _this.prevNextPagZona(s);

        // Imprime de nuevo la lista con el orden, el nuevo limite y la omicion (paginacion)
        _this.getListZ(l, s);
  },

  /**
   * @description :: Controla la class de prev y next paginator
   * @param  {[type]} s [description]
   * @return {[type]}   [description]
   */
  prevNextPagZona: i => {
    let _this = Zonas;
    let ne = i + 1,
        pr = i - 1;

    // Activa o desactiva el boton de prev
    if((i) === 0) {
      $('#prevZon').addClass('disabled');
      $('#prevZon').html(`<a href="#">Preview</a>`);
    }else{
      $('#prevZon').removeClass('disabled');
      $('#prevZon').html(`<a href="#" onclick="Zonas.listPag(${pr})">Preview</a>`);
    }

    // Activa o desactiva el boton de next
    if((i+1) === cantZo){
      $('#nextZon').addClass('disabled');
      $('#nextZon').html(`<a href="#">Next</a>`);
    }else{
      $('#nextZon').removeClass('disabled');
      $('#nextZon').html(`<a href="#" onclick="Zonas.listPag(${ne})">Next</a>`);
    }
  },

  /**
   * @description :: Llama la zona e imprime por completo la información
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  view: (id) => {
    $('#modalSeeForm').modal('show');
    let i = `${id}/`,
        options = {url:'zonas', lim: 0, ids:i};
    //Hace la peticion al servidor.
    Crud.rea(options, (e,d,r) => {
      if(r.statusCode !== 200){
        swal('No se encontro', 'No se encontro la zona o fue eliminada. Actualize la pagina y vuelva a intentarlo','warning');
      }else{
        $('#sTitleZona').text(`Zona: ${d.numberZona} ${d.nameZona}`),
        $('#sImagenZona').attr({'src':`${d.imagenZona}`, 'alt': `${d.nameZona}`}),
        $('#sEditZona').attr({'onclick': `Zonas.edit('${d.id}')`}),
        $('#sNumberZona').text(d.numberZona),
        $('#sNameZona').text(d.nameZona),
        $('#sCityZona').text(d.cityZona),
        $('#sActiveZona').text(`${d.activeZona ? 'Activo' : 'No Activo'}`),
        $('#sLatZona').text(`${d.latitudZona !== null ? d.latitudZona : ''}`),
        $('#sLonZona').text(`${d.longitudZona !== null ? d.longitudZona : ''}`),
        $('#sHourZona').text(`${d.horariZona ? 'Activo' : 'No Activo'}`),
        $('#sHoraInicioZona').text(d.hourStart),
        $('#sHoraFinalZona').text(d.hourEnd);

        // Agergar la funcion de mapas.
      }
    });
  },

  /**
   * @description :: Imprime los datos en el formulario para ser editados.
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  edit: id => {
    $('#modalSeeForm').modal('hide'); // Cerrara el modal en caso de que venga de view

    let i = `${id}/`,
        options = {url:'zonas', lim: 0, ids:i};
    //Hace la peticion al servidor.
    Crud.rea(options, (e,d,r) => {
      if(r.statusCode !== 200){
        swal('No se encontro', 'No se encontro la zona o fue eliminada. Actualize la pagina y vuelva a intentarlo','warning');
      }else{
        $('#eNumberZona').val(d.numberZona);
        $('#eZonaName').val(_.startCase(d.nameZona));
        $('#eActiveZona').val(d.activeZona);
        $('#eActiveHourZona').val(String(d.horariZona));
        $('#eHoraStartZ').val(d.hourStart);
        $('#eHoraEndZ').val(d.hourEnd);
        $('#eCiudadZona').val(d.cityZona);
        $('#eLatZona').val(d.latitudZona);
        $('#eLonZona').val(d.longitudZona);
        $('#eVersZona').val(d.version);
        $('#eIdZona').val(d.id);
        // Si el horario esta activo.
        if(d.horariZona){
          $('#eHoraStartZ').removeAttr('disabled');
          $('#eHoraEndZ').removeAttr('disabled');
        }
        // Abre el modal con los datos ya cargados.
        $('#modalEditForm').modal('show');

      }
    });
  },

  /**
   * @description :: Elimina la zona Seleccionada.
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  dele: id => {
    let _this = Zonas,
        i = `${id}/`,
        options = {url:'zonas', lim: 0, ids:i};

    swal({
      title: 'Cuidado',
      text: 'Estas a punto de Eliminar una de la zonas\nSe perdera toda la información, historiales y demas.\n ¿Desea Continuar?',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
    }, () => {
      Crud.del(options, (e,d,r) => {
        if(r.statusCode !== 200){
          swal('Error', `La Zona que desea Eliminar No existe o ha sido eliminada anteriormente.\nVuelva a intentarlo`,'error');
        }else{
          swal("Success", `La Zona se ha Eliminado Correctamente.`, "success");
          _this.deleteItemList(d);// Elimina el item
        }
      });
    });
  }
}

// Activa los selectorez de horarios en Agregar
$(document).on('change','#aActiveHourZona', e =>{
  e.preventDefault();
  let buttonActive = $('#aActiveHourZona').val();

  if(buttonActive !== 'false'){
    $('#aHoraStartZ').removeAttr('disabled');
    $('#aHoraEndZ').removeAttr('disabled');
  }else{
    $('#aHoraStartZ').attr({'disabled':''});
    $('#aHoraEndZ').attr({'disabled':''});
  }
});

// Activa los selectorez de horarios en editar.
$(document).on('change','#eActiveHourZona', e =>{
  e.preventDefault();
  let buttonActive = $('#eActiveHourZona').val();

  if(buttonActive !== 'false'){
    $('#eHoraStartZ').removeAttr('disabled');
    $('#eHoraEndZ').removeAttr('disabled');
  }else{
    $('#eHoraStartZ').attr({'disabled':''});
    $('#eHoraEndZ').attr({'disabled':''});
  }
});

/**
 * @description :: Agrega la nueva zona.
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
$(document).on('click', '#addNewZona', e => {
  e.preventDefault();
  // Validando formulario
  let zend = 0;
      formVal.text('#aZonaName', r => {zend += r;});
      formVal.number('#aNumberZona', r => {zend += r;});
      formVal.text('#aActiveZona', r => {zend += r;});
      formVal.text('#aActiveHourZona', r => {zend +=r;});
      formVal.text('#aCiudadZona', r => {zend += r;});

  // Formulario no valido o inputs vacios
  if(zend){
    swal('Alerta', 'Por Favor llene los campos en rojo.','warning');
  }else{
    // Recoleccion de datos para ser guardados.
    let options = {
      url: 'zonas',
      tok: $('#_csrf').val(),
      dat: {
        "numberZona":       Number($('#aNumberZona').val()),
        "nameZona":         _.startCase($('#aZonaName').val()),
        "latitudZona":      parseFloat($('#aLatZona').val()),
        "longitudZona":     parseFloat($('#aLonZona').val()),
        "activeZona":       $('#aActiveZona').val(),
        "horariZona":       $('#aActiveHourZona').val(),
        "hourStart":        $('#aHoraStartZ').val() || '0:00',
        "hourEnd":          $('#aHoraEndZ').val() || '0:00',
        "cityZona":         $('#aCiudadZona').val(),
        "version":          $('#aVersZona').val(),
        //"imagenZona":       ${'#'},
      }
    };

    // Peticion al servidor.
    Crud.cre(options, (e,d,r) => {
      // En caso de error en la peticion
      if(e){
        swal('Error', `Se ha presentado un error en el Servidor.\nIntentelo de nuevo, \nSí el error persiste avise a soporte.`,'error');
      }
      // por si la zona existe.
      else if(r.statusCode === 400){
        swal('Alerta', `Esta Zona ya se encuentra Registrada ${Number($('#aNumberZona').val())}`, 'warning');
        $('#aNumberZona').css({'border-color': 'red', 'box-shadow': '0px 0px 1px red'});
      }
      else if(r.statusCode === 201){
        // Zona guardada correctamente.
        swal({
          title: "Zona Agregada Correctamente",
          text: "Los Datos han sido agregados correctamente.",
          type: "success",
          showCancelButton: false,
          confirmButtonColor: "#5CE27F",
          confirmButtonText: "Ok",
          closeOnConfirm: false
        },() => {
          // Clear formulario
          $('#aNumberZona').val('').removeAttr('style');
          $('#aZonaName').val('').removeAttr('style');
          $('#aLatZona').val('').removeAttr('style');
          $('#aLonZona').val('').removeAttr('style');
          $('#aActiveZona').val('').removeAttr('style');
          $('#aActiveHourZona').val('').removeAttr('style');
          $('#aHoraStartZ').val('').removeAttr('style');
          $('#aHoraEndZ').val('').removeAttr('style');
          $('#aCiudadZona').val('').removeAttr('style');
          //$('#aImageZona').val('').removeAttr('style');
          $('#modalAddForm').modal('hide');
          swal.close();
        });
        Zonas.printListResultZ(d, ($('table tbody tr').length));
      }
    });
  }
});

/**
 * @description :: Envia la peticion y actualiza la lista en la DB y el Document.
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
$(document).on('click', '#saveEditZona', e => {
  e.preventDefault();
  // Validando datos.
  let zend = 0;
      formVal.text('#eZonaName', r => {zend += r;});
      formVal.number('#eNumberZona', r => {zend += r;});
      formVal.text('#eActiveZona', r => {zend += r;});
      formVal.text('#eActiveHourZona', r => {zend +=r;});
      formVal.text('#eCiudadZona', r => {zend += r;});

  // Formulario no valido o inputs vacios
  if(zend){
    swal('Alerta', 'Por Favor llene los campos en rojo.','warning');
  }else{
    // Recoleccion de datos para ser guardados.
    let options = {
      url: 'zonas',
      tok: $('#_csrf').val(),
      ids: $('#eIdZona').val(),
      dat: {
        "numberZona":       Number($('#eNumberZona').val()),
        "nameZona":         _.startCase($('#eZonaName').val()),
        "latitudZona":      parseFloat($('#eLatZona').val()),
        "longitudZona":     parseFloat($('#eLonZona').val()),
        "activeZona":       $('#eActiveZona').val(),
        "horariZona":       $('#eActiveHourZona').val(),
        "hourStart":        $('#eHoraStartZ').val() || '0:00',
        "hourEnd":          $('#eHoraEndZ').val() || '0:00',
        "cityZona":         $('#eCiudadZona').val(),
        "version":          Number($('#eVersZona').val()) + 1,
        //"imagenZona":       ${'#'},
      }
    };

    Crud.upd(options, (e,d,r) => {
      if(e){
        swal('Error', `Se ha presentado un error en el Servidor.\nIntentelo de nuevo, \nSí el error persiste avise a soporte.`,'error');
      }else if(r.statusCode === 404){
        swal('Error', `La Zona que desea Editar No existe o ha sido eliminado.\nVuelva a intentarlo`,'error');
      }else{
        // Impresion en pantalla si los datos
        console.log(r);
        if(r.statusCode === 200){
          swal({
            title: "Zona Guardada Correctamente",
            text: "Los Datos han sido Actualizados correctamente.",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#5CE27F",
            confirmButtonText: "Ok",
            closeOnConfirm: false
          },function(){
            // Clear formulario
            $('#modalEditForm').modal('hide');
            swal.close();
            Zonas.updatedItemList(d);
          });
        }
      }
    });
  }
});

/**
 * @description :: Evento para ordenar la tabla
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
let ot; // orden table
let ord = {son: '', soa: ''}; // Guarda el orden de la tabla para la busqueda.
$(document).on('click', '#tableList thead tr th', e => {
  e.preventDefault();

  let ski = $('#pagNum li.active').text(),          // Numero de la pagina
      lim = $('#limitItemsPag').val(),              // Valor cantidad items
      sea = $('input[name=search_text]'),            // Input Search
      itm = e.target.offsetParent.cellIndex,        // Index titulo table donde hace click
      tar = e.target.textContent,                   // Obtiene el valor del titulo
      adl = ot,                                     // contador ASC o DESC
      sna = '',                                     // valor ASC o DESC
      the = { "Act:":"activeZona","Numero:":"numberZona","Nombre:":"nameZona","Ciudad:":"cityZona","Lat:":"latitudZona","Log:":"longitudZona","Horario:":"hourStart",}

  // Ejecucion del filtro.
  if(tar !== '#' && tar !== 'Acciones:'){
    // En caso de que no exista y si existe lo sume.
    ot === undefined ? adl = 0 : adl++;

    // guarda el valor
    ot = adl;

    // Tabla acendente o desendente
    ot % 2 ? sna = 'DESC' : sna = 'ASC';

    // Guarda de manera temporal el orden de la busqueda.
    ord = {son: the[tar], soa: sna}

    // Agrega el icono en la tabla
    addClassTitleHeadTable(e.target, the[tar], (ot%2));

    // Ordena la lista
    Zonas.getListZ(lim, (Number(ski) - 1), the[tar], sna);
  }

  // Cambia el nombre de la busqueda.
  sea.val('');
  sea.attr({'placeholder':`Buscar por ${tar}`});
  // El cambio de la busqueda en la base de datos.
  $('input[name=search_title]').val(the[tar]);

});


/**
 * @description :: Cambia el incono del titulo de la tabla por ASC o DESC
 * @param  {[type]} e   [description]
 * @param  {[type]} san [description]
 * @param  {[type]} ad  [description]
 * @return {[type]}     [description]
 */
var addClassTitleHeadTable = (e, san, ad) => {
  let i     = e.cellIndex || e.offsetParent.cellIndex, // Sabe donde se Dios el click de la tabla
      thead = $('#tableList thead tr th'); // Columna seleccionada de la table

  // Clear titulos con ASC o DESC icons
  $('#tableList thead tr th.sorting_asc').removeClass('sorting_asc');
  $('#tableList thead tr th.sorting_desc').removeClass('sorting_desc');

  // Rorganiza los atributos.
  for(let a=0;a<thead.length;a++){
    // Filtro para omitir el primero y el ultimo de la lista.
    if(a !== 0 && a !== (thead.length - 1))
      thead.eq(a).addClass('sorting') // Volvera a poner las clases
  }

  // Pondra el ASC o DESC en el titulo clickeado
  if(!ad){
    thead.eq(i).addClass('sorting_asc');
  }else{
    thead.eq(i).addClass('sorting_desc');
  }
};

/**
 * @description :: Funcion para buscar dentro de la tabla.
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
$(document).on('click', '#searchZonas', e => {
  e.preventDefault();

  let options = {
      mon: $('input[name=search_title]').val(),
      sea: $('input[name=search_text]').val(),
      pag: 'Zonas',
      url: 'zonas',
      son: ord.son || $('input[name=search_title]').val(),
      soa: ord.soa || 'ASC'
    };

  // Hace la peticion al servidor y la imprimira en pantalla.
  searchListTable(options);
});

/**
 * @description :: Buscara e imprimira en la tabla los resultados de la busqueda.
 * @param  {[type]} opt [description]
 * @return {[type]}     [description]
 */
var searchListTable = opt => {
  let options       = { mon: opt.mon, sea: opt.sea, url: opt.url, lim: 0, ski: 0, son: opt.son, soa: opt.sao},
      pagina        = opt.pag || '',
      errorList     = $('#errorList'),
      tableListTbody = $('#tableList tbody'),
      listCero      = $('#listCero'),
      paginations   = $('#paginations');

  if(opt.sea !== ''){
    // Peticion al servidor
    Crud.sea(options, (e,d,r) => {
      if(e) {
        errorList.removeAttr('hidden');
        errorList.html('');
        errorList.html(`<div class="col-md-12">
            <h3 class="text-danger text-center">Error</h3>
            <p class="text-center">Se ha presentado un error en el Servidor.<br>
            Intentelo de nuevo. <br>Sí el error persiste avise a soporte.</p>
          </div>`);
      }
      // si la peticion falla
      else if(r.statusCode !== 200) {
        errorList.removeAttr('hidden');
        paginations.attr({'hidden':''});
        errorList.html('');
        errorList.html(`<div class="col-md-12">
            <h3 class="text-danger text-center">Error</h3>
            <p class="text-center">Se ha presentado al cargar la lista: ${pagina}.<br>
            Intentelo de nuevo. <br>Sí el error persiste, contacte con soporte.</p>
          </div>`);
      }
      // Si la peticion es real
      else {
        if (!d.length) {
          tableListTbody.html('');
          paginations.attr({'hidden':''});
          listCero.removeAttr('hidden');
          listCero.html(`<div class="col-md-12">
            <p class="text-center">No se ha encontrado ningun resultado</p>
          </div>`);
        }else{
          listCero.attr({'hidden':''});
          paginations.attr({'hidden':''});
          tableListTbody.html(''); //Clear Table
          // Imprimiendo tabla
          d.forEach((it, ind) => {
            switch (location.pathname) {
              // case '/history':        break;
              // case '/consultas':      break;
              // case '/permisos':       break;
              // case '/taxis':          break;
              case '/zonas':          Zonas.printListResultZ(it, ind); break;
              // case '/notificaciones': break;
              // case '/ajustes/users':  break;
              // case '/ajustes/logs':   break;
              default: break;
            }
          });
        }
      }
    });
  }
};

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
 * setChangeActiveMenu
 * @description :: Cambiara el menu activo
 * @param {[Strign]} z [El id del li del menu]
 * @param {[Strign]} x [El id del li del menu, en caso de que tenga un padre el li ajustes > logs]
 */
function setChangeActiveMenu(z,x){
  let a = $(`#${z}`), // Busca el identificador que se ha seleccionado
      b = $(`#${x}`), // Busca el identificador Padre selecionado ajustes > generales
      c = localStorage.getItem('sidebar-toggle'); // Leera el toggle

  a.addClass('active'); // añade la clase
  b.addClass('active');

  c !== 'false' ? $('body').removeClass('sidebar-collapse') : $('body').addClass('sidebar-collapse');
}

/**
 * @description :: Controlara el toggle de sidebar izquierdo, y lo mantendra como lo dejo.
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
$(document).on('click', '.sidebar-toggle', e => {
  e.preventDefault();
  // true cerrado --- false abierto
  let sidebarLocal = localStorage.getItem('sidebar-toggle');
  // Guardara el estado en localStorage
  if(sidebarLocal !== 'false'){
    localStorage.setItem('sidebar-toggle', false);
  }else{
    localStorage.setItem('sidebar-toggle', true);
  }
});
