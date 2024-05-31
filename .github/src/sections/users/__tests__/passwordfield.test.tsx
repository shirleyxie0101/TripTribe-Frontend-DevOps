import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import PasswordField from '../components/PasswordField';

describe('PasswordField', () => {
  it('should render label & input correctly', () => {
    // arrange
    const MockFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const formMethods = useForm<{ newPassword: string }>(); // no need to mock a full useForm
      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };

    render(
      <MockFormProvider>
        <PasswordField
          label="New Password"
          fieldName="newPassword"
        />
      </MockFormProvider>
    );

    // act & assert
    const input = screen.getByLabelText('New Password');
    expect(input).toBeInTheDocument();
  });

  it('should toggle password visibility', async () => {
    // arrange
    const user = userEvent.setup();
    const MockFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const formMethods = useForm<{ newPassword: string }>();
      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };
    render(
      <MockFormProvider>
        <PasswordField
          label="New Password"
          fieldName="newPassword"
        />
      </MockFormProvider>
    );

    // act & assert
    const input = screen.getByLabelText('New Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button');

    // Initially, the password should be hidden
    expect(input.type).toBe('password');
    // Click the toggle button to show the password
    await user.click(toggleButton);
    expect(input.type).toBe('text');
    // Click again to hide the password
    await user.click(toggleButton);
    expect(input.type).toBe('password');
  });
});
