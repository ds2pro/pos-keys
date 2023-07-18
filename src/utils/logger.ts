const logger = {
  info: (message: string) => {
    console.log(message);
  },
  error: (message: string) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(message);
    }
  },
};
const stream = {
  write: (message: string) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(message.substring(0, message.lastIndexOf('\n')));
    }
  },
};

export { logger, stream };
