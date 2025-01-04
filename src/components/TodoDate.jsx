import React, { useEffect, useState } from "react";

const TodoDate = () => {
  const [DateTime, SetDateTime] = useState("");

  // date and time
  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const FormatedDate = now.toLocaleDateString();
      const FormatedTime = now.toLocaleTimeString();
      SetDateTime(`${FormatedDate} - ${FormatedTime}`);
    }, 1000);
    return () => clearInterval();
  }, []);
  return <h2 className="date-time">{DateTime}</h2>;
};

export default TodoDate;
