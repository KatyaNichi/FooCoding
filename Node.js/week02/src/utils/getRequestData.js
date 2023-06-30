/**
 * This function gets the body data from an HTTP request
 *
 * @param {Request} request
 * @returns {Promise<Object.<string, any>>}
 */
export const getRequestData = (request) => {
  return new Promise((resolve, reject) => {
    const body = [];

    request
      .on("error", (err) => {
        reject(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        try {
          const data = JSON.parse(Buffer.concat(body).toString());
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
  });
};
