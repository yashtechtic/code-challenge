import React, { useState } from "react";
import { Typography, Select } from "antd";
import { Field } from "formik";

interface CustomSelectProps {
  label?: string;
  id?: string;
  name: string;
  placeholder?: string;
  selectLabel?: boolean;
  mode?: string;
  error?: string | JSX.Element;
  options?: Array<{ value: string; label: string }>;
  onSelect?: (value: string) => void;
  defaultValue?: any;
  className?: string;
  filterOption?: (
    input: string,
    option: {
      children: any;
      label: string;
    }
  ) => boolean;
  onClick?: any;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  error,
  options,
  onSelect,
  id,
  placeholder,
  defaultValue,
  className,
  mode,
  selectLabel = true,
  onClick,
}) => {
  const { Text } = Typography;
  const [isInputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    // If the input has a value or default value, keep the label visible
    if (e.target.value) {
      setInputFocused(true);
    }
  };

  return (
    <div className="relative">
      <Text className={`text-[#1E5167] text-[16px] font-[400]`}>{label}</Text>
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <Select
            mode={mode}
            {...field}
            style={{
              fontSize: "16px",
            }}
            showSearch
            id={id}
            // size="large"
            className={`border border-solid border-[#1E5167] bg-[#F5FCFF] h-[32px] rounded-[8px] w-full hover:!border-[#1E5167] ${className}`}
            optionFilterProp="children"
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // options={options}
            onChange={(value) => {
              form.setFieldValue(name, value);
              if (onSelect) {
                onSelect(value); // Call the onSelect callback
              }
            }}
            defaultValue={defaultValue === 0 ? "" : defaultValue}
            value={defaultValue === 0 ? "" : defaultValue}
            onClick={onClick}
          >
            {selectLabel && (
              <Select.Option value={""}>
                {" "}
                {`Select ${placeholder ?? label}`}
              </Select.Option>
            )}
            {options?.map((i: any, index: number) => (
              <Select.Option key={index} value={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Field>
      {error && (
        <Text type="danger" className="flex text-left">
          {error}
        </Text>
      )}
    </div>
  );
};

export default CustomSelect;
