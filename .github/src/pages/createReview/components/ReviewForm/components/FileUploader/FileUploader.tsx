import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
};

const uploadAreaStyle: React.CSSProperties = {
  border: '1px dashed gray',
  height: '250px',
  marginBottom: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
};

const previewAreaStyle: React.CSSProperties = {
  marginTop: '16px',
  width: '100%',
  margin: '0 auto',
};

type FileUploaderProps = {
  updateUploadedFiles: (files: File[]) => void;
};

const FileUploader: React.FC<FileUploaderProps> = ({ updateUploadedFiles }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileCount, setFileCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Callback function when files are dropped
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > 9) {
        setError('You can only upload up to 9 files.');
        return;
      }

      setError(null);
      // Update the files state with the newly accepted files
      const newFiles = [...files, ...acceptedFiles.slice(0, 9 - files.length)];
      setFiles(newFiles);
      updateFileCount(newFiles);
      updateUploadedFiles(newFiles);
    },
    [files, updateUploadedFiles]
  );

  const handleDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    updateFileCount(updatedFiles);
    updateUploadedFiles(updatedFiles);
  };
  const updateFileCount = (uploadedFiles: File[]) => {
    setFileCount(uploadedFiles.length);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 9,
    maxSize: 3000000,
    multiple: true,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
  });

  return (
    <Container sx={{ ...containerStyle }}>
      <Paper
        elevation={2}
        sx={uploadAreaStyle}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography
            variant="body1"
            color="textSecondary"
          >
            Drop the files here ...
          </Typography>
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
          >
            Drag and drop some photos here, or click to select photos
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Add Photos
        </Button>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ position: 'absolute', bottom: 0, right: 0, margin: '16px' }}
        >
          {fileCount}/9 photos
        </Typography>
      </Paper>

      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ m: 1 }}
        >
          {error}
        </Typography>
      )}

      {files.length > 0 && (
        <Box sx={previewAreaStyle}>
          <Grid
            container
            spacing={2}
          >
            {files.map((file, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={4}
              >
                <Card sx={{ position: 'relative', maxWidth: 186 }}>
                  <CardMedia
                    component="img"
                    alt={`Uploaded Image ${index + 1}`}
                    height={124}
                    width={186}
                    sx={{ objectFit: 'contain' }}
                    image={URL.createObjectURL(file)}
                  />
                  <IconButton
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={() => handleDelete(index)}
                    color="error"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default FileUploader;
