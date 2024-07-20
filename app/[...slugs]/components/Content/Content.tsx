import "./Content.style.css";

type Props = {
  html_data: string;
};

export default async function PageContent({ html_data }: Props) {
  return (
    <div
      className="c-content"
      dangerouslySetInnerHTML={{ __html: html_data }}
    />
  );
}
