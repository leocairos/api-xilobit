// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const txtResponse = (txt: string) => {
  return {
    fulfillmentMessages: [
      {
        text: {
          text: [txt],
        },
      },
    ],
    payload: {
      google: {
        expectUserResponse: true,
        richResponse: {
          items: [
            {
              simpleResponse: {
                textToSpeech: txt,
              },
            },
          ],
        },
      },
    },
  };
};

export default txtResponse;
