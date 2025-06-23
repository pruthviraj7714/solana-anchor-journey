use anchor_lang::prelude::*;

declare_id!("fSmsLqeLx4oF4dxtmG3bNYm4d5L2Sj89k3Lj2LygTqE");

#[program]
pub mod day02_counter_with_owner {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter_account;
        counter_account.count = 0;
        counter_account.owner = ctx.accounts.payer.key();
        msg!("Counter account is intialized with owner {}", counter_account.owner);
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter_account;
        require_keys_eq!(counter_account.owner, ctx.accounts.payer.key(), CustomError::Unauthorized);
        counter_account.count += 1;
        msg!("Counter account is incremented with 1, current count is {}", counter_account.count);
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter_account;
        require_keys_eq!(counter_account.owner, ctx.accounts.payer.key(), CustomError::Unauthorized);
        counter_account.count -= 1;
        msg!("Counter account is decrement with 1, current count is {}", counter_account.count);
        Ok(())
    }

    pub fn reset(ctx: Context<Reset>) -> Result<()> {
         let counter_account = &mut ctx.accounts.counter_account;
        require_keys_eq!(counter_account.owner, ctx.accounts.payer.key(), CustomError::Unauthorized);
        counter_account.count = 0;
        msg!("Counter count is about to reset, current count is {}", counter_account.count);
        Ok(())
    }

    pub fn multiply(ctx: Context<Multiply>, num : u32) -> Result<()> {
         let counter_account = &mut ctx.accounts.counter_account;
        require_keys_eq!(counter_account.owner, ctx.accounts.payer.key(), CustomError::Unauthorized);
        counter_account.count *= num;
        msg!("Counter count is multiplied, current count is {}", counter_account.count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer : Signer<'info>,
    #[account(init, payer = payer, space = 8 + 4 + 32)]
    pub counter_account : Account<'info, CounterAccount>,
    pub system_program : Program<'info, System>
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub payer : Signer<'info>,
    #[account(mut)]
    pub counter_account : Account<'info, CounterAccount>,
}


#[derive(Accounts)]
pub struct Decrement<'info> {
    pub payer : Signer<'info>,
    #[account(mut)]
    pub counter_account : Account<'info, CounterAccount>,
}

#[derive(Accounts)]
pub struct Reset<'info> {
    pub payer : Signer<'info>,
    #[account(mut)]
    pub counter_account : Account<'info, CounterAccount>,
}

#[derive(Accounts)]
pub struct Multiply<'info> {
    pub payer : Signer<'info>,
    #[account(mut)]
    pub counter_account : Account<'info, CounterAccount>,
}


#[account]
pub struct CounterAccount {
    count : u32,
    owner : Pubkey
}

#[error_code]
pub enum CustomError {
    #[msg("you are not authorized")]
    Unauthorized
}