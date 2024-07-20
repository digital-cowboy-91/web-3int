import "./Header.style.css";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <div className="c-header">
      <h1>{title}</h1>
      <hr />
    </div>
  );
}
