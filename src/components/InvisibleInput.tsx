import React, { useContext, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { UserContext } from '@/contexts/user-context/user-context';
import { uploadFiles } from '@/sections/users/utils/upload-files';

type InvisibleInputProps = {
  userId: string;
};

// use with <Button component="label" />
export const InvisibleInput: React.FC<InvisibleInputProps> = ({ userId }) => {
  const { initialize } = useContext(UserContext);
  const [newAvatar, setNewAvatar] = useState(false);

  return (
    <input
      type="file"
      style={{
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      }}
      onChange={async (e) => {
        if (e.target.files?.[0]) {
          console.log(true);
          await uploadFiles(e.target.files[0], userId);
          await initialize();
        } else {
          console.log('no file uploaded');
        }
      }}
    ></input>
  );
};
