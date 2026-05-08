<?php
/**
 * Plantilla de configuración SMTP para el endpoint contacto.php
 *
 * INSTRUCCIONES:
 * 1. Copiar este archivo como `config.php` en la misma carpeta.
 * 2. Reemplazar SMTP_PASSWORD con la contraseña real.
 * 3. NUNCA subir `config.php` al repositorio (debe estar en .gitignore).
 * 4. Subir `config.php` manualmente al servidor vía FileZilla.
 *
 * El archivo `config.example.php` SÍ se sube al repo como referencia.
 */

return [
    'smtp_host'       => 'c1631492.ferozo.com',
    'smtp_port'       => 465,
    'smtp_secure'     => 'ssl',
    'smtp_username'   => 'info@refugiodelvalletandil.com.ar',
    'smtp_password'   => 'REEMPLAZAR_CON_PASSWORD_REAL',
    'mail_from'       => 'info@refugiodelvalletandil.com.ar',
    'mail_from_name'  => 'Refugio del Valle - Web',
    'mail_to'         => 'info@refugiodelvalletandil.com.ar',
    'mail_subject'    => 'Nueva consulta desde refugiodelvalletandil.com.ar',
];
