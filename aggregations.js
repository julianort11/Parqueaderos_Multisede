// ¿Cuántos parqueos se registraron por sede en el último mes?
db.parqueos.aggregate([
    // Filtrar parqueos registrados desde el último mes
  {
    $match: {
      hora_entrada: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
      }
    }
  },
    // Vincular cada parqueo con su sede para obtener el nombre de la sede

  {
    $lookup: {
      from: "sedes",
      localField: "sede_id",
      foreignField: "_id",
      as: "sede"
    }
  },
    // Convertir el arreglo "sede" en un documento individual
  { $unwind: "$sede" },
    // Agrupar por nombre de la sede y contar total de parqueos
  {
    $group: {
      _id: "$sede.nombre",
      totalParqueos: { $sum: 1 }
    }
  }
]);

// ¿Cuáles son las zonas más ocupadas en cada sede?
db.parqueos.aggregate([
  {
    // Agrupar por combinación de sede y zona, contando parqueos por grupo
    $group: {
      _id: {
        sede: "$sede_id",
        zona: "$zona_id"
      },
      cantidadParqueos: { $sum: 1 }
    }
  },
    // Ordenar de mayor a menor ocupación
  {
    $sort: { cantidadParqueos: -1 }
  }
]);
    
// ¿Cuál es el ingreso total generado por parqueo en cada sede?
db.parqueos.aggregate([
    // Agrupar por sede y sumar el campo "costo" para obtener ingresos
    {
        $group: {
            _id: "$sede_id",
            totalIngresos:{ $sum: "$costo" }
        }
    },
    // Ordenar de mayor a menor ingreso

    {
        $sort: { totalIngresos: -1 }
    }
]);

// ¿Qué cliente ha usado más veces el parqueadero?
db.parqueos.aggregate([
    // Vincular parqueos con los vehículos para conocer el cliente
    {
        $lookup: {
            from: "vehiculos",
            localField:"vehiculo_id",
            foreignField: "_id",
            as:"vehiculo"
        }
    },
    {
        $unwind: "$vehiculo"
    },
    // Agrupar por ID de cliente y contar parqueos
    {
        $group: {
            _id: "$vehiculo.usuarios_id",
            cantidadParqueos: { $sum:1 }
        }
    },
    {
        $sort: {cantidadParqueos: -1}
    },
    {
        $limit: 1
    }
]);

// ¿Qué tipo de vehículo es más frecuente por sede?
db.parqueos.aggregate([
    // Vincular parqueos con vehículos para obtener el tipo de vehículo
    {
        $lookup: {
            from: "vehiculos",
            localField: "vehiculo_id",
            foreignField: "_id",
            as: "vehiculo"
        }
    },
    {
        $unwind: "$vehiculo"
    },
    // Agrupar por sede y tipo de vehículo
    {
        $group:{
            _id: {
                sede: "$sede_id",
                tipo: "$vehiculo.tipo"
            },
            cantidad: { $sum: 1 }
        }
    },
    {
        $sort: {cantidadParqueos: -1}
    }
]);

// Dado un cliente, mostrar su historial de parqueos (fecha, sede, zona, tipo de vehículo, tiempo y costo).
db.parqueos.aggregate([
    // Vincular parqueos con vehículos para saber el tipo y el cliente
    {
        $lookup:{
            from: "vehiculos",
            localField: "vehiculo_id",
            foreignField: "_id",
            as:"vehiculo"
        }
    },
    {
        $unwind: "$vehiculo"
    },
    // Filtrar parqueos solo del cliente indicado (reemplaza el ObjectId por el del cliente deseado)
    {
        $match: {
            "vehiculo.usuarios_id": ObjectId("6865c2852739a144df50ec88")

        }
    },
    {
        $project: {
            _id: 0,
            tipo_vehiculo: "$vehiculo.tipo"
        }
    }
]);

// Mostrar los vehículos parqueados actualmente en cada sede.
db.parqueos.aggregate([
    // Filtrar parqueos activos (hora_salida nula)
    {
        $match: { hora_salida: null }
    },
    // Vincular parqueos con información de los vehículos
    {
        $lookup: {
            from: "vehiculos",
            localField: "vehiculo_id",
            foreignField: "_id",
            as: "vehiculo"
        }
    },
    {
        $unwind: "$vehiculo"
    },
    // Proyectar la informacion de interes
    {
    $project: {
      _id: 0,
      sede_id: 1,
      zona_id: 1,
      vehiculo: "$vehiculo.placa",
      tipo: "$vehiculo.tipo",
      hora_entrada: 1
    }
  }
])

// Listar zonas que han excedido su capacidad de parqueo en algún momento.
db.parqueos.aggregate([
    // Agrupar por zona, contando parqueos simultáneos históricos
    {
        $group:{
            _id: "zonas_id",
            parqueosSimultaneos: { $sum: 1 }
        }
    },
    // Vincular zonas para conocer su capacidad máxima
    {
        $lookup: {
            from: "zonas",
            localField: "_id",
            foreignField: "_id",
            as: "zona"
        }
    },
    {
        $unwind: "$zona"
    },
    // Proyectar comparación entre parqueos simultáneos y capacidad máxima
    {
        $project:{
            zona_id: "$_id",
            parqueosSimultaneos: 1,
            capacidad_maxima: "$zona.capacidad_maxima",
            excedio: {$gt: ["paequeosSimultaneos", "$zona.capacidad_maxima"]}
        }
    },
    // Filtrar solo las zonas que hayan excedido su capacidad
    { 
        $match: { 
            excedido: true 
        } 
    }
])
