"use strict";
module.exports = (sequelize, DataTypes) => {
  const artist = sequelize.define(
    "Artists",
    {
      artist_name: DataTypes.STRING,
      artist_id: DataTypes.INTEGER,
    },
    {}
  );
  Artists.associate = function (models) {
    // associations can be defined here
  };
  return Artists;
};
