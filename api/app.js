const express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authRouter = require('./src/routes/auth');
const storiesRouter = require('./src/routes/stories');
const authenticate = require('./src/auth_helper').authenticate;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use(authRouter);
router.use("/stories", authenticate, storiesRouter);
app.use('/api/v1', router);

let port = 3000;
app.listen(port);
console.log(`Api server listening at port ${port}`);
console.log(`Swagger API Doc is available now at http://localhost:${port}/api-docs`);