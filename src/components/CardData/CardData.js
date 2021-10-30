import React from "react";
import { Link } from "react-router-dom";

export default function CardData({ props }) {
  return (
    <div class="flex justify-center items-center">
      <div class="w-48 h-64 rounded-xl bg-blue-400 flex flex-col shadow">
        <img class="w-auto rounded-t-xl " src={props.Image} alt="avatar" />
        <div class="text-center flex flex-col p-2">
          <span class="text-base font-bold text-gray-700">
            {props.Fname + " " + props.Lname}
          </span>
          <span class="text-sm italic text-gray-700">
            {" "}
            College Id: {props.FID}
          </span>
        </div>
      </div>
    </div>
  );
}
