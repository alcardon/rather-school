import { useEffect, useState } from "react";

export default function SearchBar({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="mr-3 hidden flex-row flex-wrap items-center md:flex lg:ml-auto">
      <div className="relative flex w-full flex-wrap items-stretch">
        <span className="absolute z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pl-3 text-center text-base font-normal leading-snug text-blueGray-300">
          <i className="fas fa-search"></i>
        </span>
        <input
          { ...props }
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
          type="text"
          placeholder="Search here..."
          className="relative w-full rounded border-0 bg-white px-3 py-3 pl-10 text-sm text-blueGray-600 placeholder-blueGray-300 shadow outline-none focus:outline-none focus:ring"
        />
      </div>
    </div>
  );
}
