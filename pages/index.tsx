import { FocusEventHandler, useRef, useState } from "react";

export default function Home() {
  const fruits = [
    "apple",
    "banana",
    "orange",
    "lemon",
    "lime",
    "pure",
    "peach",
    "berry",
    "dorian",
    "mango",
    "starfruit",
    "dragonFruit",
    "almond",
    "walnut",
    "grape",
    "persimmon",
  ];
  const [isHidden, setIsHidden] = useState(true);
  const [result, setResult] = useState("");
  const [liOver, setLiOver] = useState(false);
  const [search, setSearch] = useState("");
  const ulRef = useRef<HTMLInputElement>(null);
  const onFocusIn: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsHidden(false);
  };
  const onFocusOut: FocusEventHandler<HTMLInputElement> = (e) => {
    if (liOver) return;
    setIsHidden(true);
  };
  return (
    <>
      <main className="container">
        <section>
          <input
            ref={ulRef}
            type={"search"}
            onFocus={onFocusIn}
            onBlur={onFocusOut}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
          <ul hidden={isHidden}>
            {fruits.map((fruit, idx) => (
              <li
                key={idx}
                onMouseOver={(e) => {
                  setLiOver(true);
                  e.currentTarget.style.background = "pink";
                }}
                onMouseLeave={(e) => {
                  setLiOver(false);
                  e.currentTarget.style.background = "none";
                }}
                onClick={(e) => {
                  const value = e.currentTarget.textContent;
                  setResult(value!);
                  setIsHidden(true);
                }}
                style={{ cursor: "pointer" }}
                hidden={!fruit.includes(search)}
              >
                {fruit}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer>{result}</footer>
    </>
  );
}
