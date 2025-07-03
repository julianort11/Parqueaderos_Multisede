# Campus Parking - Sistema de Gestión de Parqueaderos

## Introducción

Campus Parking es una empresa que administra múltiples parqueaderos en diferentes ciudades. Este proyecto implementa una solución centralizada basada en **MongoDB**, eliminando la dependencia de hojas de cálculo locales y garantizando datos unificados, consultas analíticas y control de acceso con roles.

El sistema permite registrar vehículos, gestionar sedes y zonas, controlar ingresos y salidas, calcular tarifas automáticamente, generar reportes, y manejar seguridad basada en roles. Incluye una transacción funcional para garantizar la consistencia al registrar parqueos.

---

## Justificación del uso de MongoDB

MongoDB es ideal para este escenario porque:
- Permite modelar estructuras flexibles con documentos embebidos para zonas dentro de sedes.
- Su capacidad de escalado horizontal soporta crecimiento en número de sedes y zonas.
- Las transacciones multi-documento aseguran consistencia en operaciones críticas como registros de parqueo.
- Su framework de agregación facilita generar reportes complejos de ocupación, ingresos, etc.

---

## Diseño del modelo de datos

Se diseñaron las siguientes colecciones principales:

1. **usuarios**
   - Almacena clientes, empleados y administradores.
   - Campos clave: `cedula`, `nombreCompleto`, `rol`, `telefono`, `sede_id` (en empleados).

2. **vehiculos**
   - Información de vehículos registrados.
   - Campos clave: `placa`, `tipo`, `usuarios_id`, `sede_id`.

3. **sedes**
   - Registra cada sede con `nombre`, `ciudad` y `direccion`.

4. **zonas**
   - Cada sede tiene varias zonas asociadas.
   - Campos clave: `sede_id`, `nombre`, `capacidad`, `cupos_disponibles`, `tipos_permitidos`, `tarifa_hora`.

5. **parqueos**
   - Registro de ingresos y salidas de vehículos.
   - Campos clave: `vehiculo_id`, `sede_id`, `zona_id`, `hora_entrada`, `hora_salida`, `tiempo_total`,`costo`.

---

###  Decisiones de modelado

- **Referencias**: Relacionamos `usuarios`, `vehiculos`, `sedes`, `zonas` y `parqueos` con referencias (`_id`) para mantener consistencia y eficiencia en consultas.
- **Embebidos**: No se usaron documentos embebidos en zonas dentro de sedes para permitir flexibilidad en modificar zonas sin alterar la sede.

---

### Validaciones con $jsonSchema

Cada colección incluye:
- Tipos estrictos (`string`, `int`, `date`, etc.).
- Campos requeridos como `cedula` en usuarios y `placa` en vehículos.
- Regla `enum` para campos como `rol` en usuarios (administrador, empleado, cliente) y `tipo` en vehículos (carro, moto, bicicleta, camión).

**Ejemplo:**
```json
"rol": {
  "bsonType": "string",
  "enum": ["administrador", "empleado", "cliente"],
  "description": "Rol del usuario: administrador, empleado o cliente"
}
```

### Índices

Se crearon los siguientes índices para mejorar rendimiento en consultas:

| Colección | Índice                 | Tipo      | Justificación                                  |
|-----------|------------------------|-----------|-----------------------------------------------|
| usuarios  | cedula                 | Simple    | Consultas rápidas por identificación.         |
| vehiculos | placa                  | Único     | Búsqueda y unicidad de placas.                |
| parqueos  | sede_id + hora_entrada | Compuesto | Consultas por sede y fecha.                   |
| zonas     | sede_id + nombre       | Compuesto | Buscar zonas específicas dentro de una sede.  |

---

### Estructura de los datos de prueba

- **3 sedes** en ciudades distintas.
- **5 zonas por sede**, cada una con cupos, tarifas y tipos de vehículo permitidos.
- **10 empleados** distribuidos en las sedes.
- **15 clientes** registrados con sus datos completos.
- **30 vehículos** de al menos 4 tipos distintos.
- **50 registros de parqueo**, algunos activos (sin hora de salida) y otros finalizados, para pruebas realistas.

Todo esto se encuentra en el archivo [`test_dataset.js`](./test_dataset.js).

---

### aggregations

Las consultas analíticas implementadas en [`aggregations.js`](./aggregations.js) permiten responder preguntas clave como:

- **Parqueos registrados por sede en el último mes**  
  Analiza cuántos registros se hicieron en cada sede recientemente.

- **Zonas más ocupadas por sede**  
  Muestra qué zonas tienen mayor uso acumulado.

- **Ingresos totales por sede**  
  Calcula la suma de los costos generados en cada sede.

- **Cliente más frecuente**  
  Identifica el cliente con más registros de parqueo.

- **Tipo de vehículo más común por sede**  
  Encuentra qué tipo predomina en cada sede.

- **Historial de parqueos de un cliente**  
  Devuelve un listado detallado de sus registros.

- **Vehículos actualmente parqueados por sede**  
  Filtra los parqueos activos.

- **Zonas que excedieron su capacidad**  
  Determina si en algún momento una zona tuvo más parqueos activos que su capacidad.

Cada consulta incluye comentarios explicativos paso a paso.

---

### Transacción MongoDB

Implementada en [`transactions.js`](./transactions.js) para el escenario de registrar un nuevo ingreso:

- Insertar un parqueo en la colección `parqueos`.
- Actualizar `cupos_disponibles` en la colección `zonas`.
- Todo envuelto en una transacción con `session.startTransaction()`, `commitTransaction()` y manejo de errores que hace rollback si ocurre un fallo.

**Flujo de la transacción:**
1. Inicia sesión y transacción.
2. Inserta documento de parqueo.
3. Disminuye cupo de zona.
4. Si ambos pasos tienen éxito, realiza `commitTransaction()`.
5. Si ocurre error, hace `abortTransaction()`.

---

### Roles

Definidos y creados en [`roles.js`](./roles.js):

| Rol          | Permisos principales                                                      |
|--------------|---------------------------------------------------------------------------|
| Administrador| Lectura y escritura total. Crear usuarios y configurar.                   |
| Empleado     | lectura, escritura y actualizar en clientes y parqueos, lectura en vehiculos,zonas y sedes     |
| Cliente      | Lectura de su información, historial de parqueos, y disponibilidad de zonas. |

**Ejemplo de creación de usuario:**
```js
db.createUser({
  user: "empleado1",
  pwd: "123456",
  roles: [{ role: "Empleado", db: "parking" }]
});
```

---

###  Conclusiones y mejoras posibles

- El sistema unifica la información, elimina duplicados y mejora la precisión operativa.
- MongoDB brinda flexibilidad y escalabilidad para manejar nuevas sedes o tipos de vehículos.
- Las transacciones aseguran consistencia en registros críticos como ingresos de parqueos.
- Las agregaciones permiten generar reportes útiles para la toma de decisiones.

**Mejoras posibles:**
- Automatizar limpieza de parqueos inactivos por tiempo.
- Integrar notificaciones para avisar a clientes sobre disponibilidad o vencimiento de tiempo.
