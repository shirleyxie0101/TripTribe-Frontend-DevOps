import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import PasswordInput from '@/components/PasswordInput/PasswordInput';

describe('PasswordInput Component Tests', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    render(
      <PasswordInput
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error={false}
      />
    );
  });

  it('should render password input field successfully', () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('should call onChange with false when password is invalid', async () => {
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, 'abc');
    expect(mockOnChange).toHaveBeenCalledWith('abc', false);
  });

  it('should call onChange with true when password is valid', async () => {
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, 'Aa1!a1aa');
    expect(mockOnChange).toHaveBeenCalledWith('Aa1!a1aa', true);
  });

  const passwordTestCases = [
    {
      password: 'Aa1!a1aa', // Valid example
      criteria: {
        'At least 8 characters': true,
        'Uppercase and lowercase characters': true,
        'One number': true,
        'One special character': true,
      },
    },
    {
      password: 'aa1!a1aa', // No uppercase
      criteria: {
        'At least 8 characters': true,
        'Uppercase and lowercase characters': false,
        'One number': true,
        'One special character': true,
      },
    },
    {
      password: 'AAAA!!!!!', // No lowercase, no number
      criteria: {
        'At least 8 characters': true,
        'Uppercase and lowercase characters': false,
        'One number': false,
        'One special character': true,
      },
    },
    {
      password: 'aaaaa', // Too short, no uppercase, no number, no special char
      criteria: {
        'At least 8 characters': false,
        'Uppercase and lowercase characters': false,
        'One number': false,
        'One special character': false,
      },
    },
    {
      password: '12345678', // Only number
      criteria: {
        'At least 8 characters': true,
        'Uppercase and lowercase characters': false,
        'One number': true,
        'One special character': false,
      },
    },
    {
      password: '!!!!!!!!', // Only special character
      criteria: {
        'At least 8 characters': true,
        'Uppercase and lowercase characters': false,
        'One number': false,
        'One special character': true,
      },
    },
  ];
  passwordTestCases.forEach(({ password, criteria }) => {
    it(`should validate each criteria for password "${password}" correctly`, async () => {
      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, password);
      await userEvent.tab();

      Object.entries(criteria).forEach(([criterion, isValid]) => {
        const criterionText = `● ${criterion}`;
        expect(screen.getByText(criterionText)).toHaveStyle(`color: ${isValid ? 'green' : 'gray'}`);
      });
    });
  });

  it('should call onBlur when password input is blurred', async () => {
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.click(passwordInput);
    await userEvent.tab();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should display helperText when error is true', () => {
    render(
      <PasswordInput
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error={true}
        helperText="Error message"
      />
    );
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });
});
