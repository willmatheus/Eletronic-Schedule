import React from 'react';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import { styled as mui_styled} from '@mui/system';

const InputElement = mui_styled('input')`
  width: 600px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: normal;
  line-height: 1.5;
  padding: 8px 12px;
  padding-left: 0px;
  border-radius: 8px;
  outline: none;
  border: 0px;

  &:hover {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <BaseInput slots={ 
  {input: InputElement}} {...props} ref={ref} />;
});

export default Input