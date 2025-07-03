
// ¿Cuántos parqueos se registraron por sede en el último mes?
db.parqueos.aggregate([
  {
    $match: {
      hora_entrada: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
      }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "sede_id",
      foreignField: "_id",
      as: "sede"
    }
  },
  { $unwind: "$sede" },
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
    $group: {
      _id: {
        sede: "$sede_id",
        zona: "$zona_id"
      },
      cantidadParqueos: { $sum: 1 }
    }
  },
  {
    $sort: { cantidadParqueos: -1 }
  }
]);
    
// ¿Cuál es el ingreso total generado por parqueo en cada sede?
db.parqueos.aggregate([
    {
        $group: {
            _id: "$sede_id",
            totalIngresos:{ $sum: "$costo" }
        }
    },
    {
        $sort: { totalIngresos: -1 }
    }
]);

// ¿Qué cliente ha usado más veces el parqueadero?
db.parqueos.aggregate([
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
    {
        $match: { hora_salida: null }
    },
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
    {
        $group:{
            _id: "zonas_id",
            parqueosSimultaneos: { $sum: 1 }
        }
    },
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
    {
        $project:{
            zona_id: "$_id",
            parqueosSimultaneos: 1,
            capacidad_maxima: "$zona.capacidad_maxima",
            excedio: {$gt: ["paequeosSimultaneos", "$zona.capacidad_maxima"]}
        }
    },
    { 
        $match: { 
            excedido: true 
        } 
    }
])
