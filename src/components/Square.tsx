type Props = {
  value: string;
  onClick: () => void;
};

export function Square(props: Props) {
  return (
    <button role="button" className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
