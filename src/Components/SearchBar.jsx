import React from "react";

export default function SearchBar({setSearch}) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      onChange={(e)=>setSearch(e.target.value)}
      style={{
        width:"100%",
        padding:"10px",
        borderRadius:"12px",
        border:"1px solid #ddd",
        marginBottom:"12px"
      }}
    />
  );
}
