import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'logs');
const logFile = path.join(logDir, 'app.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

function write(message: string) {
    fs.appendFileSync(logFile, message + '\n');
}

export function log(message: string) {
    const line = `[${new Date().toISOString()}] ${message}`;

    console.log(line);

    write(line);
}
