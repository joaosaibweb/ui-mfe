import React, {
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ContentInputMoeda } from "./styles";
import { formataMoedaPFloat, formatarMoeda } from "../../services/utils";

const InputMoeda = forwardRef((props: { value: any }, ref) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [valor, setValor] = useState("");

  useEffect(() => {
    let valorInpt = props.value;
    setTimeout(() => {
      inputRef.current && inputRef.current?.focus();
    }, 200);

    if (props.value) {
      if (typeof valorInpt === "number") {
        valorInpt *= 100;
        setValor(formatarMoeda(formataMoedaPFloat(valorInpt)));
      } else {
        setValor(formatarMoeda(valorInpt));
      }
    }
  }, [props.value]);

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return inputRef?.current.value;
      },
    };
  });

  return (
    <ContentInputMoeda>
      <input
        autoFocus
        ref={inputRef}
        type="text"
        className="input_cad"
        value={valor}
        onChange={(ev) => {
          const valor = parseFloat(ev.target.value).toLocaleString("pt-BR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          });

          console.log(formatarMoeda(ev.target.value));
          setValor(formatarMoeda(ev.target.value));
          // setValor(formatarMoeda(ev.target.value));
        }}
      />
    </ContentInputMoeda>
  );
});

export default InputMoeda;
