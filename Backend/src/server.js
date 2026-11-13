import app from "./app.js";
import env from "./utils/env.js";

app.listen(env.server.port, () => {
  console.log(`Backend running on port ${env.server.port}`)
})
