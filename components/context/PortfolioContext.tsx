import React, { createContext, useState } from "react";

export const EcommerceContext = createContext(null);

export const EcommerceProvider = ({ children }) => {
 const [hook,sethook]=useState("")

const [height, useheight] = useState(undefined);
const [width, usewidth] = useState(1);

function updateheight() {
  useheight(window.innerHeight);
  console.log(height);
}

function updatewidth() {
  usewidth(window.innerWidth);
  console.log(width);
}

 const [skills, setskills] = useState([
   { now: 90, variant: "info", Text: "JavaScript" },
   { now: 80, variant: "danger", Text: "React.Js" },
   { now: 70, variant: "", Text: "Next.Js" },
   { now: 80, variant: "info", Text: "TypeScript" },
   { now: 40, variant: "warning", Text: "Node" },
   { now: 20, variant: "", Text: "Express" },
   { now: 10, variant: "danger", Text: "Python" },
 ]);
  return (
    <EcommerceContext.Provider
      value={{
        hook,
        skills,
        updateheight,
        updatewidth,
        height,
        width,
        useheight,
        usewidth,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
function then(arg0: () => void) {
  throw new Error("Function not implemented.");
}
