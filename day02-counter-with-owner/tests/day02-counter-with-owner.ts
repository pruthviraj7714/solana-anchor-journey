import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day02CounterWithOwner } from "../target/types/day02_counter_with_owner";
import { assert } from "chai";

describe("day02-counter-with-owner", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.day02CounterWithOwner as Program<Day02CounterWithOwner>;

  let counter = anchor.web3.Keypair.generate();
  let payer = provider.wallet;

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey,
    }).signers([counter]).rpc();
    console.log("Your transaction signature", tx);
    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 0, "Count is 0");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58() , "owner is payer's pubkey ");
  });

   it("counter account increment!", async () => {
     await program.methods.increment().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 1, "Count is 1");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });

    it("counter account decremented!", async () => {
     await program.methods.decrement().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 0, "Count is 0");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });

    it("counter account increment!", async () => {
     await program.methods.increment().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 1, "Count is 1");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });


  it("counter account reset!", async () => {
     await program.methods.reset().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 0, "Count is 0");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });

   it("counter account increment!", async () => {
     await program.methods.increment().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 1, "Count is 1");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });
  it("counter account increment!", async () => {
     await program.methods.increment().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 2, "Count is 2");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });
  it("counter account increment!", async () => {
     await program.methods.increment().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 3, "Count is 3");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });
  it("counter account increment!", async () => {
     await program.methods.increment().accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 4, "Count is 4");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });
  it("count multiplied!", async () => {
     await program.methods.multiply(4).accounts({
      counterAccount : counter.publicKey,
      payer : payer.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counter.publicKey);
    assert.strictEqual(account.count, 16, "Count is 16");
    assert.strictEqual(account.owner.toBase58(), payer.publicKey.toBase58(), "owner is payer's pubkey ");
  });
});
