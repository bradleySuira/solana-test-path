import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";

async function getKeyCreatedBySolanaKeygenFromMnemonic(
  mnemonic: string,
  path44Change: string
) {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const seedBuffer = Buffer.from(seed).toString("hex");
  const derivedSeed = derivePath(path44Change, seedBuffer).key;
  const kp = Keypair.fromSeed(derivedSeed);
  return kp;
}

const mnemonic = bip39.generateMnemonic();
console.log({ mnemonic });
const paths44Change = [`m/44'/501'/0'`, `m/44'/501'/0'/0'`];
const run = async () => {
  for (const path of paths44Change) {
    const kp = await getKeyCreatedBySolanaKeygenFromMnemonic(mnemonic, path);
    console.log({ path, publicKey: kp.publicKey.toString() });
  }
};
run();
