"use strict";
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define(
    "Tracks",
    {
      track_name: DataTypes.STRING,
      track_duration: DataTypes.NUMBER,
      album_id: DataTypes.INTEGER,
      artist_id: DataTypes.INTEGER,
    },
    {}
  );
  Tracks.associate = function (models) {
    // associations can be defined here
  };
  return track;
};
