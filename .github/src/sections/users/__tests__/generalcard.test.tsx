import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { UserContext } from '@/contexts/user-context/user-context';
import { UserRole } from '@/types/user';
import axiosInstance from '@/utils/request';

import { GeneralCard } from '../GeneralCard';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/utils/request');
jest.mock('notistack', () => ({
  useSnackbar: jest.fn(() => ({
    enqueueSnackbar: jest.fn(),
  })),
  SnackbarProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('General Card', () => {
  const mockUser = {
    _id: '123',
    email: '123@qq.com',
    nickname: '123',
    firstName: 'tester',
    lastName: 'unit',
    description: 'unit test',
    userAvatar: {
      imageAlt: 'imageAlt',
      imageUrl: 'imageUrl',
      imageType: 'imageType',
      uploadUserId: 'uploadUserId',
      _id: '_id',
      __v: 1,
    },
    role: 'admin' as UserRole,
    savedAttractions: ['SavedAttractions'],
    savedRestaurants: ['SavedRestaurants'],
    createdAt: '1',
    updatedAt: '2',
    __v: 1,
  };

  const renderWithUserContext = () => {
    const mockContext = {
      userData: mockUser,
      isAuthenticated: true,
      signIn: async () => {},
      signUp: async () => {},
      signOut: async () => {},
      initialize: async () => {},
    };

    return render(
      <SnackbarProvider>
        <UserContext.Provider value={mockContext}>
          <GeneralCard user={mockUser} />
        </UserContext.Provider>
      </SnackbarProvider>
    );
  };

  it('should render GeneralCard component correctly', () => {
    renderWithUserContext();
    const cardTitle = screen.getByText('Personal info');
    expect(cardTitle).toBeInTheDocument();
    const cardInfo = screen.getByText(
      'Customize how your profile information will appear to the networks.'
    );
    expect(cardInfo).toBeInTheDocument();

    const idField = screen.getByLabelText('ID') as HTMLInputElement;
    expect(idField).toBeInTheDocument();
    const emailAddressField = screen.getByLabelText('Email Address') as HTMLInputElement;
    expect(emailAddressField).toBeInTheDocument();
    const nickNameField = screen.getByLabelText('Nickname') as HTMLInputElement;
    expect(nickNameField).toBeInTheDocument();

    const bioTitle = screen.getByText('Bio');
    expect(bioTitle).toBeInTheDocument();
    const bioInfo = screen.getByText('Write a short introduction to be displayed on your profile.');
    expect(bioInfo).toBeInTheDocument();
    const bioField = screen.getByLabelText('Description') as HTMLInputElement;
    expect(bioField).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;
    expect(saveButton).toBeInTheDocument();
  });

  it('should display validation error message when the nickname is empty', async () => {
    renderWithUserContext();
    const user = userEvent.setup();
    const errorMessage = 'Nickname is required';
    const nicknameInput = screen.getByLabelText('Nickname') as HTMLInputElement;
    await user.click(nicknameInput);
    await user.clear(nicknameInput);
    await user.tab();
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('should display validation error message when the bio is empty or characters limit exceeded', async () => {
    renderWithUserContext();
    const user = userEvent.setup();
    const descriptionInput = screen.getByLabelText('Description') as HTMLInputElement;

    const emptyErrorMessage = 'Description is required';
    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.tab();
    expect(await screen.findByText(emptyErrorMessage)).toBeInTheDocument();

    const exceedingErrorMessage = 'Description must be less than 300 characters long';
    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.paste('1'.repeat(301));
    await user.tab();
    expect(await screen.findByText(exceedingErrorMessage)).toBeInTheDocument();
  });

  it('should display the right characters limit number when the bio is changed', async () => {
    renderWithUserContext();
    const user = userEvent.setup();
    const descriptionInput = screen.getByLabelText('Description') as HTMLInputElement;

    const charLimitMessage = '299 characters left';
    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.type(descriptionInput, '1');
    expect(await screen.findByText(charLimitMessage)).toBeInTheDocument();

    const charExceedMessage = '-1 characters left';
    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.paste('1'.repeat(301));
    expect(await screen.findByText(charExceedMessage)).toBeInTheDocument();
  });

  it('should display the save button when the bio is changed and has no more than 300 characters', async () => {
    renderWithUserContext();
    const user = userEvent.setup();
    const descriptionInput = screen.getByLabelText('Description') as HTMLInputElement;
    const saveButton = screen.queryByRole('button', { name: 'Save' });

    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.paste('1'.repeat(300));
    expect(saveButton).not.toBeDisabled;
  });

  it('should display the disabled save button when the bio is not changed or characters limit exceeded', async () => {
    renderWithUserContext();
    const user = userEvent.setup();
    const descriptionInput = screen.getByLabelText('Description') as HTMLInputElement;
    const saveButton = screen.queryByRole('button', { name: 'Save' });

    //when the bio is not changed
    expect(saveButton).toBeDisabled();

    //when characters limit exceeded
    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.paste('1'.repeat(301));
    expect(saveButton).toBeDisabled;
  });

  it('should display a success snackbar when the update succeed', async () => {
    const mockEnqueueSnackbar = jest.fn();
    const mockedRequest = axiosInstance.request as jest.MockedFunction<
      typeof axiosInstance.request
    >;
    const responseData = {
      data: { message: 'Update Succeed!' },
      status: 200,
    };
    mockedRequest.mockResolvedValue(responseData);
    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });

    renderWithUserContext();
    const user = userEvent.setup();
    const descriptionInput = screen.getByLabelText('Description') as HTMLInputElement;
    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.type(descriptionInput, '1');
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Update Succeed!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    });
  });

  it('should display an error snackbar when the update failed', async () => {
    const mockEnqueueSnackbar = jest.fn();
    const mockedRequest = axiosInstance.request as jest.MockedFunction<
      typeof axiosInstance.request
    >;
    const errorResponse = {
      response: {
        data: { exceptionMessage: 'Update Failed!' },
      },
    };
    mockedRequest.mockRejectedValue(errorResponse);
    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });

    renderWithUserContext();
    const user = userEvent.setup();
    const descriptionInput = screen.getByLabelText('Description') as HTMLInputElement;
    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.click(descriptionInput);
    await user.clear(descriptionInput);
    await user.type(descriptionInput, '1');
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Update Failed!', {
        variant: 'error',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    });
  });

  //test when isMe=false
  const renderWithAnotherUserContext = () => {
    const anotherUser = { ...mockUser, _id: '999' };
    const mockContext = {
      userData: anotherUser,
      isAuthenticated: true,
      signIn: async () => {},
      signUp: async () => {},
      signOut: async () => {},
      initialize: async () => {},
    };

    return render(
      <SnackbarProvider>
        <UserContext.Provider value={mockContext}>
          <GeneralCard user={mockUser} />
        </UserContext.Provider>
      </SnackbarProvider>
    );
  };

  it('should not display editable fields when isMe is false', () => {
    renderWithAnotherUserContext();
    const nicknameInput = screen.getByLabelText('Nickname');
    const descriptionInput = screen.getByLabelText('Description');
    const saveButton = screen.queryByRole('button', { name: 'Save' });

    expect(nicknameInput).toBeDisabled();
    expect(descriptionInput).toBeDisabled();
    expect(saveButton).not.toBeInTheDocument();
  });
});
