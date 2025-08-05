"use server";

export async function serverLog(message: string): Promise<void> {
    console.log(`CLIENT: ${message}`);
}
