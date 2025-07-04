import { spawn } from 'child_process';
import { encode, decode } from '@msgpack/msgpack';

const nvim = spawn('nvim', ['--headless', '--embed']);

let buffer = Buffer.alloc(0);
const pending = new Map<number, (res: any) => void>();
let msgId = 1;

// Handle responses from Neovim
nvim.stdout.on('data', (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);

  try {
    const msg = decode(buffer);
    buffer = Buffer.alloc(0);

    if (Array.isArray(msg) && msg[0] === 1) {
      const [, id, err, result] = msg;
      const cb = pending.get(id);
      if (cb) {
        cb(err || result);
        pending.delete(id);
      }
    }
  } catch (e) {
    // Incomplete buffer – wait for more
  }
});

// Send a request to Neovim
function callNvim(method: string, params: any[]): Promise<any> {
  const id = msgId++;
  const msg = encode([0, id, method, params]);
  nvim.stdin.write(msg);
  return new Promise((resolve) => {
    pending.set(id, resolve);
  });
}

(async () => {
  const version = await callNvim('nvim_get_api_info', []);
  console.log('API Info:', version);

  // Clean exit
  await callNvim('nvim_command', ['qa!']);
})();

// TODO, understand structure of MessagePack-RPC is
// https://neovim.io/doc/user/api.html && https://github.com/msgpack-rpc/msgpack-rpc/blob/master/spec.md
// Understand what this code is doign rather than blindly following it.
// Want to understand the MessageRPC spec and then how we can use it with Neovim.

