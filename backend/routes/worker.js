import { Worker } from 'code-executor';

const worker = new Worker('myExecutor', 'https://6379-fabc14-flame-lg8cjlxrlwx.ws-us114.gitpod.io');

async function main() {
    await worker.build(['Python', 'Bash']);

    worker.start();
}

main();