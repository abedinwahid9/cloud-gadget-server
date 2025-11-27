import { Prisma } from "@prisma/client";

export const initTTL = async () => {
  await Prisma.$runCommandRaw({
    createIndexes: "Otp",
    indexes: [
      {
        key: { createdAt: 1 }, // index on createdAt
        name: "otp_expire", // index name
        expireAfterSeconds: 60 * 3, // auto-delete after 2 minutes
      },
    ],
  });

  // console.log("TTL index created successfully");
};
