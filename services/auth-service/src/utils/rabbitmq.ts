import amqp, { Channel } from "amqplib";

let channel: Channel | undefined;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost"
    );
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect RabbitMQ", error);
    process.exit(1);
  }
};

const subscribeToQueue = async (
  queueName: string,
  callback: (msg: amqp.ConsumeMessage | null) => void
) => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }

  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Subscribed to queue: ${queueName}`);

    channel.consume(queueName, (msg) => {
      if (msg) {
        callback(msg);
        if (channel) {
          channel.ack(msg); // Acknowledge the message
        }
      }
    });
  } catch (error) {
    console.error(`Failed to subscribe to queue ${queueName}`, error);
  }
};

const publishToQueue = async (queueName: string, data: any) => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }

  try {
    await channel.assertQueue(queueName, { durable: true });
    const isSent = channel.sendToQueue(
      queueName,
      Buffer.from(typeof data === "object" ? JSON.stringify(data) : data)
    );
    if (isSent) {
      console.log(`Message sent to queue ${queueName}`);
    } else {
      console.error(`Failed to send message to queue ${queueName}`);
    }
  } catch (error) {
    console.error(`Failed to publish to queue ${queueName}`, error);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }
  return channel;
};

const closeRabbitMQ = async () => {
  if (channel) {
    await channel.close();
    console.log("RabbitMQ channel closed");
  }
};

export {
  connectRabbitMQ,
  subscribeToQueue,
  publishToQueue,
  getChannel,
  closeRabbitMQ,
};
