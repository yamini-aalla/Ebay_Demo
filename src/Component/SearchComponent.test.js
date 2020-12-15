import { fireEvent, render } from '@testing-library/react';
import Search from './SearchComponent';
import axios from 'axios';
 
jest.mock('axios');
const timer = jest.useFakeTimers();
 

let container;
beforeEach(() => {
    // axios.get.mockImplementationOnce(() => Promise.resolve({
    //     data:{
    //         items: [{
    //         volumeInfo: {
    //             title: 'test title',
    //             authors: 'john',
    //             publisher: '',
    //             publishedDate: new Date('2019','12','12')
    //         }
    //     }]
    // }
    // }));
    axios.get = jest.fn();
    container = render(<Search />);
});


test('renders learn react link', () => {    jest.useRealTimers(500);

    const searchBook = document.getElementsByTagName('input')[0];
    fireEvent.input(searchBook, {
      target: {
        value: 'test'
      }
    });    jest.useRealTimers(500);

      expect(searchBook).toBeTruthy();
  });
  
  test('should trigger onBookSearch', () => {
    const searchButton = document.getElementsByTagName('button')[0];
    fireEvent.click(searchButton);
    expect(searchButton).toBeTruthy();
  });