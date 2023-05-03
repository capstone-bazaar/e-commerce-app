import styled from 'styled-components';

interface TextAreaProps {
  height?: string;
  width?: string;
}

const TextArea = styled.textarea<TextAreaProps>`
  height: ${(props) => (props.height ? props.height : 'auto')};
  width: ${(props) => (props.width ? props.width : 'auto')};
  outline: none;
  resize: none;

  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  &:focus {
    border-color: #ea004b;
  }
`;

export default TextArea;
