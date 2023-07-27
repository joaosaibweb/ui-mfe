import React, { useEffect, useRef, ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { Moment } from "moment";
import { Container, ContainerDatePicker } from "./styles";
import { ptBR } from "date-fns/locale";
import { setHours, setMinutes } from "date-fns";

interface DatePickerInputProps {
  onChangeDate: (date: Moment | Date | null) => void;
  value: Moment | Date | null;
  mode: "date" | "time" | "datetime";
  label: string;
  maxDate?: Moment | Date | null;
  minDate?: Moment | Date | null;
  readOnly?: boolean;
  error?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  onChangeDate,
  value,
  mode,
  label,
  maxDate,
  minDate,
  readOnly,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [classes, setClasses] = useState<string>("input_cad");
  const [date, setDate] = useState<Moment | null>(moment());

  useEffect(() => {
    if (value && moment.isMoment(value)) {
      setDate(value);
    } else if (value instanceof Date) {
      setDate(moment(value));
    } else {
      setDate(moment());
    }
  }, [value]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;

    let newDate: Moment | null = null;

    if (mode === "datetime") {
      newDate = moment(inputValue, "DD/MM/YYYY HH:mm:ss");
    } else if (mode === "date") {
      newDate = moment(inputValue, "DD/MM/YYYY");
    } else if (mode === "time") {
      const time = inputValue.split(":");
      const hours = parseInt(time[0], 10);
      const minutes = parseInt(time[1], 10);

      if (!isNaN(hours) && !isNaN(minutes)) {
        newDate = moment().hours(hours).minutes(minutes);
      }
    }

    setDate(newDate);
    onChangeDate(newDate?.toDate() || null);
  };

  return (
    <Container>
      <div className="datepicker-container">
        <label>{label}</label>
      </div>

      <ContainerDatePicker error={error}>
        <DatePicker
          selected={date ? date.toDate() : null}
          onChange={onChangeDate}
          locale={ptBR}
          dateFormat={
            mode === "time"
              ? "HH:mm"
              : mode === "date"
              ? "dd/MM/yyyy"
              : "dd/MM/yyyy HH:mm"
          }
          showTimeSelect={mode === "datetime" || mode === "time"}
          showTimeSelectOnly={mode === "time"}
          timeFormat="HH:mm"
          timeIntervals={1}
          maxDate={maxDate instanceof Date ? maxDate : undefined}
          minDate={minDate instanceof Date ? minDate : undefined}
          minTime={
            minDate instanceof Date
              ? setHours(setMinutes(new Date(), 0), 0)
              : undefined
          }
          maxTime={
            maxDate instanceof Date
              ? setHours(
                  setMinutes(new Date(), 59),
                  moment(maxDate).hours() === 0 ? 23 : moment(maxDate).hours()
                )
              : undefined
          }
          readOnly={readOnly}
          customInput={
            <input
              className={classes}
              type="text"
              value={date ? date.format("DD/MM/YYYY HH:mm:ss") : ""}
              ref={inputRef}
              onChange={handleInput}
              readOnly={readOnly}
            />
          }
        />
        {error && <p>{error}</p>}
      </ContainerDatePicker>
    </Container>
  );
};

export default DatePickerInput;
