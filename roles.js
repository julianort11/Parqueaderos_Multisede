// Crear usuario administrador con privilegios completos sobre la base de datos parking
db.createUser(
    {
       user: "Adriana Morales",
       pwd: "adrianita123*",
       roles: [
        { role: "readWrite", db: "parking" },  // Puede leer y escribir en todas las colecciones
        { role: "dbAdmin", db: "parking" },    // Permite administrar índices, validaciones y estadísticas
        { role: "dbOwner", db: "parking" }     // Control total sobre la base de datos
       ]
    }
);

// Crear rol personalizado: empleado
// Permite acceso controlado para registrar parqueos y consultar datos relacionados de clientes, vehículos, zonas y sedes
db.createRole(
    {
        role: "empleado",
        privileges: [
            {
                resource: { db: "parking", collection: "usuarios" },
                actions: ["find", "insert", "update"] // Puede consultar, crear y actualizar usuarios (empleados pueden registrar nuevos clientes)
            },
            {
                resource: { db: "parking", collection: "vehiculos" },
                actions: ["find"] // Solo lectura para ver los vehículos registrados
            },
            {
                resource: { db: "parking", collection: "parqueos" },
                actions: ["find", "insert", "update"] // Permite registrar ingresos/salidas de parqueos
            },
            {
                resource: { db: "parking", collection: "zonas" },
                actions: ["find"] // Consulta de información sobre zonas disponibles
            },
            {
                resource: { db: "parking", collection: "sedes" },
                actions: ["find"] // Consulta de información general sobre sedes
            },
        ],
        roles: [] // No hereda de ningún otro rol
    }
);

// Crear rol personalizado: cliente
// Acceso restringido solo a su propia información, su historial de parqueos y disponibilidad general de zonas
db.createRole(
    {
        role: "cliente",
        privileges: [
            {
                resource: { db: "parking", collection: "usuarios" },
                actions: ["find"] // Puede leer su propia información
            },
            {
                resource: { db: "parking", collection: "parqueos" },
                actions: ["find"] // Ver su historial de parqueos
            },
            {
                resource: { db: "parking", collection: "zonas" },
                actions: ["find"] // Consultar zonas disponibles y tarifas
            }
        ],
        roles: []
    }
);

// Crear usuario con rol de empleado
db.createUser({
    user: "empleado1",
    pwd: "empleado123*",
    roles: [
        { role: "empleado", db: "parking" } // Asigna el rol personalizado empleado
    ]
});

// Crear usuario con rol de cliente
db.createUser({
    user: "cliente",
    pwd: "cliente123*",
    roles: [
        { role: "cliente", db: "parking" } // Asigna el rol personalizado cliente
    ]
});
