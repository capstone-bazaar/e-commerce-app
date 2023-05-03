import Select from 'react-select';

/* eslint-disable */
const defaultStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    borderColor: state.isFocused ? '#ea004b' : '#ccc',
    ouline: 'none',
  }),
};

export default function SelectField({
  onChange,
  defaultValue,
  options,
  name,
  ...props
}: {
  onChange: (e: any) => void;
  defaultValue: any;
  options: any[];
  name: string;
}) {
  return (
    <Select
      styles={defaultStyles}
      onChange={onChange}
      options={options}
      name={name}
      defaultValue={defaultValue}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary25: '#eeeded',
          primary: '#ea004b',
        },
      })}
      {...props}
    />
  );
}
