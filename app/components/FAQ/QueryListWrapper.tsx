import QueryList from "./QueryList";

const QueryListWrapper = async () => {
  const URL = `${process.env.WEB_HOST}/api/faq`;
  const res = await fetch(URL, {
    next: {
      tags: ["faq"],
    },
  }).then((res) => res.json());

  return <QueryList data={res} />;
};

export default QueryListWrapper;
