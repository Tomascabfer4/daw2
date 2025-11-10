DROP DATABASE IF EXISTS productos;

CREATE DATABASE productos;
USE productos;


CREATE TABLE productos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion VARCHAR(200),
    precio DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE productos ADD COLUMN imagen VARCHAR(200) AFTER descripcion;

INSERT INTO productos (nombre, descripcion, precio) 
VALUES 
  ('Monitor 17 pulgadas', 'Monitor plano LCD', 110.22),
  ('Teclado', 'Teclado USB en español', 20.12),
  ('Impresora', 'Impresora láser a color', 360.05);

CREATE TABLE clientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    apellido1 VARCHAR(200),
    apellido2 VARCHAR(200),
    dni VARCHAR(9),
    telefono VARCHAR(15),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);  

INSERT INTO clientes (nombre, apellido1, apellido2, dni, telefono) 
VALUES
  ('Ana', 'García', 'López', '12345678A', 600111222),
  ('Javier', 'Rodríguez', 'Martínez', '98765432B', 677333444),
  ('María', 'Sánchez', 'Pérez', '01010101C', 688555666);