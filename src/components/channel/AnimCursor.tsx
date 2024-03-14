import AnimatedCursor from "react-animated-cursor";

const AnimCursor = () => {
  return (
    <AnimatedCursor
      innerSize={5}
      outerSize={30}
      innerScale={1}
      outerScale={1.5}
      outerAlpha={0}
      innerStyle={{
        backgroundColor: "var(--cursor-color)",
      }}
      outerStyle={{
        border: "3px solid var(--cursor-color)",
      }}
    />
  );
};

export default AnimCursor;
