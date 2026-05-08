<?php
/**
 * Endpoint de contacto de Refugio del Valle.
 *
 * Recibe un POST con JSON desde el formulario del sitio,
 * valida los datos, descarta envíos detectados como spam (honeypot),
 * y envía un mail al cliente vía PHPMailer + SMTP de Ferozo.
 *
 * Respuesta siempre en formato JSON: { "ok": boolean, "message": string }
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// ============================================================
// 1. Validación de método HTTP
// ============================================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'message' => 'Método no permitido.',
    ]);
    exit;
}

// ============================================================
// 2. Lectura del body JSON
// ============================================================
$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'Formato de datos inválido.',
    ]);
    exit;
}

// ============================================================
// 3. Honeypot anti-spam
//
// Si el campo `website` viene con cualquier valor, asumimos
// que es un bot y devolvemos 200 OK falso para que no reintente.
// El mail NO se envía.
// ============================================================
if (!empty($data['website'] ?? '')) {
    http_response_code(200);
    echo json_encode([
        'ok' => true,
        'message' => 'Consulta enviada correctamente.',
    ]);
    exit;
}

// ============================================================
// 4. Validaciones de datos
// ============================================================
$nombre = trim((string)($data['nombre'] ?? ''));
$email  = trim((string)($data['email'] ?? ''));

if ($nombre === '' || $email === '') {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'Faltan datos obligatorios (nombre y email).',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'El email ingresado no es válido.',
    ]);
    exit;
}

// Límites de longitud anti-abuso
$LIMITE_CORTO = 500;
$LIMITE_LARGO = 2000;

$campos = [
    'nombre'           => $LIMITE_CORTO,
    'paraQuienes'      => $LIMITE_CORTO,
    'cantidad'         => $LIMITE_CORTO,
    'edades'           => $LIMITE_CORTO,
    'fecha'            => $LIMITE_CORTO,
    'noches'           => $LIMITE_CORTO,
    'email'            => $LIMITE_CORTO,
    'telefono'         => $LIMITE_CORTO,
    'comoNosConociste' => $LIMITE_CORTO,
    'experiencia'      => $LIMITE_LARGO,
];

foreach ($campos as $campo => $limite) {
    $valor = (string)($data[$campo] ?? '');
    if (mb_strlen($valor) > $limite) {
        http_response_code(400);
        echo json_encode([
            'ok' => false,
            'message' => 'Algunos campos exceden el largo máximo permitido.',
        ]);
        exit;
    }
}

// ============================================================
// 5. Carga de PHPMailer y configuración
// ============================================================
$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    error_log('contacto.php: config.php no encontrado en ' . $configPath);
    echo json_encode([
        'ok' => false,
        'message' => 'Error de configuración del servidor.',
    ]);
    exit;
}
$config = require $configPath;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ============================================================
// 6. Composición del mail
// ============================================================
function escapar(string $valor): string {
    return htmlspecialchars($valor, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

$campoToLabel = [
    'nombre'           => 'Nombre',
    'paraQuienes'      => '¿Para quiénes es la estadía?',
    'cantidad'         => 'Cantidad aproximada',
    'edades'           => 'Promedio de edades',
    'fecha'            => 'Fecha pensada',
    'noches'           => 'Cantidad de noches',
    'email'            => 'Email',
    'telefono'         => 'Teléfono',
    'experiencia'      => 'Tipo de experiencia buscada',
    'comoNosConociste' => '¿Cómo nos conoció?',
];

$bodyHtml = '<h2 style="color:#1a3c2a;font-family:Arial,sans-serif">Nueva consulta desde el sitio web</h2>';
$bodyHtml .= '<table style="font-family:Arial,sans-serif;border-collapse:collapse;width:100%;max-width:600px">';

foreach ($campoToLabel as $campo => $label) {
    $valor = trim((string)($data[$campo] ?? ''));
    if ($valor === '') {
        $valor = '<em style="color:#888">(sin completar)</em>';
    } else {
        $valor = nl2br(escapar($valor));
    }
    $bodyHtml .= '<tr>';
    $bodyHtml .= '<td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:200px;vertical-align:top">' . escapar($label) . '</td>';
    $bodyHtml .= '<td style="padding:8px;border-bottom:1px solid #eee">' . $valor . '</td>';
    $bodyHtml .= '</tr>';
}

$bodyHtml .= '</table>';
$bodyHtml .= '<p style="font-family:Arial,sans-serif;color:#666;font-size:12px;margin-top:24px">Este mail se generó automáticamente desde el formulario de contacto de refugiodelvalletandil.com.ar</p>';

// Versión texto plano (fallback para clientes de mail que no muestran HTML)
$bodyPlain = "Nueva consulta desde el sitio web\n\n";
foreach ($campoToLabel as $campo => $label) {
    $valor = trim((string)($data[$campo] ?? ''));
    $bodyPlain .= $label . ': ' . ($valor === '' ? '(sin completar)' : $valor) . "\n";
}

// ============================================================
// 7. Envío del mail vía PHPMailer + SMTP
// ============================================================
$mail = new PHPMailer(true);

try {
    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_username'];
    $mail->Password   = $config['smtp_password'];
    $mail->SMTPSecure = $config['smtp_secure'];
    $mail->Port       = $config['smtp_port'];
    $mail->CharSet    = 'UTF-8';

    // Direcciones
    $mail->setFrom($config['mail_from'], $config['mail_from_name']);
    $mail->addAddress($config['mail_to']);
    // CC opcional (para pruebas o copia secundaria)
    if (!empty($config['mail_cc'] ?? '')) {
        $mail->addCC($config['mail_cc']);
    }
    $mail->addReplyTo($email, $nombre);

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = $config['mail_subject'];
    $mail->Body    = $bodyHtml;
    $mail->AltBody = $bodyPlain;

    $mail->send();

    http_response_code(200);
    echo json_encode([
        'ok' => true,
        'message' => 'Consulta enviada correctamente. Te responderemos a la brevedad.',
    ]);
} catch (Exception $e) {
    http_response_code(500);
    error_log('contacto.php PHPMailer error: ' . $mail->ErrorInfo);
    echo json_encode([
        'ok' => false,
        'message' => 'No pudimos enviar tu consulta. Por favor, escribinos por WhatsApp.',
    ]);
}