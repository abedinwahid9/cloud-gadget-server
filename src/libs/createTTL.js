import prisma from "../models/prisma";

export const initTTL = async () => {
  try {
    await prisma.$runCommandRaw({
      createIndexes: "Otp",
      indexes: [
        {
          key: { createdAt: 1 },
          name: "otp_expire",
          expireAfterSeconds: 120, // 10 minutes
        },
      ],
    });

    // console.log("TTL index created");
  } catch (e) {
    // console.error("TTL error:", e);
  }
};
