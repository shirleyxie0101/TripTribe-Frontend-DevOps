import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const StyledQuillEditorWrapper = styled.div`
  .ql-editor {
    min-height: 200px;
  }
`;

type QuillEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const QuillEditor: React.FC<QuillEditorProps> = ({ label, value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <StyledQuillEditorWrapper>
      <Typography
        variant="h5"
        color="initial"
        gutterBottom
      >
        {label}
      </Typography>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </StyledQuillEditorWrapper>
  );
};

export default QuillEditor;
