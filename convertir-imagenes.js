const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIRECTORIO_IMAGENES = path.join(__dirname, 'public');
const DIRECTORIO_CODIGO = path.join(__dirname, 'src');
const EXTENSIONES_CODIGO = ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.md', '.mdx', '.json'];
const CALIDAD_WEBP = 85;
const HACER_BACKUP = true;

const conversiones = [];

async function convertirImagenes(directorio) {
    const entradas = fs.readdirSync(directorio);

    for (const archivo of entradas) {
        const rutaCompleta = path.join(directorio, archivo);
        const stat = fs.statSync(rutaCompleta);

        if (stat.isDirectory()) {
            await convertirImagenes(rutaCompleta);
            continue;
        }

        if (!archivo.match(/\.(png|jpg|jpeg)$/i)) continue;

        const rutaSalida = rutaCompleta.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const nombreWebp = path.basename(rutaSalida);

        try {
            await sharp(rutaCompleta).webp({ quality: CALIDAD_WEBP }).toFile(rutaSalida);

            const statWebp = fs.statSync(rutaSalida);
            if (statWebp.size === 0) throw new Error('El archivo WebP resultó vacío');

            conversiones.push({
                original: rutaCompleta,
                webp: rutaSalida,
                nombreOriginal: archivo,
                nombreWebp,
            });

            console.log(`Convertido: ${archivo} → ${nombreWebp}`);
        } catch (err) {
            console.error(`Error al procesar ${archivo}:`, err.message);
            if (fs.existsSync(rutaSalida)) fs.unlinkSync(rutaSalida);
        }
    }
}

function actualizarReferenciasEnCodigo(directorio) {
    if (!fs.existsSync(directorio)) return;

    const entradas = fs.readdirSync(directorio);

    for (const entrada of entradas) {
        const rutaCompleta = path.join(directorio, entrada);
        const stat = fs.statSync(rutaCompleta);

        if (stat.isDirectory()) {
            actualizarReferenciasEnCodigo(rutaCompleta);
            continue;
        }

        if (!EXTENSIONES_CODIGO.includes(path.extname(entrada))) continue;

        let contenido = fs.readFileSync(rutaCompleta, 'utf8');
        let modificado = false;

        for (const { nombreOriginal, nombreWebp } of conversiones) {
            if (contenido.includes(nombreOriginal)) {
                contenido = contenido.replaceAll(nombreOriginal, nombreWebp);
                modificado = true;
            }
        }

        if (modificado) {
            fs.writeFileSync(rutaCompleta, contenido, 'utf8');
            console.log(`Referencias actualizadas en: ${rutaCompleta}`);
        }
    }
}

function eliminarOriginales() {
    for (const { original, nombreOriginal } of conversiones) {
        if (HACER_BACKUP) {
            const backupDir = path.join(__dirname, '_backup_imagenes_originales');
            if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
            fs.copyFileSync(original, path.join(backupDir, nombreOriginal));
        }

        fs.unlinkSync(original);
        console.log(`Eliminado: ${nombreOriginal}`);
    }
}

(async () => {
    console.log('Iniciando conversión de imágenes a WebP...\n');

    await convertirImagenes(DIRECTORIO_IMAGENES);

    console.log(`\nActualizando referencias en código fuente...`);
    actualizarReferenciasEnCodigo(DIRECTORIO_CODIGO);
    actualizarReferenciasEnCodigo(path.join(__dirname, 'public'));

    console.log(`\nEliminando originales...`);
    eliminarOriginales();

    console.log(`\nListo. ${conversiones.length} imagen(es) convertida(s).`);
    if (HACER_BACKUP) {
        console.log(`Originales respaldados en: _backup_imagenes_originales/`);
    }
})();