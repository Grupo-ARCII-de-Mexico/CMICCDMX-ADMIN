export function eliminarObjetosRepetidos(array:any) {
    // Usamos un Set para mantener un registro de objetos únicos
    const objetosUnicos = new Set();
    
    // Usamos el método filter() para crear un nuevo array con objetos únicos
    const arrayFiltrado = array.filter((objeto:any) => {
      // Convertimos cada objeto a JSON para poder compararlo
      const objetoString = JSON.stringify(objeto);
      
      // Si el objeto no está en el conjunto de objetos únicos, lo agregamos y retornamos true
      if (!objetosUnicos.has(objetoString)) {
        objetosUnicos.add(objetoString);
        return true;
      }
      
      // Si el objeto ya está en el conjunto, retornamos false para excluirlo del nuevo array
      return false;
    });
    
    return arrayFiltrado;
  }