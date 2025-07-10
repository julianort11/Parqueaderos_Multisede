// mostrar la cantidad de parqueos realizados por tipo de vehiculo en cada sede 
db.parqueos.aggregate([
    {
        $group: {
            _id: {
                sede:"$sede_id",
                tipo: "$vehiculo.tipo"
            },
            cantidad: { $sum: 1 }
        }
    }
])

// listar clientes que han usado el parqueadero mas de 5 veces el ultimo mes
db.parqueos.aggregate([
    {
        $group: {
            _id: "$vehiculo.usuarios_id"
        },
        totalparqueos: { sum: 1 }
    },
    {
        $project: {
            _id: 0,
            totalparqueos: {$gt: 5}
        }
    }
])

//calcular el promedio de tiempo por vehiculo en un asede en especifica 