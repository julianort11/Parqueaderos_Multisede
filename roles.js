db.createUser(
    {
       user:"Adriana Morales",
       pwd: "adrianita123*",
       roles: [
        {role: "readWrite", db:"parking"},
        {role: "dbAdmin", db:"parking"},
        {role: "dbOwner", db:"parking"}
       ]
    }
)

db.createRole(
    {
        role: "empleado",
        privileges:[
            {
                resource: {db: "parking", collection: "usuarios" },
                actions: ["find", "insert", "update"]
            },
            {
                resource: {db: "parking", collection: "vehiculos" },
                actions: ["find"]
            },
            {
                resource: {db: "parking", collection: "parqueos" },
                actions: ["find", "insert", "update"]
            },
            {
                resource: {db: "parking", collection: "zonas" },
                actions: ["find"]
            },
            {
                resource: {db: "parking", collection: "sedes" },
                actions: ["find"]
            },
        ],
        roles: []
    }
)

db.createRole(
    {
        role: "cliente",
        privileges:[
            {
                resource: {db: "parking", collection: "usuarios" },
                actions: ["find"]
            },
            {
                resource: {db: "parking", collection: "parqueos" },
                actions: ["find"]
            },
            {
                resource: {db: "parking", collection: "zonas" },
                actions: ["find"]
            }
        ],
        roles: []
    }
)

db.createUser({
    user:"empleado1",
    pwd: "empleado123*",
    roles:  [
        { role: "empleado", db: "parking" }
    ]
})

db.createUser({
    user:"cliente",
    pwd: "cliente123*",
    roles:  [
        { role: "cliente", db: "parking" }
    ]
})