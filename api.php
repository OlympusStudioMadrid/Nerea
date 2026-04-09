<?php
/**
 * api.php — Escáner de carpetas de fotos
 * 15 Vueltas al Sol · Olympus Studio
 *
 * Coloca este archivo en la raíz del proyecto.
 * Las fotos van en: /fotos/NOMBRE_CARPETA/imagen.jpg
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('X-Content-Type-Options: nosniff');

$action  = $_GET['action'] ?? 'categories';
$baseDir = __DIR__ . '/fotos/';
$baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http')
         . '://' . $_SERVER['HTTP_HOST']
         . rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') . '/fotos/';

$EXTENSIONS = ['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP'];

/* ─── Utilidades ───────────────────────────────────────── */
function safeFolder(string $name): string {
    // Evitar path traversal
    return basename(str_replace(['..', '/', '\\', "\0"], '', $name));
}

/* ─── Acción: listar categorías ────────────────────────── */
if ($action === 'categories') {
    $cats = [];
    if (is_dir($baseDir)) {
        $items = @scandir($baseDir);
        if ($items) {
            foreach ($items as $item) {
                if ($item === '.' || $item === '..') continue;
                $fullPath = $baseDir . $item;
                if (is_dir($fullPath)) {
                    // Contar fotos
                    $count = 0;
                    $files = @scandir($fullPath);
                    if ($files) {
                        foreach ($files as $f) {
                            if ($f === '.' || $f === '..') continue;
                            $ext = pathinfo($f, PATHINFO_EXTENSION);
                            if (in_array($ext, $EXTENSIONS)) $count++;
                        }
                    }
                    $cats[] = [
                        'name'  => $item,
                        'count' => $count,
                    ];
                }
            }
        }
    }
    echo json_encode(['ok' => true, 'categories' => $cats], JSON_UNESCAPED_UNICODE);
    exit;
}

/* ─── Acción: listar fotos de una carpeta ──────────────── */
if ($action === 'photos') {
    $folder = safeFolder($_GET['folder'] ?? '');
    if ($folder === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Carpeta no especificada']);
        exit;
    }

    $dir = $baseDir . $folder . '/';
    if (!is_dir($dir)) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => "Carpeta \"$folder\" no encontrada"]);
        exit;
    }

    $photos  = [];
    $rawUrl  = $baseUrl . rawurlencode($folder) . '/';
    $files   = @scandir($dir);

    if ($files) {
        // Ordenar naturalmente (IMG_001, IMG_002…)
        natsort($files);
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            if (!in_array($ext, $EXTENSIONS)) continue;
            $photos[] = [
                'name' => $file,
                'url'  => $rawUrl . rawurlencode($file),
                'path' => 'fotos/' . $folder . '/' . $file,  // para descarga
            ];
        }
    }

    echo json_encode([
        'ok'     => true,
        'folder' => $folder,
        'total'  => count($photos),
        'photos' => $photos,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/* ─── Acción desconocida ───────────────────────────────── */
http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Acción no reconocida']);
