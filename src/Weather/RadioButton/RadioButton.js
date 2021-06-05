function RadioButton(props) {
  const { label, unit, onChange } = props;
  return (
    <label htmlFor={label}>
      <input
        type="radio"
        name="unit"
        checked={unit === label}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export default RadioButton;
