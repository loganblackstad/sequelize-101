"use strict";
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    "Albums",
    {
      album_name: DataTypes.STRING,
      year: DataTypes.STRING,
      artist_id: DataTypes.STRING,
    },
    {}
  );
  Albums.associate = function (models) {
    // associations can be defined here
  };
  return Albums;
};
