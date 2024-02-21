import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled as mui_styled} from '@mui/system';

const Textarea = mui_styled(BaseTextareaAutosize)`
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  margin-top: 20px;
  border: 1px solid #5F22D9;
  box-sizing: border-box;

  &:hover {
    outline: none;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`;

export default Textarea