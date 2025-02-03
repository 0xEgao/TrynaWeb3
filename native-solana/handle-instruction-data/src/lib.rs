use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

// Entry point is a function call process_instruction
entrypoint!(process_instruction);
// Inside lib.rs
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = MovieInstrution::unpack(instruction_data)?;
    match instruction {
        MovieInstrution::AddMovieReview {
            title,
            rating,
            description,
        } => add_movie_review(program_id, accounts, title, rating, description),
    }
}

pub mod instruction;
use instruction::MovieInstrution;

pub fn add_movie_review(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    title: String,
    rating: u8,
    description: String,
) -> ProgramResult {
    msg!("Adding Movie Review");
    msg!("Title: {}", title);
    msg! {"Rating : {}",rating};
    msg! {"description : {}",description};

    Ok(())
}
