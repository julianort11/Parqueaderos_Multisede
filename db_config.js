// use campusParking;

// Colección: usuarios
db.createCollection("usuarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["cedula", "nombre", "telefono"],
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
                            pattern: "[A-Z]\\w{2,}(\\s[A-Z]\\w{2,})?",
                            description: "El nombre debe comenzar con mayúscula y tener al menos 3 caracteres"
                        },
                        apellido: {
                            bsonType: "string",
                            pattern: "^[A-Z]\\w{2,}",
                            description: "El apellido debe comenzar con mayúscula y tener al menos 3 caracteres"
                        }
                    }
                },
                rol: { 
                    enum: ["administrador", "empleado", "cliente"] 
                },
                telefono: {
                    bsonType: "int", 
                    minLength: 10,
                    description: "El telefono debe tener minimo 10 numeros"
                }
            }
        }
    }
});
db.usuarios.createIndex({ cedula: 1 }, { unique: true });


// Colección: vehiculos
db.createCollection("vehiculos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["placa", "tipo", "usuarios_id"],
            properties: {
                placa: { 
                    bsonType: "string", 
                    minLength: 6, 
                    pattern: "^[A-Z]{3}[0-9]{3}$", 
                    description: "El formato de la placa es AAA123"
                },
                tipo: { 
                    enum: ["carro", "moto", "bicicleta", "camion"] 
                },
                usuarios_id: { 
                    bsonType: "objectId", 
                    description: "Id del cliente dueño" 
                }
            }
        }
    }
});
db.vehiculos.createIndex({ placa: 1 }, { unique: true });

// Colección: sedes
db.createCollection("sedes", {
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
                            bsonType: "int" 
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
db.sedes.createIndex({ nombre: 1 }, { unique: true });

// Colección: zonas
db.createCollection("zonas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["sede_id", "nombre", "capacidad", "cupos_disponibles", "tipos_permitidos", "tarifa_hora"],
            properties: {
                sede_id: { 
                    bsonType: "objectId", 
                    description: "Identificador unico de la sede"
                },
                nombre: { 
                    bsonType: "string" 
                },
                capacidad: { 
                    bsonType: "int" 
                },
                cupos_disponibles: { 
                    bsonType: "int" 
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
db.zonas.createIndex({ sede_id: 1, nombre: 1 }, { unique: true });

// Colección: parqueos
db.createCollection("parqueos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["vehiculo_id", "sede_id", "zona_id", "hora_entrada"],
            properties: {
                vehiculo_id: { 
                    bsonType: "objectId",
                    description: "Identificador único vehiculo" 
                },
                sede_id: { 
                    bsonType: "objectId"
                    , description: "Identificador único sede" 
                },
                zona_id: { 
                    bsonType: "objectId", 
                    description: "Identificador sede" 
                },
                hora_entrada: { 
                    bsonType: "date", 
                    description: "Fecha de entrada del vehiculo" 
                },
                hora_salida: { 
                    bsonType: ["date", "null"] 
                },
                tiempo_total: { 
                    bsonType: ["double", "null"] 
                },
                costo: { 
                    bsonType: ["int", "null"] 
                }
            }
        }
    }
});
db.parqueos.createIndex({ sede_id: 1, zona_id: 1 });
