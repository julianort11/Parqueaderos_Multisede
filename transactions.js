// Carga el script en la consola para registrar un nuevo ingreso de vehículo y actualizar cupos de zona de forma transaccional
// load("C:\\Users\\ortna\\OneDrive\\Documentos\\Parqueaderos_Multisede\\transactions.js")

// Iniciar una sesión para la transacción
const session = db.getMongo().startSession();
const dbSession = session.getDatabase("parking");
session.startTransaction();

try {
    // Insertar un nuevo registro en la colección parqueos
    dbSession.parqueos.insertOne({
        vehiculo: {
            _id: idVehiculos7,
            placa: "STU901",
            tipo: "carro"
        },
        sede_id: idSedeMedellin,
        zona: {
            _id: idZonasMedellinA,
            nombre: "Zona_A",
            tarifa_hora: 3400
        },
        hora_entrada: ISODate("2025-07-09T08:00:00Z"),
        hora_salida: null,
        tiempo_total: 2,
        costo: 6800                          
    });
    
    // Actualizar la colección zonas para reducir los cupos disponibles en la zona correspondiente
    dbSession.zonas.updateOne(
        { _id: idZonasMedellinA },
        { $inc: { cupos_disponibles: -1 } } 
    );

    // Si ambos pasos se ejecutan correctamente, confirma la transacción
    session.commitTransaction();
} catch (e) {
    session.abortTransaction();
    print("Error en la transacción:", e);
} finally {
    session.endSession();
    print("Transacción realizada con éxito");
}
