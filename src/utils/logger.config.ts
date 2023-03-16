
import { Request } from "express";
import { CORRELATION_ID_KEY } from "src/middlewares/correlation-id.middleware";

export const loggerConfig = {
  pinoHttp: {
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              messageKey: 'message',
            },
          }
        : undefined,
    messageKey: 'message',
    autoLogging: false,
    serializers: {
      req(): undefined {
        return undefined;
      },
      res(): undefined {
        return undefined;
      },
    },
    customProps: function (req: Request) {
      return {
        correlationId: req.headers[CORRELATION_ID_KEY],
      };
    },
  },
};
