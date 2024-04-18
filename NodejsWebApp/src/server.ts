import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { requestBodySchema } from './schemas/request.schema';

const app = express();

import { operations } from './operations';

app.use(bodyParser.json());

const port = 3000; /* process.env.PORT || */

app.post('/calculate', (req: Request, res: Response) => {
  try {
    const body = requestBodySchema.parse(req.body);

    const { firstValue, secondValue, operation } = body;

    const result = operations.calculate(firstValue, secondValue, operations[operation]);

    res.status(200).json({ sucess: true, result });
  } catch (error) {
    console.log(error.message)

    res.status(400).send({
      sucess: false,
      message: 'Valores inválidos'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
