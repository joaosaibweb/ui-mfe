import { toast } from "react-toastify";
import { GetToastOptionsParams } from "./types";
import * as Yup from "yup";
import { FormRefType } from "../../interfaces/default";

export const GetApiBaseUrl = (apiType: string): string | undefined => {
  let baseUrl;

  switch (apiType) {
    case "EMISSORES":
      baseUrl = process.env.REACT_APP_URL_API_EMISS;
      break;
    case "ADM":
      baseUrl = process.env.REACT_APP_URL_API_ADM_PROD;
      break;
    case "SAIBWEB":
      baseUrl = process.env.REACT_APP_URL_API_SAIB;
      break;
    case "MAINTENANCE":
      baseUrl = process.env.REACT_APP_URL_API_MAINTENANCE;
      break;

    default:
      baseUrl = "";
      break;
  }

  return baseUrl;
};

export const getToastOptions = (params?: GetToastOptionsParams) => ({
  autoClose: params?.timeAutoClose ?? 4000,
  position: params?.position ?? toast.POSITION.TOP_CENTER,
});

export const errorAlertMessage = (error: any | unknown) => {
  const msg = `Erro: ${error?.message || error?.error || error}`;
  return toast.error(msg, getToastOptions());
};

export const makeValidation = async (
  schema: Yup.Schema,
  data: any,
  formRef: FormRefType,
  callback?: (errors: any) => void
) => {
  formRef.current?.setErrors({});

  try {
    await schema.validate(data, {
      abortEarly: false,
    });
    return true;
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error) => {
        if (!error.path || !error.message) {
          return;
        }

        validationErrors[error.path] = error.message;
      });
      formRef.current?.setErrors(validationErrors);
      callback && callback(validationErrors);
    }
    return false;
  }
};

export function DebounceFactory(
  callback: (...args: any[]) => void,
  wait: number
) {
  let timeout: NodeJS.Timeout | null;
  return function (this: any, ...args: any[]) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    if (typeof callback === "function") {
      timeout = setTimeout(() => {
        timeout = null;
        callback.apply(context, args);
      }, wait);
    } else {
      console.error("DebounceFactory error: callback is not a function");
    }
  };
}

export const isFloat = (valor: any) => {
  return String(valor).includes(".");
};

export function remVirgulaNum(str: any) {
  let valor = String(str);
  valor = valor.replace(/(,)/g, ".");

  const qtdePontosDoValor: any = String(valor).match(/(['.'])/g)?.length;

  if (qtdePontosDoValor > 1) {
    for (let i = 1; i < qtdePontosDoValor; i++) {
      valor = valor.replace(".", "");
    }
  }

  return valor;
}

export function toFloat(v: any, n = 2) {
  if (!v) {
    v = 0;
  }
  return typeof v === "string" || isFloat(v)
    ? Number(parseFloat(remVirgulaNum(v)).toFixed(n))
    : v;
}

export function formataMoedaPFloat(valor: any, n = 2) {
  if (
    !isNaN(Number(valor)) &&
    typeof Number(valor) === "number" &&
    valor % 1 !== 0
  ) {
    return Number(Number(valor).toFixed(2));
  }
  if (typeof valor === "number" && valor % 2 !== 0 && valor % 2 !== 1) {
    return valor;
  }
  return toFloat(String(valor).replace("R$", "").replace(/[. ]+/g, ""), n);
}

export function formatarMoeda(valor: number | string = ""): string {
  let v: string = String(valor).replace(/\D/g, "");

  v = (Number(v) / 100).toFixed(2).toString();

  v = v.replace(".", ",");

  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");

  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");

  return v;
}
function formatHours(hours: any) {
  return new Date(hours * 3600000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
