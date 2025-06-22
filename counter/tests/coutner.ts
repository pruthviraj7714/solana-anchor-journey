import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Coutner } from "../target/types/coutner";
import { assert } from "chai";

describe("coutner", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.coutner as Program<Coutner>;

  const counter_account = anchor.web3.Keypair.generate();

  it("initialized counter!", async () => {
    await program.methods.initialize().accounts(
      {
        payer : provider.wallet.publicKey ,
        counterAccount : counter_account.publicKey,
      }
    ).signers([counter_account]).rpc();

    let account = await program.account.counterAccount.fetch(counter_account.publicKey);
    assert.strictEqual(account.count, 0);
  });

  it("increment counter!", async () => {
    await program.methods.increment().accounts(
      {
        counterAccount : counter_account.publicKey,
      }
    ).rpc();

    let account = await program.account.counterAccount.fetch(counter_account.publicKey);
    assert.strictEqual(account.count, 1);
  });

   it("decrement counter!", async () => {
    await program.methods.decrement().accounts(
      {
        counterAccount : counter_account.publicKey,
      }
    ).rpc();

    let account = await program.account.counterAccount.fetch(counter_account.publicKey);
    assert.strictEqual(account.count, 0);
  });

   it("increment counter!", async () => {
    await program.methods.increment().accounts(
      {
        counterAccount : counter_account.publicKey,
      }
    ).rpc();

    let account = await program.account.counterAccount.fetch(counter_account.publicKey);
    assert.strictEqual(account.count, 1);
  });
   it("increment counter!", async () => {
    await program.methods.increment().accounts(
      {
        counterAccount : counter_account.publicKey,
      }
    ).rpc();

    let account = await program.account.counterAccount.fetch(counter_account.publicKey);
    assert.strictEqual(account.count, 2);
  });

   it("multiply counter!", async () => {
    await program.methods.multiply(2).accounts(
      {
        counterAccount : counter_account.publicKey,
      }
    ).rpc();

    let account = await program.account.counterAccount.fetch(counter_account.publicKey);
    assert.strictEqual(account.count, 4);
  });

  
   it("reset counter!", async () => {
    await program.methods.reset().accounts(
      {
        counterAccount : counter_account.publicKey,
      }
    ).rpc();

    let account = await program.account.counterAccount.fetch(counter_account.publicKey);
    assert.strictEqual(account.count, 0);
  });
});
