db.air_alliances.aggregate(
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airl: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$airline.name", "$$airl"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        },
      ],
      as: "routes",
    },
  },
  { $unwind: "$routes" },
  {
    $group: {
      _id: "$name",
      totalrotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalrotas: -1 },
  },
  { $limit: 1 },
);
