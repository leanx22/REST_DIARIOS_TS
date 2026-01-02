import app from "./app";
import "dotenv/config";
import { swaggerDocs } from "./src/config/swagger";

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}.`);

    swaggerDocs(app, PORT);
});


