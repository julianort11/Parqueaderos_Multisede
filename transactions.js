// load("C:\\Users\\ortna\\OneDrive\\Documentos\\Parqueaderos_Multisede\\transactions.js")

const session = db.getMongo().startSession();
const dbSession = session.getDatabase("parking");
session.startTransaction();

try{
    dbSession.parqueos.insertOne({
        vehiculo_id: idVehiculos5,
        sede_id: idSedeMedellin,
        zona_id: idZonasMedellinA,
        hora_entrada: new Date("2025-06-22T14:00:00Z"),
        hora_salida: null,
        tiempo_total: null,
        costo: null});
    
        dbSession.zonas.updateOne({_id:idZonasMedellinA},{ $inc: { cupos_disponibles: -1 } })

        session.commitTransaction();
}catch (e) {
    session.abortTransaction();
    print("Error en la transaccion:", e )
} finally {
    session.endSession();
    print("Transaccion realizada con exito")
}