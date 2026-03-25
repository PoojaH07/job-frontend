import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jobs heading', () => {
  render(<App />);
  const element = screen.getByText(/Jobs/i);
  expect(element).toBeInTheDocument();
});