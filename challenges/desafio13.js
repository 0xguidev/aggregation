db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00"),
        $lte: ISODate("2016-03-10T23:59:59"),
      },
    },
  },
  {
    $group: {
      _id: null,
      media: {
        $avg: {
          $divide: [{
            $subtract: ["$stopTime", "$startTime"],
          }, 60000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      "duracaoMediaEmMinutos": { $ceil: ["$media"] },
    },
  },
]);
