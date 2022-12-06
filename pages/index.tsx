import { useEffect, useRef, useState } from "react";

const ListItem = ({ fruit }: { fruit: string }) => {
  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        ([e]) => {
          const target = e.target as HTMLElement;
          if (e.isIntersecting) {
            target.style.opacity = "1";
          } else {
            target.style.opacity = "0";
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(target.current as Element);
    }
  }, [target]);
  return (
    <div style={{ marginTop: 800 }}>
      <div
        ref={target}
        style={{
          height: 500,
          textAlign: "center",
          fontSize: "2rem",
          opacity: 0,
          transition: "all 0.5s",
        }}
      >
        {fruit}
      </div>
    </div>
  );
};

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

const fruits = [
  "apple",
  "banana",
  "orange",
  "lemon",
  "lime",
  "pure",
  "peach",
  "berry",
];

const nextItem = [
  "dorian",
  "mango",
  "starfruit",
  "dragonFruit",
  "almond",
  "walnut",
  "grape",
  "persimmon",
];
export default function Home() {
  const target = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{ item: string[]; isLoading: boolean }>({
    item: [...fruits],
    isLoading: false,
  });
  const fetchItems = async (nextItem: string[]) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    await fakeFetch();
    setState((prev) => ({
      item: [...prev.item, ...nextItem],
      isLoading: true,
    }));
  };
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        async ([e], observer) => {
          if (e.isIntersecting) {
            observer.unobserve(e.target);
            await fetchItems(nextItem);
            observer.observe(e.target);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(target.current as Element);
    }
    return () => observer.disconnect();
  }, [target]);

  const { item, isLoading } = state;
  return (
    <div>
      {item.map((fruit, i) => {
        return <ListItem key={i} fruit={fruit} />;
      })}
      <div ref={target}>{isLoading && "Loading..."}</div>
    </div>
  );
}
