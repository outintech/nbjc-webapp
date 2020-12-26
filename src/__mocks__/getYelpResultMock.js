const getYelpResultMock = (overrides = {}) => {
  const business = {
    id: '123',
    name: 'La colombe coffee roasters',
    category: 'Coffee',
    address: '924 Blagden Alley Way Washington, D.C. 20001',
    phoneNumber: '(123) 456-7890',
  };
  return {
    ...business,
    ...overrides,
  };
};

export default getYelpResultMock;
