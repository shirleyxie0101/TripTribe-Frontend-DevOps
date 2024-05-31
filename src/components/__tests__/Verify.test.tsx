import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';

import VerifyEmail from '@/pages/verify';
import axiosInstance from '@/utils/request';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/utils/request');
jest.mock('notistack', () => ({
  useSnackbar: jest.fn(() => ({
    enqueueSnackbar: jest.fn(),
  })),
}));

const mockedRequest = axiosInstance.request as jest.MockedFunction<typeof axiosInstance.request>;
const mockEnqueueSnackbar = jest.fn();

describe('VerifyEmail Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { token: '111222' },
    });
  });

  it('should display error message and "Resend Email" button when response message is empty', async () => {
    const responseData = {
      data: { message: '' },
    };

    mockedRequest.mockResolvedValue(responseData);

    render(<VerifyEmail />);

    const btn = await screen.findByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Resend Email');

    const errorMessageElement = await screen.findByText(
      'An error occurred during email verification. Please try again later.'
    );

    expect(errorMessageElement).toBeInTheDocument();
  });

  it('should display verified message and "Sign In Now" button when response message is "Validated"', async () => {
    const responseData = {
      data: { message: 'Validated' },
    };

    mockedRequest.mockResolvedValue(responseData);

    render(<VerifyEmail />);

    const btn = await screen.findByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Sign In Now');

    const errorMessageElement = await screen.findByText(
      'Your Email has been verified. Please login directly'
    );
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('should display verified message and "Sign In Now" button when response message is "Email token not found"', async () => {
    const responseData = {
      data: { message: 'Email token not found' },
    };

    mockedRequest.mockResolvedValue(responseData);

    render(<VerifyEmail />);

    const btn = await screen.findByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Sign In Now');

    const errorMessageElement = await screen.findByText(
      'Your Email has been verified. Please login directly'
    );
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('should display illegal message and "Resend Email" button when response message is "illegal token"', async () => {
    const responseData = {
      data: { message: 'illegal token' },
    };

    mockedRequest.mockResolvedValue(responseData);

    render(<VerifyEmail />);

    const btn = await screen.findByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Resend Email');

    const errorMessageElement = await screen.findByText(
      'The verify token is illegal. Please resend an email to refresh it'
    );
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('should display illegal message and "Resend Email" button when response message is "expired token"', async () => {
    const responseData = {
      data: { message: 'expired token' },
    };

    mockedRequest.mockResolvedValue(responseData);

    render(<VerifyEmail />);

    const btn = await screen.findByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Resend Email');

    const errorMessageElement = await screen.findByText(
      'The verify token is illegal. Please resend an email to refresh it'
    );

    expect(errorMessageElement).toBeInTheDocument();
  });

  it('should display success snackbar when email resend is successful', async () => {
    const responseData = {
      data: { message: 'Resend Email Successful!' },
      status: 200,
    };
    mockedRequest.mockResolvedValue(responseData);

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });

    render(<VerifyEmail />);

    const btn = await screen.findByRole('button');
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);

    await waitFor(() => {
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Resend Email Successful!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    });
  });

  it('should display error snackbar when email resend fails', async () => {
    const errorResponse = new Error('Network Error');
    mockedRequest.mockRejectedValue(errorResponse);

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
    });

    render(<VerifyEmail />);

    const btn = await screen.findByRole('button');
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);

    await waitFor(() => {
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Resend Email Failed', {
        variant: 'error',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    });
  });
  it('should call axios with correct params and show success snackbar on successful resend', async () => {
    const token = '111222';
    const successResponse = {
      data: { message: 'Resend Email Successful!' },
    };
    mockedRequest.mockResolvedValue(successResponse);

    render(<VerifyEmail />);

    const resendButton = await screen.findByRole('button', { name: 'Resend Email' });
    await userEvent.click(resendButton);

    await waitFor(() => {
      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'post',
        url: 'auth/resend-email',
        data: { token },
      });
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Resend Email Successful!', {
        variant: 'success',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    });
  });
  it('should call axios with correct params and show error snackbar on failed resend', async () => {
    const token = '111222';
    const error = new Error('Network Error');
    mockedRequest.mockRejectedValue(error);

    render(<VerifyEmail />);

    const resendButton = await screen.findByRole('button', { name: 'Resend Email' });
    await userEvent.click(resendButton);

    await waitFor(() => {
      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'post',
        url: 'auth/resend-email',
        data: { token },
      });
      expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Resend Email Failed', {
        variant: 'error',
        autoHideDuration: 1500,
        disableWindowBlurListener: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    });
  });
});
