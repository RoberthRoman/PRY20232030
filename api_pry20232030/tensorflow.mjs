import * as tf from "@tensorflow/tfjs";

export default async (sales) => {
  const sequenceLength = 3;
  const x = [];
  const y = [];

  for (let i = 0; i < sales.length - sequenceLength; i++) {
    const inputSequence = sales.slice(i, i + sequenceLength);
    const targetValue = sales[i + sequenceLength];
    x.push(inputSequence);
    y.push(targetValue);
  }

  const xTensor = tf.tensor2d(x);
  const yTensor = tf.tensor1d(y);

  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 32,
      activation: "relu",
      inputShape: [sequenceLength],
    })
  );

  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  const epochs = 100;

  await model.fit(xTensor, yTensor, { epochs });

  const lastInputSequence = sales.slice(-sequenceLength);
  const nextMonthPrediction = model.predict(tf.tensor2d([lastInputSequence]));
  const predictedValue = nextMonthPrediction.dataSync()[0];

  return predictedValue;
};
