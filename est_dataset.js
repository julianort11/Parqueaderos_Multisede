//Sedes
let idSedes = db.sedes.insertMany([
    {
      nombre: "Sede Centro Bogotá",
      ciudad: "Bogotá",
      direccion: { calle: "Calle 10", numero: 5, barrio: "Centro" }
    },
    {
      nombre: "Sede Norte Medellin",
      ciudad: "Medellín",
      direccion: { calle: "Carrera 45", numero: 100, barrio: "El Poblado" }
    },
    {
      nombre: "Sede Sur Cali",
      ciudad: "Cali",
      direccion: { calle: "Avenida 30", numero: 25, barrio: "San Fernando" }
    }
]);

let idSedeBogota = idSedes.insertedIds [0] 
let idSedeMedellin = idSedes.insertedIds [1] 
let idSedeCali = idSedes.insertedIds [2] 

//Zonas     
let ZonasBogota = db.zonas.insertMany([
    // Bogotá - 5 zonas    
    { sede_id: idSedeBogota , nombre: "Zona A", capacidad: 20, cupos_disponibles: 20, tipos_permitidos: ["carro", "moto"], tarifa_hora: 3000 },
    { sede_id: idSedeBogota, nombre: "Zona B", capacidad: 15, cupos_disponibles: 15, tipos_permitidos: ["carro"], tarifa_hora: 3500 },
    { sede_id: idSedeBogota, nombre: "Zona C", capacidad: 10, cupos_disponibles: 10, tipos_permitidos: ["bicicleta"], tarifa_hora: 1000 },
    { sede_id: idSedeBogota, nombre: "Zona D", capacidad: 5, cupos_disponibles: 5, tipos_permitidos: ["camion"], tarifa_hora: 8000 },
    { sede_id: idSedeBogota, nombre: "Zona E", capacidad: 8, cupos_disponibles: 8, tipos_permitidos: ["moto"], tarifa_hora: 2000 },
]);
let idZonasBogotaA = ZonasBogota.insertedIds [0]; 
let idZonasBogotaB = ZonasBogota.insertedIds [1]; 
let idZonasBogotaC = ZonasBogota.insertedIds [2]; 
let idZonasBogotaD = ZonasBogota.insertedIds [3]; 
let idZonasBogotaE = ZonasBogota.insertedIds [4]; 

let idZonasMedellin = db.zonas.insertMany([
     // Medellín - 5 zonas
    { sede_id: idSedeMedellin, nombre: "Zona A", capacidad: 25, cupos_disponibles: 25, tipos_permitidos: ["carro", "moto"], tarifa_hora: 3200 },
    { sede_id: idSedeMedellin, nombre: "Zona B", capacidad: 12, cupos_disponibles: 12, tipos_permitidos: ["bicicleta"], tarifa_hora: 1200 },
    { sede_id: idSedeMedellin, nombre: "Zona C", capacidad: 10, cupos_disponibles: 10, tipos_permitidos: ["carro"], tarifa_hora: 3500 },
    { sede_id: idSedeMedellin, nombre: "Zona D", capacidad: 7, cupos_disponibles: 7, tipos_permitidos: ["camion"], tarifa_hora: 8500 },
    { sede_id: idSedeMedellin, nombre: "Zona E", capacidad: 15, cupos_disponibles: 15, tipos_permitidos: ["moto"], tarifa_hora: 2100 },
]);
let idZonasMedellinA = idZonasMedellin.insertedIds [0]; 
let idZonasMedellinB = idZonasMedellin.insertedIds [1]; 
let idZonasMedellinC = idZonasMedellin.insertedIds [2]; 
let idZonasMedellinD = idZonasMedellin.insertedIds [3]; 
let idZonasMedellinE = idZonasMedellin.insertedIds [4]; 

let idZonasCali = db.zonas.insertMany([
    // Cali - 5 zonas
    { sede_id: idSedeCali, nombre: "Zona A", capacidad: 18, cupos_disponibles: 18, tipos_permitidos: ["carro"], tarifa_hora: 3400 },
    { sede_id: idSedeCali, nombre: "Zona B", capacidad: 20, cupos_disponibles: 20, tipos_permitidos: ["moto"], tarifa_hora: 1900 },
    { sede_id: idSedeCali, nombre: "Zona C", capacidad: 8, cupos_disponibles: 8, tipos_permitidos: ["bicicleta"], tarifa_hora: 1100 },
    { sede_id: idSedeCali, nombre: "Zona D", capacidad: 6, cupos_disponibles: 6, tipos_permitidos: ["camion"], tarifa_hora: 8200 },
    { sede_id: idSedeCali, nombre: "Zona E", capacidad: 10, cupos_disponibles: 10, tipos_permitidos: ["carro", "moto"], tarifa_hora: 3000 }
]);
let idZonasCaliA = idZonasCali.insertedIds [0]; 
let idZonasCaliB = idZonasCali.insertedIds [1]; 
let idZonasCaliC = idZonasCali.insertedIds [2]; 
let idZonasCaliD = idZonasCali.insertedIds [3]; 
let idZonasCaliE = idZonasCali.insertedIds [4]; 


//usuarios
let empleadosBogota = db.usuarios.insertMany([
    // Empleados en Bogotá
    { cedula: "700000001", nombreCompleto: { nombre: "Juan", apellido: "Perez" }, rol: "empleado", telefono: "3001111111", sede_id: idSedeBogota },
    { cedula: "700000002", nombreCompleto: { nombre: "Maria", apellido: "Gomez" }, rol: "empleado", telefono: "3002222222", sede_id: idSedeBogota },
    { cedula: "700000003", nombreCompleto: { nombre: "Luis", apellido: "Martinez" }, rol: "empleado", telefono: "3003333333", sede_id: idSedeBogota }
]);
let idEmpleadosBogota1 = empleadosBogota.insertedIds [0]; 
let idEmpleadosBogota2 = empleadosBogota.insertedIds [1]; 
let idEmpleadosBogota3 = empleadosBogota.insertedIds [2]; 

let empleadosMedellin = db.usuarios.insertMany([
    // Empleados en Medellín
    { cedula: "700000004", nombreCompleto: { nombre: "Carlos", apellido: "Ruiz" }, rol: "empleado", telefono: "3004444444", sede_id: idSedeMedellin },
    { cedula: "700000005", nombreCompleto: { nombre: "Laura", apellido: "Vargas" }, rol: "empleado", telefono: "3005555555", sede_id: idSedeMedellin },
    { cedula: "700000006", nombreCompleto: { nombre: "Pedro", apellido: "Sanchez" }, rol: "empleado", telefono: "3006666666", sede_id: idSedeMedellin },
]);
let idEmpleadosMedellin1 = empleadosMedellin.insertedIds [3]; 
let idEmpleadosMedellin2 = empleadosMedellin.insertedIds [4]; 
let idEmpleadosMedellin3 = empleadosMedellin.insertedIds [5]; 

let empleadosCali = db.usuarios.insertMany([
    // Empleados en Cali
    { cedula: "700000007", nombreCompleto: { nombre: "Sofia", apellido: "Torres" }, rol: "empleado", telefono: "3007777777", sede_id: idSedeCali },
    { cedula: "700000008", nombreCompleto: { nombre: "Diego", apellido: "Ramirez" }, rol: "empleado", telefono: "3008888888", sede_id: idSedeCali },
    { cedula: "700000009", nombreCompleto: { nombre: "Valentina", apellido: "Castro" }, rol: "empleado", telefono: "3009999999", sede_id: idSedeCali },
]);
let idEmpleadosCali1 = empleadosCali.insertedIds [10]; 
let idEmpleadosCali2 = empleadosCali.insertedIds [11]; 
let idEmpleadosCali3 = empleadosCali.insertedIds [12]; 

let admin = db.usuarios.insertOne(
    // Empleado administrativo global sin sede asignada
    { cedula: "700000010", nombreCompleto: { nombre: "Adriana", apellido: "Morales" }, rol: "administrador", telefono: "3010000000", sede_id: null }
  );

let clientes = db.usuarios.insertMany([
  { cedula: "800000001", nombreCompleto: { nombre: "Luis", apellido: "Diaz" }, rol: "cliente", telefono: "3111111111", sede_id: null },
  { cedula: "800000002", nombreCompleto: { nombre: "Diana", apellido: "Gutierrez" }, rol: "cliente", telefono: "3112222222", sede_id: null },
  { cedula: "800000003", nombreCompleto: { nombre: "Oscar", apellido: "Mendoza" }, rol: "cliente", telefono: "3113333333", sede_id: null },
  { cedula: "800000004", nombreCompleto: { nombre: "Carolina", apellido: "Salazar" }, rol: "cliente", telefono: "3114444444", sede_id: null },
  { cedula: "800000005", nombreCompleto: { nombre: "Jorge", apellido: "Mejia" }, rol: "cliente", telefono: "3115555555", sede_id: null },
  { cedula: "800000006", nombreCompleto: { nombre: "Martha", apellido: "Reyes" }, rol: "cliente", telefono: "3116666666", sede_id: null },
  { cedula: "800000007", nombreCompleto: { nombre: "Ricardo", apellido: "Suarez" }, rol: "cliente", telefono: "3117777777", sede_id: null },
  { cedula: "800000008", nombreCompleto: { nombre: "Patricia", apellido: "Moreno" }, rol: "cliente", telefono: "3118888888", sede_id: null },
  { cedula: "800000009", nombreCompleto: { nombre: "Andres", apellido: "Cortes" }, rol: "cliente", telefono: "3119999999", sede_id: null },
  { cedula: "800000010", nombreCompleto: { nombre: "Gloria", apellido: "Herrera" }, rol: "cliente", telefono: "3120000000", sede_id: null },
  { cedula: "800000011", nombreCompleto: { nombre: "Sebastian", apellido: "Quintero" }, rol: "cliente", telefono: "3121111111", sede_id: null },
  { cedula: "800000012", nombreCompleto: { nombre: "Natalia", apellido: "Rojas" }, rol: "cliente", telefono: "3122222222", sede_id: null },
  { cedula: "800000013", nombreCompleto: { nombre: "Felipe", apellido: "Ortega" }, rol: "cliente", telefono: "3123333333", sede_id: null },
  { cedula: "800000014", nombreCompleto: { nombre: "Camila", apellido: "Pineda" }, rol: "cliente", telefono: "3124444444", sede_id: null },
  { cedula: "800000015", nombreCompleto: { nombre: "Javier", apellido: "Alvarez" }, rol: "cliente", telefono: "3125555555", sede_id: null }
]);
let idclientes1 = clientes.insertedIds [0]; 
let idclientes2 = clientes.insertedIds [1]; 
let idclientes3 = clientes.insertedIds [2]; 
let idclientes4 = clientes.insertedIds [3]; 
let idclientes5 = clientes.insertedIds [4]; 
let idclientes6 = clientes.insertedIds [5]; 
let idclientes7 = clientes.insertedIds [6]; 
let idclientes8 = clientes.insertedIds [7]; 
let idclientes9 = clientes.insertedIds [8]; 
let idclientes10 = clientes.insertedIds [9]; 
let idclientes11 = clientes.insertedIds [10]; 
let idclientes12 = clientes.insertedIds [11]; 
let idclientes13 = clientes.insertedIds [12]; 
let idclientes14 = clientes.insertedIds [12]; 
let idclientes15 = clientes.insertedIds [13]; 

//vehiculos 
let idvehiculos = db.vehiculos.insertMany([
{ placa: "ABC123", tipo: "carro", usuarios_id: idclientes1 , sede_id: idSedeBogota },
{ placa: "DEF456", tipo: "carro", usuarios_id: idclientes2 , sede_id: idSedeBogota },
{ placa: "GHI789", tipo: "carro", usuarios_id: idclientes3 , sede_id: idSedeBogota },
{ placa: "JKL012", tipo: "carro", usuarios_id: idclientes4 , sede_id: idSedeMedellin },
{ placa: "MNO345", tipo: "carro", usuarios_id: idclientes5 , sede_id: idSedeMedellin },
{ placa: "PQR678", tipo: "carro", usuarios_id: idclientes6 , sede_id: idSedeMedellin },
{ placa: "STU901", tipo: "carro", usuarios_id: idclientes7 , sede_id: idSedeCali },
{ placa: "VWX234", tipo: "carro", usuarios_id: idclientes8 , sede_id: idSedeCali },
{ placa: "AAA111", tipo: "moto", usuarios_id: idclientes9 , sede_id: idSedeBogota },
{ placa: "BBB222", tipo: "moto", usuarios_id: idclientes10 , sede_id: idSedeBogota },
{ placa: "CCC333", tipo: "moto", usuarios_id: idclientes11 , sede_id: idSedeMedellin },
{ placa: "DDD444", tipo: "moto", usuarios_id: idclientes12 , sede_id: idSedeMedellin },
{ placa: "EEE555", tipo: "moto", usuarios_id: idclientes13 , sede_id: idSedeMedellin },
{ placa: "FFF666", tipo: "moto", usuarios_id: idclientes14 , sede_id: idSedeCali },
{ placa: "GGG777", tipo: "moto", usuarios_id: idclientes15 , sede_id: idSedeCali },
{ placa: "BIK001", tipo: "bicicleta", usuarios_id: idclientes1 , sede_id: idSedeBogota },
{ placa: "BIK002", tipo: "bicicleta", usuarios_id: idclientes2 , sede_id: idSedeBogota },
{ placa: "BIK003", tipo: "bicicleta", usuarios_id: idclientes3 , sede_id: idSedeBogota },
{ placa: "BIK004", tipo: "bicicleta", usuarios_id: idclientes4 , sede_id: idSedeMedellin },
{ placa: "BIK005", tipo: "bicicleta", usuarios_id: idclientes5 , sede_id: idSedeMedellin },
{ placa: "BIK006", tipo: "bicicleta", usuarios_id: idclientes6 , sede_id: idSedeCali },
{ placa: "BIK007", tipo: "bicicleta", usuarios_id: idclientes7 , sede_id: idSedeCali },
{ placa: "TRK001", tipo: "camion", usuarios_id: idclientes8 , sede_id: idSedeBogota },
{ placa: "TRK002", tipo: "camion", usuarios_id: idclientes9 , sede_id: idSedeBogota },
{ placa: "TRK003", tipo: "camion", usuarios_id: idclientes10 , sede_id: idSedeBogota },
{ placa: "TRK004", tipo: "camion", usuarios_id: idclientes11 , sede_id: idSedeMedellin },
{ placa: "TRK005", tipo: "camion", usuarios_id: idclientes12 , sede_id: idSedeMedellin },
{ placa: "TRK006", tipo: "camion", usuarios_id: idclientes13 , sede_id: idSedeMedellin },
{ placa: "TRK007", tipo: "camion", usuarios_id: idclientes14 , sede_id: idSedeCali },
{ placa: "TRK008", tipo: "camion", usuarios_id: idclientes15 , sede_id: idSedeCali },
]);
let idVehiculos1 = idvehiculos.insertedIds [0]; 
let idVehiculos2 = idvehiculos.insertedIds [1]; 
let idVehiculos3 = idvehiculos.insertedIds [2]; 
let idVehiculos4 = idvehiculos.insertedIds [3]; 
let idVehiculos5 = idvehiculos.insertedIds [4]; 
let idVehiculos6 = idvehiculos.insertedIds [5]; 
let idVehiculos7 = idvehiculos.insertedIds [6]; 
let idVehiculos8 = idvehiculos.insertedIds [7]; 
let idVehiculos9 = idvehiculos.insertedIds [8]; 
let idVehiculos10 = idvehiculos.insertedIds [9]; 
let idVehiculos11 = idvehiculos.insertedIds [10]; 
let idVehiculos12 = idvehiculos.insertedIds [11]; 
let idVehiculos13 = idvehiculos.insertedIds [12]; 
let idVehiculos14 = idvehiculos.insertedIds [13]; 
let idVehiculos15 = idvehiculos.insertedIds [14]; 
let idVehiculos16 = idvehiculos.insertedIds [15]; 
let idVehiculos17 = idvehiculos.insertedIds [16]; 
let idVehiculos18 = idvehiculos.insertedIds [17]; 
let idVehiculos19 = idvehiculos.insertedIds [18]; 
let idVehiculos20 = idvehiculos.insertedIds [19]; 
let idVehiculos21 = idvehiculos.insertedIds [20]; 
let idVehiculos22 = idvehiculos.insertedIds [21]; 
let idVehiculos23 = idvehiculos.insertedIds [22]; 
let idVehiculos24 = idvehiculos.insertedIds [23]; 
let idVehiculos25 = idvehiculos.insertedIds [24]; 
let idVehiculos26 = idvehiculos.insertedIds [25]; 
let idVehiculos27 = idvehiculos.insertedIds [26]; 
let idVehiculos28 = idvehiculos.insertedIds [27]; 
let idVehiculos29 = idvehiculos.insertedIds [28]; 
let idVehiculos30 = idvehiculos.insertedIds [29]; 

//parqueos

let parqueos = db.parqueos.insertMany([
  {
    vehiculo_id: idVehiculos1,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaA,
    hora_entrada: {"$date":"2025-06-20T08:15:00Z"},
    hora_salida: {"$date":"2025-06-20T10:45:00Z"},
    tiempo_total: 2.5,
    costo: 8000
  },
  {
    vehiculo_id: idVehiculos2,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinB,
    hora_entrada: {"$date":"2025-06-22T14:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos3,
    sede_id: idSedeCali,
    zona_id: idZonasCaliC,
    hora_entrada: {"$date":"2025-06-19T09:00:00Z"},
    hora_salida: {"$date":"2025-06-19T11:30:00Z"},
    tiempo_total: 2.5,
    costo: 7000
  },
  {
    vehiculo_id: idVehiculos4,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaE,
    hora_entrada: {"$date":"2025-06-25T07:45:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos5,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinD,
    hora_entrada: {"$date":"2025-06-18T12:30:00Z"},
    hora_salida: {"$date":"2025-06-18T15:30:00Z"},
    tiempo_total: 3,
    costo: 9500
  },
  {
    vehiculo_id: idVehiculos6,
    sede_id: idSedeCali,
    zona_id: idZonasCaliA,
    hora_entrada: {"$date":"2025-06-24T16:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos7,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaC,
    hora_entrada: {"$date":"2025-06-21T10:20:00Z"},
    hora_salida: {"$date":"2025-06-21T12:00:00Z"},
    tiempo_total: 1.67,
    costo: 5000
  },
  {
    vehiculo_id: idVehiculos8,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinE,
    hora_entrada: {"$date":"2025-06-23T09:15:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos9,
    sede_id: idSedeCali,
    zona_id: idZonasCaliD,
    hora_entrada: {"$date":"2025-06-26T11:00:00Z"},
    hora_salida: {"$date":"2025-06-26T13:15:00Z"},
    tiempo_total: 2.25,
    costo: 8500
  },
  {
    vehiculo_id: idVehiculos10,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaB,
    hora_entrada: {"$date":"2025-06-17T13:00:00Z"},
    hora_salida: {"$date":"2025-06-17T15:00:00Z"},
    tiempo_total: 2,
    costo: 7000
  },
  {
    vehiculo_id: idVehiculos11,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinC,
    hora_entrada: {"$date":"2025-06-19T09:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos12,
    sede_id: idSedeCali,
    zona_id: idZonasCaliB,
    hora_entrada: {"$date":"2025-06-24T07:00:00Z"},
    hora_salida: {"$date":"2025-06-24T10:00:00Z"},
    tiempo_total: 3,
    costo: 9200
  },
  {
    vehiculo_id: idVehiculos13,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaD,
    hora_entrada: {"$date":"2025-06-22T15:15:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos14,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinA,
    hora_entrada: {"$date":"2025-06-20T09:45:00Z"},
    hora_salida: {"$date":"2025-06-20T12:30:00Z"},
    tiempo_total: 2.75,
    costo: 8100
  },
  {
    vehiculo_id: idVehiculos15,
    sede_id: idSedeCali,
    zona_id: idZonasCaliE,
    hora_entrada: {"$date":"2025-06-25T08:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos16,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaA,
    hora_entrada: {"$date":"2025-06-19T12:30:00Z"},
    hora_salida: {"$date":"2025-06-19T15:00:00Z"},
    tiempo_total: 2.5,
    costo: 7600
  },
  {
    vehiculo_id: idVehiculos17,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinD,
    hora_entrada: {"$date":"2025-06-23T10:15:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos18,
    sede_id: idSedeCali,
    zona_id: idZonasCaliC,
    hora_entrada: {"$date":"2025-06-18T09:00:00Z"},
    hora_salida: {"$date":"2025-06-18T11:00:00Z"},
    tiempo_total: 2,
    costo: 6800
  },
  {
    vehiculo_id: idVehiculos19,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaE,
    hora_entrada: {"$date":"2025-06-21T08:45:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos20,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinB,
    hora_entrada: {"$date":"2025-06-17T07:30:00Z"},
    hora_salida: {"$date":"2025-06-17T10:30:00Z"},
    tiempo_total: 3,
    costo: 9000
  },
  {
    vehiculo_id: idVehiculos21,
    sede_id: idSedeCali,
    zona_id: idZonasCaliA,
    hora_entrada: {"$date":"2025-06-20T11:30:00Z"},
    hora_salida: {"$date":"2025-06-20T14:00:00Z"},
    tiempo_total: 2.5,
    costo: 8200
  },
  {
    vehiculo_id: idVehiculos22,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaC,
    hora_entrada: {"$date":"2025-06-22T13:15:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos23,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinE,
    hora_entrada: {"$date":"2025-06-25T09:45:00Z"},
    hora_salida: {"$date":"2025-06-25T11:30:00Z"},
    tiempo_total: 1.75,
    costo: 5900
  },
  {
    vehiculo_id: idVehiculos24,
    sede_id: idSedeCali,
    zona_id: idZonasCaliD,
    hora_entrada: {"$date":"2025-06-24T10:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos25,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaB,
    hora_entrada: {"$date":"2025-06-19T08:30:00Z"},
    hora_salida: {"$date":"2025-06-19T11:30:00Z"},
    tiempo_total: 3,
    costo: 9100
  },
  {
    vehiculo_id: idVehiculos26,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinA,
    hora_entrada: {"$date":"2025-06-18T15:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos27,
    sede_id: idSedeCali,
    zona_id: idZonasCaliE,
    hora_entrada: {"$date":"2025-06-21T07:45:00Z"},
    hora_salida: {"$date":"2025-06-21T09:45:00Z"},
    tiempo_total: 2,
    costo: 7000
  },
  {
    vehiculo_id: idVehiculos28,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaD,
    hora_entrada: {"$date":"2025-06-23T12:15:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos29,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinC,
    hora_entrada: {"$date":"2025-06-26T08:00:00Z"},
    hora_salida: {"$date":"2025-06-26T10:00:00Z"},
    tiempo_total: 2,
    costo: 7500
  },
  {
    vehiculo_id: idVehiculos30,
    sede_id: idSedeCali,
    zona_id: idZonasCaliB,
    hora_entrada: {"$date":"2025-06-17T14:30:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos1,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaA,
    hora_entrada: {"$date":"2025-06-18T09:00:00Z"},
    hora_salida: {"$date":"2025-06-18T11:30:00Z"},
    tiempo_total: 2.5,
    costo: 8000
  },
  {
    vehiculo_id: idVehiculos2,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinD,
    hora_entrada: {"$date":"2025-06-22T13:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos3,
    sede_id: idSedeCali,
    zona_id: idZonasCaliC,
    hora_entrada: {"$date":"2025-06-21T11:00:00Z"},
    hora_salida: {"$date":"2025-06-21T14:00:00Z"},
    tiempo_total: 3,
    costo: 9500
  },
  {
    vehiculo_id: idVehiculos4,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaE,
    hora_entrada: {"$date":"2025-06-25T10:45:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos5,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinB,
    hora_entrada: {"$date":"2025-06-20T07:30:00Z"},
    hora_salida: {"$date":"2025-06-20T09:30:00Z"},
    tiempo_total: 2,
    costo: 7000
  },
  {
    vehiculo_id: idVehiculos6,
    sede_id: idSedeCali,
    zona_id: idZonasCaliA,
    hora_entrada: {"$date":"2025-06-19T12:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos7,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaB,
    hora_entrada: {"$date":"2025-06-23T09:30:00Z"},
    hora_salida: {"$date":"2025-06-23T11:30:00Z"},
    tiempo_total: 2,
    costo: 7500
  },
  {
    vehiculo_id: idVehiculos8,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinE,
    hora_entrada: {"$date":"2025-06-18T08:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos9,
    sede_id: idSedeCali,
    zona_id: idZonasCaliD,
    hora_entrada: {"$date":"2025-06-26T14:00:00Z"},
    hora_salida: {"$date":"2025-06-26T16:00:00Z"},
    tiempo_total: 2,
    costo: 8000
  },
  {
    vehiculo_id: idVehiculos10,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaC,
    hora_entrada: {"$date":"2025-06-17T10:15:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos11,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinA,
    hora_entrada: {"$date":"2025-06-21T07:30:00Z"},
    hora_salida: {"$date":"2025-06-21T09:30:00Z"},
    tiempo_total: 2,
    costo: 7200
  },
  {
    vehiculo_id: idVehiculos12,
    sede_id: idSedeCali,
    zona_id: idZonasCaliE,
    hora_entrada: {"$date":"2025-06-22T15:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos13,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaD,
    hora_entrada: {"$date":"2025-06-20T14:30:00Z"},
    hora_salida: {"$date":"2025-06-20T16:30:00Z"},
    tiempo_total: 2,
    costo: 7800
  },
  {
    vehiculo_id: idVehiculos14,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinC,
    hora_entrada: {"$date":"2025-06-19T11:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos15,
    sede_id: idSedeCali,
    zona_id: idZonasCaliB,
    hora_entrada: {"$date":"2025-06-18T08:45:00Z"},
    hora_salida: {"$date":"2025-06-18T11:00:00Z"},
    tiempo_total: 2.25,
    costo: 7800
  },
  {
    vehiculo_id: idVehiculos16,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaA,
    hora_entrada: {"$date":"2025-06-25T13:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos17,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinD,
    hora_entrada: {"$date":"2025-06-22T09:00:00Z"},
    hora_salida: {"$date":"2025-06-22T11:30:00Z"},
    tiempo_total: 2.5,
    costo: 8200
  },
  {
    vehiculo_id: idVehiculos18,
    sede_id: idSedeCali,
    zona_id: idZonasCaliC,
    hora_entrada: {"$date":"2025-06-19T10:30:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  },
  {
    vehiculo_id: idVehiculos19,
    sede_id: idSedeBogota,
    zona_id: idZonasBogotaE,
    hora_entrada: {"$date":"2025-06-21T16:00:00Z"},
    hora_salida: {"$date":"2025-06-21T18:30:00Z"},
    tiempo_total: 2.5,
    costo: 8500
  },
  {
    vehiculo_id: idVehiculos20,
    sede_id: idSedeMedellin,
    zona_id: idZonasMedellinB,
    hora_entrada: {"$date":"2025-06-24T14:00:00Z"},
    hora_salida: null,
    tiempo_total: null,
    costo: null
  }
])



let idParqueo1 = parqueos.insertedIds[0];
let idParqueo2 = parqueos.insertedIds[1];
let idParqueo3 = parqueos.insertedIds[2];
let idParqueo4 = parqueos.insertedIds[3];
let idParqueo5 = parqueos.insertedIds[4];
let idParqueo6 = parqueos.insertedIds[5];
let idParqueo7 = parqueos.insertedIds[6];
let idParqueo8 = parqueos.insertedIds[7];
let idParqueo9 = parqueos.insertedIds[8];
let idParqueo10 = parqueos.insertedIds[9];
let idParqueo11 = parqueos.insertedIds[10];
let idParqueo12 = parqueos.insertedIds[11];
let idParqueo13 = parqueos.insertedIds[12];
let idParqueo14 = parqueos.insertedIds[13];
let idParqueo15 = parqueos.insertedIds[14];
let idParqueo16 = parqueos.insertedIds[15];
let idParqueo17 = parqueos.insertedIds[16];
let idParqueo18 = parqueos.insertedIds[17];
let idParqueo19 = parqueos.insertedIds[18];
let idParqueo20 = parqueos.insertedIds[19];
let idParqueo21 = parqueos.insertedIds[20];
let idParqueo22 = parqueos.insertedIds[21];
let idParqueo23 = parqueos.insertedIds[22];
let idParqueo24 = parqueos.insertedIds[23];
let idParqueo25 = parqueos.insertedIds[24];
let idParqueo26 = parqueos.insertedIds[25];
let idParqueo27 = parqueos.insertedIds[26];
let idParqueo28 = parqueos.insertedIds[27];
let idParqueo29 = parqueos.insertedIds[28];
let idParqueo30 = parqueos.insertedIds[29];
let idParqueo31 = parqueos.insertedIds[30];
let idParqueo32 = parqueos.insertedIds[31];
let idParqueo33 = parqueos.insertedIds[32];
let idParqueo34 = parqueos.insertedIds[33];
let idParqueo35 = parqueos.insertedIds[34];
let idParqueo36 = parqueos.insertedIds[35];
let idParqueo37 = parqueos.insertedIds[36];
let idParqueo38 = parqueos.insertedIds[37];
let idParqueo39 = parqueos.insertedIds[38];
let idParqueo40 = parqueos.insertedIds[39];
let idParqueo41 = parqueos.insertedIds[40];
let idParqueo42 = parqueos.insertedIds[41];
let idParqueo43 = parqueos.insertedIds[42];
let idParqueo44 = parqueos.insertedIds[43];
let idParqueo45 = parqueos.insertedIds[44];
let idParqueo46 = parqueos.insertedIds[45];
let idParqueo47 = parqueos.insertedIds[46];
let idParqueo48 = parqueos.insertedIds[47];
let idParqueo49 = parqueos.insertedIds[48];
let idParqueo50 = parqueos.insertedIds[49];
