import React from "react";
import {Link, useNavigate} from "react-router-dom";
function NavButtons() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-10 mb-10 bg-base-300 ">
      <div className="btn-group grid grid-cols-2 gap-20 bg-base-300">
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          Previous
        </button>
        <button className="btn btn-outline" onClick={() => navigate(+1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default NavButtons;
