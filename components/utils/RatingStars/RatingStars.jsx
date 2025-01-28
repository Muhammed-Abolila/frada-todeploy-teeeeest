"use client";
import React from "react";
import StarRatings from "react-star-ratings";
export default function RatingStars({ item }) {
  return (
    <div className="my-1">
      <StarRatings
        rating={4.6}
        starRatedColor="black"
        numberOfStars={5}
        name="rating"
        starDimension="20px"
        starSpacing="2px"
      />
    </div>
  );
}