import { Typography } from "antd";
import { Field, useField } from "formik";

interface CustomInputProps {
  label: string;
  type: string;
  name: string;
  as: React.ElementType;
  className?: string;
  size?: string;
  placeholder?: string | "Enter Value";
  error?: string | JSX.Element;
  rows?: number;
  maxInput?: number;
  minInput?: number;
  disabled?: boolean;
  defaultValue?: any;
  readOnly?: boolean;
  onInputChange?: (fieldName: string, value: any) => void;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  name,
  as,
  className,
  size = "large",
  placeholder,
  error,
  rows,
  maxInput = 30,
  disabled,
  defaultValue,
  minInput = 0,
  readOnly = false,
  required,
  onInputChange,
}) => {
  const { Text } = Typography;
  const [field, meta, helpers] = useField({ name, type });

  const handleChange = (e: React.ChangeEvent<any>) => {
    // Call Formik's onChange
    field.onChange(e);

    // Call additional callback to capture the change
    if (onInputChange) {
      onInputChange(name, e.target.value);
    }
  };
  return (
    <div className="w-full flex flex-col">
      <Text className={`text-[#1E5167] text-[16px] font-[400]`}>
        {label}
        {required && <span className="ml-[4px] text-[#FF0000]">*</span>}
      </Text>
      <Field
        type={type}
        name={name}
        as={as}
        className={`border border-solid border-[#1E5167] bg-[#F5FCFF] h-[32px] rounded-[8px] w-full  ${className}`}
        size={size}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxInput}
        disabled={disabled}
        mininput={minInput}
        readOnly={readOnly}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomInput;
