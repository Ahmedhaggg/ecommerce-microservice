import expressApp from "./express";

const PORT = process.env.APP_PORT || 8000;

expressApp.listen(PORT);
