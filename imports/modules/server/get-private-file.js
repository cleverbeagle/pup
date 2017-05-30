import fs from 'fs';

export default path => fs.readFileSync(`assets/app/${path}`, 'utf8');
