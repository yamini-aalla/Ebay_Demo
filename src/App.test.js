import { render } from '@testing-library/react';
import App from './App';

let container;
beforeEach(() => {
  container = render(<App />);
});
test('renders container', () => {
	expect(container).toBeTruthy();
});
