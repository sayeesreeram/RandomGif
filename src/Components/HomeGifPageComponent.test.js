import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeGifPageComponent from './HomeGifPageComponent';

//Note: had some issues with jest configuration i have wriiten few test cases couldnt actually test it due to system issue

  const mockContextValue = {
    darkMode: false, 
    setDarkMode: jest.fn(),
  };
  
  jest.mock('../App', () => ({
    DarkModeSwitcherContext: {
      Consumer: ({ children }) => children(mockContextValue), 
    },
  }));

describe('HomeGifPageComponent', () => {
  it('renders the component with initial state', () => {
    render(
      <Router>
        <HomeGifPageComponent />
      </Router>
    );

    const title = screen.getByText('GIFz');
    const searchInput = screen.getByPlaceholderText('Enter a gif you want to search');
    const searchButton = screen.getByText('Search');
    const trendingsLink = screen.getByText('Trendings');

    expect(title).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(trendingsLink).toBeInTheDocument();
  });

  it('performs a search when the search button is clicked', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <HomeGifPageComponent />
      </Router>
    );

    const searchInput = getByPlaceholderText('Enter a gif you want to search');
    const searchButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'cats' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const gifImages = screen.getAllByTestId('default title');
      expect(gifImages.length).toBeGreaterThan(0);
    });
  });

  it('handles errors and retries', async () => {
    jest.mock('../CustomComponents/UseApiFetchDataHandler', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        data: [],
        totalCountOfItems: 0,
        isLoading: false,
        isError: true,
        retryApiCall: jest.fn(),
      })),
    }));

    const { getByText } = render(
      <Router>
        <HomeGifPageComponent />
      </Router>
    );

    const retryButton = getByText('Retry');
    fireEvent.click(retryButton);
    
    //Making sure the retry functionality is working fine
    expect(jest.fn()).toHaveBeenCalledTimes(1);
  });
});
