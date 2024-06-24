import { useState } from "react";

export function Home() {
  const [count, setCount] = useState(0);

  const style = {
    color: "red",
    "--custom-property": "value",
    "--empty-custom-property": "",
  };

  return (
    <div>
      <button style={style} onClick={() => setCount((curr) => curr + 1)}>
        Click Me
      </button>
      <p>Count: {count}</p>
    </div>
  );
}
