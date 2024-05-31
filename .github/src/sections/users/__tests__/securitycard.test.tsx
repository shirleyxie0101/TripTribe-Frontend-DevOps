import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SecurityCard } from '../SecurityCard';

describe('SecurityCard Component', () => {
  it('should render the SecurityCard component correctly', () => {
    // Arrange
    render(<SecurityCard />);

    // Act Assert
    const cardTitle = screen.getByText('Password', { exact: true });
    expect(cardTitle).toBeInTheDocument();

    const oldPasswordField = screen.getByLabelText('Old Password') as HTMLInputElement;
    expect(oldPasswordField).toBeInTheDocument();
    const newPasswordField = screen.getByLabelText('New Password') as HTMLInputElement;
    expect(newPasswordField).toBeInTheDocument();
    const confirmPasswordField = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    expect(confirmPasswordField).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;
    expect(saveButton).toBeInTheDocument();
  });

  it('should display validation error message when the password is not entered', async () => {
    // arrange
    render(<SecurityCard />); // this also applies the validation schema
    const errorMessage = 'newPassword is a required field';
    const user = userEvent.setup();

    // Act & Assert
    const newPasswordInput = screen.getByLabelText('New Password') as HTMLInputElement;
    await user.click(newPasswordInput);
    expect(newPasswordInput).toHaveFocus();
    await user.tab();
    expect(newPasswordInput).not.toHaveFocus();
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('should display validation error message when the password is not in desired format', async () => {
    // arrange
    render(<SecurityCard />);
    const user = userEvent.setup();
    const expectedErrorMessage =
      'Your Password must have at least 8 characters, and include at least one uppercase letter, one lowercase letter, one symbol and one number';

    // act & assert
    const newPasswordInput = screen.getByLabelText('New Password') as HTMLInputElement;
    const saveButton = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;

    await user.type(newPasswordInput, '123');
    await user.click(saveButton);
    expect(await screen.findByText(expectedErrorMessage)).toBeInTheDocument();

    await user.clear(newPasswordInput);
    await user.type(newPasswordInput, 'mypassword');
    await user.click(saveButton);
    expect(await screen.findByText(expectedErrorMessage)).toBeInTheDocument();

    await user.clear(newPasswordInput);
    await user.type(newPasswordInput, 'Mypassword123');
    await user.click(saveButton);
    expect(await screen.findByText(expectedErrorMessage)).toBeInTheDocument();
  });

  it('should display error message if new password input not matching confirm password input', async () => {
    // arrange
    render(<SecurityCard />);
    const user = userEvent.setup();
    const expectedErrorMessage = 'Your passwords do not match';

    // act & assert
    const newPasswordInput = screen.getByLabelText('New Password') as HTMLInputElement;
    await user.type(newPasswordInput, 'Mypassword123!');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    await user.type(confirmPasswordInput, 'Mypassword1234!');
    await user.tab();

    expect(await screen.findByText(expectedErrorMessage)).toBeInTheDocument();
  });
});
