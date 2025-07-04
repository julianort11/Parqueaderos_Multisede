// Carga todo el script en la consola para crear las colecciones rápidamente
// load("C:\\Users\\ortna\\OneDrive\\Documentos\\Parqueaderos_Multisede\\db_config.js")
// use parking

crearColecciones(db)

async function crearColecciones(db) {
    // Colección: usuarios
    // Almacena administradores, empleados y clientes con validaciones de nombre, cédula, rol, teléfono y sede asociada
    await db.createCollection("usuarios", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["cedula", "nombreCompleto", "rol", "telefono"],
                properties: {
                    cedula: { 
                        bsonType: "string", 
                        description: "Cédula del usuario" 
                    },
                    nombreCompleto: { 
                        bsonType: "object", 
                        required: ["nombre", "apellido"],
                        properties: {
                            nombre: {
                                bsonType: "string",
                                pattern: "^[A-Z]\\w{2,}",
                                description: "Nombre inicia en mayúscula y mínimo 3 letras"
                            },
                            apellido: {
                                bsonType: "string",
                                pattern: "^[A-Z]\\w{2,}",
                                description: "Apellido inicia en mayúscula y mínimo 3 letras"
                            }
                        },
                    },
                    rol: { 
                        enum: ["administrador", "empleado", "cliente"] 
                    },
                    telefono: {
                        bsonType: "string",
                        pattern: "^[0-9]{10}$",
                        description: "Teléfono debe tener exactamente 10 dígitos"
                    },
                    sede_id: { 
                        bsonType: ["objectId", "null"], 
                        description: "ID de sede si es empleado; nulo para clientes y administradores globales"
                    }
                }
            }
        }
    });
    await db.usuarios.createIndex({ cedula: 1 }, { unique: true });

    // Colección: vehiculos
    // Registra los vehículos asociados a clientes con placa, tipo, cliente dueño y sede
    await db.createCollection("vehiculos", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["placa", "tipo", "usuarios_id", "sede_id"],
                properties: {
                    placa: { 
                        bsonType: "string", 
                        minLength: 6, 
                        pattern: "^[A-Z]{3}[0-9]{3}$", 
                        description: "Formato placa: AAA123"
                    },
                    tipo: { 
                        enum: ["carro", "moto", "bicicleta", "camion"] 
                    },
                    usuarios_id: { 
                        bsonType: "objectId", 
                        description: "ID del cliente dueño del vehículo"
                    },
                    sede_id: { 
                        bsonType: "objectId", 
                        description: "ID de la sede donde está registrado el vehículo"
                    }
                }
            }
        }
    });
    await db.vehiculos.createIndex({ placa: 1 }, { unique: true });

    // Colección: sedes
    // Registra sedes con información básica como nombre, ciudad y dirección detallada
    await db.createCollection("sedes", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["nombre", "ciudad", "direccion"],
                properties: {
                    nombre: { 
                        bsonType: "string",
                        minLength: 4 
                    },
                    ciudad: { 
                        bsonType: "string"
                    },
                    direccion: { 
                        bsonType: "object",
                        required: ["calle", "numero"],
                        properties: {
                            calle: { 
                                bsonType: "string" 
                            },
                            numero: { 
                                bsonType: "int",
                                maximum: 111 
                            },
                            barrio: { 
                                bsonType: "string" 
                            }
                        }
                    }
                }
            }
        }
    });
    await db.sedes.createIndex({ nombre: 1 }, { unique: true });

    // Colección: zonas
    // Define zonas dentro de cada sede, con capacidad, cupos disponibles, tipos permitidos y tarifa
    await db.createCollection("zonas", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["sede_id", "nombre", "capacidad", "cupos_disponibles", "tipos_permitidos", "tarifa_hora"],
                properties: {
                    sede_id: { 
                        bsonType: "objectId", 
                        description: "ID de la sede a la que pertenece la zona"
                    },
                    nombre: { 
                        bsonType: "string" 
                    },
                    capacidad: { 
                        bsonType: "int",
                        minimum: 0 
                    },
                    cupos_disponibles: { 
                        bsonType: "int",
                        minimum: 0
                    },
                    tipos_permitidos: { 
                        bsonType: "array", 
                        items: { enum: ["carro", "moto", "bicicleta", "camion"] } 
                    },
                    tarifa_hora: { 
                        bsonType: "int" 
                    }
                }
            }
        }
    });
    await db.zonas.createIndex({ sede_id: 1, nombre: 1 }, { unique: true });

    // Colección: parqueos
    // Registra los ingresos y salidas de vehículos, con hora de entrada, salida, tiempo total y costo calculado
    await db.createCollection("parqueos", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["vehiculo_id", "sede_id", "zona_id", "hora_entrada"],
                properties: {
                    vehiculo_id: { 
                        bsonType: "objectId",
                        description: "ID del vehículo que ingresa"
                    },
                    sede_id: { 
                        bsonType: "objectId",
                        description: "ID de la sede donde ocurre el parqueo"
                    },
                    zona_id: { 
                        bsonType: "objectId", 
                        description: "ID de la zona asignada"
                    },
                    hora_entrada: { 
                        bsonType: "date", 
                        description: "Fecha y hora de entrada del vehículo"
                    },
                    hora_salida: { 
                        bsonType: ["date", "null"] 
                    },
                    tiempo_total: { 
                        bsonType: ["double", "int", "null"] 
                    },
                    costo: { 
                        bsonType: ["int", "null"],
                        minimum: 0 
                    }
                }
            }
        }
    });
    await db.parqueos.createIndex({ sede_id: 1, zona_id: 1 });
}
