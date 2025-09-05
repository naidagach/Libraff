import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function PriceRange() {
  const [range, setRange] = useState([0, 690]);

  return (
    <div className="w-full mx-auto">
      <Slider
        range
        min={0}
        max={690}
        value={range}
        onChange={setRange}
        trackStyle={[{ backgroundColor: "#ef4444", height: 6 }]}   // красная линия
        handleStyle={[
          { borderColor: "#ef4444", height: 18, width: 18, marginTop: -6, backgroundColor: "#fff" },
          { borderColor: "#ef4444", height: 18, width: 18, marginTop: -6, backgroundColor: "#fff" }
        ]}
      />

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <span>{range[0]} ₼</span>
        <span>{range[1]} ₼</span>
      </div>
    </div>
  );
}
