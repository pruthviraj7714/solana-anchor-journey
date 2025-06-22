use anchor_lang::prelude::*;

declare_id!("EWSLq4mtoNDV831HVPdBtD52o1E5LBq3pThV6ZrL2nZo");

#[program]
pub mod coutner {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter_account;
        msg!("Counter Account Created! current count {}", counter.count);
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter_account;
        counter.count += 1;
        Ok(())
    }
    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter = &mut ctx.accounts.counter_account;
        counter.count -= 1;
        Ok(())
    }

    pub fn reset(ctx: Context<Reset>) -> Result<()> {
        let counter = &mut ctx.accounts.counter_account;
        counter.count = 0;
        Ok(())
    }

    pub fn multiply(ctx: Context<Multiply>, num : u32) -> Result<()> {
        let counter = &mut ctx.accounts.counter_account;
        counter.count *= num;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer : Signer<'info>,
    #[account(init, payer = payer, space = 8 + 4)]
    pub counter_account : Account<'info, CounterAccount>,
    pub system_program : Program<'info, System>
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter_account : Account<'info, CounterAccount>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub counter_account : Account<'info, CounterAccount>,
}


#[derive(Accounts)]
pub struct Reset<'info> {
    #[account(mut)]
    pub counter_account : Account<'info, CounterAccount>,
}


#[derive(Accounts)]
pub struct Multiply<'info> {
    #[account(mut)]
    pub counter_account : Account<'info, CounterAccount>,
}


#[account]
pub struct CounterAccount {
    pub count : u32
}
