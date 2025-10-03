import prisma from "../models/prisma";

async function getNextSequence(name: string) {
  let counter = await prisma.counter.findFirst({ where: { name } });

  if (!counter) {
    counter = await prisma.counter.create({
      data: {
        name,
        seq: 1,
      },
    });
    return counter;
  }
  // 3️⃣ Increment manually
  counter = await prisma.counter.update({
    where: { id: counter.id },
    data: { seq: counter.seq + 1 }, // ✅ just add 1
  });

  return counter;
}

export async function generateProductCode() {
  const counter = await getNextSequence("product");
  return `PRO-${String(counter.seq).padStart(5, "0")}`;
}

export async function generateOrderCode() {
  const counter = await getNextSequence("order");
  return `ORD-${String(counter.seq).padStart(5, "0")}`;
}
