import reducer, { changeSignUpField } from '../../store/modules/signUpSlice';

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

    describe('changeSignUpField', () => {
      context('when name is changed', () => {
        it('changes only name field', () => {
          const initialState = {
            signUpFields: {
              name: '',
              email: '',
            },
          };

          const state = reducer(
            initialState,
            changeSignUpField({ name: 'name', value: 'test' }),
          );

          expect(state.signUpFields.name).toBe('test');
          expect(state.signUpFields.email).toBe('');
        });
      });
    });
  });
});
