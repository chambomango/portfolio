import React from "react";

const HEADLINES = [
  "full-stack software engineer",
  "building with typescript & react",
  "turning data into insight",
  "api & database architect",
  "cloud & ci/cd minded",
  "ui/ux focused",
];

export default function Headlines() {
  const [displayText, setDisplayText] = React.useState("");
  const [headlineIndex, setHeadlineIndex] = React.useState(0);
  const [isBackspacing, setisBackspacing] = React.useState(false);

  React.useEffect(() => {
    const currentHeadline = HEADLINES[headlineIndex];

    //Pause before next backspace animation
    if (!isBackspacing && displayText === currentHeadline) {
      const id = setTimeout(() => setisBackspacing(true), 2000);
      return () => clearTimeout(id);
    }

    //Finished backspacing - prepping to start typing
    if (isBackspacing && displayText === "") {
      setisBackspacing(false);
      setHeadlineIndex((index) => (index + 1) % HEADLINES.length);
      return;
    }

    //Animation effect for typing/backspacing
    const id = setTimeout(
      () =>
        setDisplayText(
          isBackspacing
            ? currentHeadline.slice(0, displayText.length - 1)
            : currentHeadline.slice(0, displayText.length + 1),
        ),
      isBackspacing ? 30 : 80,
    );
    return () => clearTimeout(id);
  }, [displayText, headlineIndex, isBackspacing]);

  return (
    <>
      <span className="font-mono text-lg text-muted-foreground mb-6 inline-flex items-baseline leading-none">
        <span>// {displayText}</span>
        <span aria-hidden="true" className="caret-blink" />
      </span>
    </>
  );
}
