import dbConnect from "@/lib/mongodb"; // or wherever you saved it
import TargetModel from "../models/Collection";

export const getTargets = async () => {
  await dbConnect(); // ✅ Ensure DB connection

  return await TargetModel.find().lean();
};

export async function addTarget(target) {
  await dbConnect();

  if (
    !target.userId ||
    !target.month ||
    !target.year ||
    target.collection === undefined
  ) {
    throw new Error("Missing required target fields");
  }

  const month = Number(target.month);
  const year = Number(target.year);

  const now = new Date();

  const filter = { userId: target.userId, month, year };
  const update = {
    ...target,
    month,
    year,
    updatedAt: now,
  };

  const collection = new TargetModel({
    ...update,
  });
  return await collection.save();

  // Use upsert: true to insert if not exist or update if exists
  // const updatedTarget = await TargetModel.Cre(filter, update, {
  //   new: true,
  //   upsert: true,
  //   setDefaultsOnInsert: true,
  // });

  // return updatedTarget;
}

export const getTargetsByUserAndMonth = async (userId, month, year) => {
  const targets = await getTargets();
  return targets?.filter(
    (t) =>
      t.userId === userId &&
      t.month === parseInt(month) &&
      t.year === parseInt(year)
  );
};
