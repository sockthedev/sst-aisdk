export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from the API!",
      timestamp: new Date().toISOString(),
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }
}
