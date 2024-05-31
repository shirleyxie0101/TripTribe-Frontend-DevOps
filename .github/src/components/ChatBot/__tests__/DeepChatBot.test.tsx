// path/filename: __tests__/DeepChatBot.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DeepChatBot from '../DeepChatBot';

describe('DeepChatBot', () => {
  it('should render without crashing', async () => {
    render(<DeepChatBot options={{ isStreamingMode: true }} />);

    // assert
    expect(await screen.findByText('TripTribe Bot')).toBeInTheDocument();
  });

  it('should toggle chatbot window visibility on button click', async () => {
    // arrange
    render(<DeepChatBot options={{ isStreamingMode: true }} />);
    const user = userEvent.setup();

    // act & assert
    const chatBotTrigger = await screen.findByRole('button', { name: /chatbot-trigger/i }); // testing lib seems ignores the element with Display: none
    await user.click(chatBotTrigger);

    const chatBotWindow = await screen.findByRole('dialog', { name: /chatbot-window/i });
    expect(chatBotWindow).toBeVisible();

    const chatBotWindowCloseButton = await screen.findByRole('button', {
      name: /chatbot-window-close/i,
    });
    await user.click(chatBotWindowCloseButton);
    expect(chatBotWindow).not.toBeVisible();
  });
});
