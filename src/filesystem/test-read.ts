import {createReadStream} from "fs";

async function readFileAsBase64Stream(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const stream = createReadStream(filePath);
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => {
            chunks.push(chunk as Buffer);
        });
        stream.on('end', () => {
            const finalBuffer = Buffer.concat(chunks);
            resolve(finalBuffer.toString('base64'));
        });
        stream.on('error', (err) => reject(err));
    });
}

async function main(path:string): Promise<[{ type:string, data:string, mimeType:string }]> {
    const type = "image";
    const mimeType = "image/png";
    const data = await readFileAsBase64Stream(path);
    return [{type, mimeType, data}]
}

main('/Users/cliffhall/Desktop/des.png')
    .then(data => console.log(data))
    .catch(err => console.error(err))
