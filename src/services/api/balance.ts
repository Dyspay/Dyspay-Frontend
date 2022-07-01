export async function getBalance(
  treasureAddress: string
): Promise<{ result: any; error: any }> {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(
      `${process.env.dispayApi}/balances?address=${treasureAddress}`,
      requestOptions
    )
    const result = await response.json()

    return { result, error: null }
  } catch (error) {
    return { result: null, error }
  }
}
