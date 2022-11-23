import reducer from '../../store/modules/signUpSlice';

describe('signUpSlice', () => {
  describe('reducer', () => {
    context('when previous state is undefined', () => {
      const initialState = {
        signUpFields: {
          name: '',
          phoneNumber: '',
          gender: '',
          streetNameAddress: '',
          detailedAddress: '',
          zipCode: '',
          email: '',
          password: '',
        },
      };

      it('returns initialState', () => {
        const state = reducer(undefined, { type: 'action' });

        expect(state).toEqual(initialState);
      });
    });
  });
});
