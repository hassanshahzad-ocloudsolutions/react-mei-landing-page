import { render, screen } from '@testing-library/react';
import App from './App';

test('renders projects title', () => {
  render(<App />);
  const title = screen.getByText(/all projects/i);
  expect(title).toBeInTheDocument();
});
