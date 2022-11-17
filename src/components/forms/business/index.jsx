import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { InputContainer, SelectContainer, Button } from '../../../shared';
import { setSignUpInfo } from '../../../store/reducers/auth';
import { FormContainer, Wrapper, Column, StyledTitle, A } from '../formStyles';

const business_item = [
  {
    type: 'text',
    legend: 'Buisness Name',
    placeholder: 'business name',
    id: 'business_name',
    name: 'businessName',
  },

  {
    type: 'select',
    legend: 'Category',
    placeholder: 'category',
    id: 'business_type',
    options: ['Fashion', 'Electronics'],
  },
];

function BusinessForm({ handleActive }) {
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.userAuth.signUpInfo);
  
  return (
    <FormContainer>
      <Wrapper>
        <StyledTitle>Tell us about your business</StyledTitle>

        <Column>
          {business_item.map((reg, index) => {
            const { type, legend, placeholder, id, options, name } = reg;
            return (
              <>
                {type !== 'select' ? (
                  <InputContainer
                    key={index}
                    type={type}
                    legend={legend}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    onChange={(e) =>
                      dispatch(
                        setSignUpInfo({ ...signUpInfo, [e.name]: e.event }),
                      )
                    }
                  />
                ) : (
                  <SelectContainer
                    key={index}
                    legend={legend}
                    placeholder={placeholder}
                    id={id}
                    options={options}
                    //TODO Create onSelect event  dispatch(setSignUpInfo({ ...signUpInfo, category: selected }),       )
                  />
                )}
              </>
            );
          })}
        </Column>
        <Button width={`100%`} onClick={() => handleActive('security')}>
          Next
        </Button>

        <Column>
          <Link href={'/'}>
            <A>Already have an account?</A>
          </Link>
        </Column>
      </Wrapper>
    </FormContainer>
  );
}

export default BusinessForm;
