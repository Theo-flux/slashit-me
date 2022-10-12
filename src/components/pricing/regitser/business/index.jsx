import Link from 'next/link';
import { InputContainer, SelectContainer, Button } from '../../../../shared';
import {
  RegisterContainer,
  Wrapper,
  Column,
  StyledTitle,
  A,
} from '../registerStyles';

const business_item = [
  {
    type: 'text',
    legend: 'Buisness Name',
    placeholder: 'business name',
    id: 'business_name',
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
  return (
    <RegisterContainer>
      <Wrapper>
        <StyledTitle>Tell us about your business</StyledTitle>

        <Column>
          {business_item.map((reg, index) => {
            const { type, legend, placeholder, id, options } = reg;
            return (
              <>
                {type !== 'select' ? (
                  <InputContainer
                    key={index}
                    type={type}
                    legend={legend}
                    placeholder={placeholder}
                    id={id}
                  />
                ) : (
                  <SelectContainer
                    key={index}
                    legend={legend}
                    placeholder={placeholder}
                    id={id}
                    options={options}
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
    </RegisterContainer>
  );
}

export default BusinessForm;
