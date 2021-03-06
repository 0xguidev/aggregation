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
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  { $limit: 1 },
);
