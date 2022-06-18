import styled from 'styled-components';

const Input = styled.input`
  width: 30px;
  height: 30px;
  text-align: center;
  margin: 4px;
  padding: 5px;
  font-size: 18px;
`;

export default function NumberInput({ defaultValue, className, onChange, style }) {
  return (
    <Input
      type="number"
      defaultValue={defaultValue}
      onChange={onChange}
      className={className + " background main-text big-bordered"}
      style={style}
    />
  );
}
