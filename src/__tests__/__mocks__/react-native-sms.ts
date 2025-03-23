// Mock for react-native-sms
const mockSms = {
  list: jest.fn().mockImplementation((args) => {
    const parsedArgs = JSON.parse(args);
    const mockMessages = [
      {
        _id: '1',
        address: 'Contact 1',
        body: 'Message 1 content',
        date: 1647853200000, // March 21, 2022
      },
      {
        _id: '2',
        address: 'Contact 2',
        body: 'Message 2 content',
        date: 1647939600000, // March 22, 2022
      },
      {
        _id: '3',
        address: 'Contact 3',
        body: 'Message 3 content',
        date: 1648026000000, // March 23, 2022
      },
    ];
    
    return Promise.resolve(JSON.stringify(mockMessages));
  }),
  
  delete: jest.fn().mockImplementation((args) => {
    const parsedArgs = JSON.parse(args);
    return Promise.resolve(true);
  }),
  
  hasPermission: jest.fn().mockImplementation(() => {
    return Promise.resolve(true);
  }),
};

export default mockSms; 