"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type CounterProps = {
  title: string;
  subtitle?: string;
  value: number;
  onChange: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onIncrement = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onDecrement = useCallback(() => {
    if (value === 0) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        <span className="font-light text-gray-600">{subtitle}</span>
      </div>
      <div className="flex flex-roe items-center gap-4">
        <button
          onClick={onDecrement}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-300 hover:border-neutral-900 flex items-center justify-center text-neutral-900 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </button>

        <span className="font-light text-2xl text-neutral-600">{value}</span>

        <button
          onClick={onIncrement}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-300 hover:border-neutral-900 flex items-center justify-center text-neutral-900 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};
export default Counter;
