import styled from 'styled-components';
import CreditCardField from '../components/CreditCardField/CreditCardField';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { ContainerBox } from './Product';
import { MB_MONEY_UPLOAD_OPTIONS } from '../utils/constants';
import { Button } from '../components/Buttons/Button';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME, UPLOAD_MONEY } from '../queries/user';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.div`
  font-size: 30px;
`;

const Balance = styled.span`
  font-size: 27px;
  color: #ea004b;
`;

const OptionContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  overflow-y: scroll;
  font-weight: 700;
  @media (max-width: 768px) {
    width: 100%;
  }

  input[type='radio']:checked + & {
    border: 2px solid #ea004b;
  }
`;

const OptionRadioInput = styled.input`
  &[type='radio'] {
    display: none;
  }
`;

const MoneyOptionsWrapper = styled.div`
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  gap: 10px;
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export default function DigitalMoneyPage() {
  const { data, loading: userLoading, error } = useQuery(GET_ME);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [uploadMoney, { loading }] = useMutation(UPLOAD_MONEY);

  const handleUploadMoney = async () => {
    try {
      await uploadMoney({
        variables: {
          amount: selectedOption,
        },
        refetchQueries: [GET_ME],
      });
    } catch (error) {
      return toast.error('Something went wrong!');
    }
  };

  if (userLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <PageWithNavbar>
      <ContainerBox>
        <SectionTitle>
          Balance: <Balance>${data?.me?.budget || 0}</Balance>
        </SectionTitle>

        <Wrapper>
          <CreditCardField />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <MoneyOptionsWrapper>
              {MB_MONEY_UPLOAD_OPTIONS.map((option: number, index: number) => (
                <>
                  <OptionRadioInput
                    name="cash"
                    type="radio"
                    value={option}
                    id={index.toString()}
                    onChange={(e) => setSelectedOption(Number(e.target.value))}
                  />
                  <OptionContainer htmlFor={index.toString()}>
                    $ {option}
                  </OptionContainer>
                </>
              ))}
            </MoneyOptionsWrapper>
            <Button
              disabled={
                !MB_MONEY_UPLOAD_OPTIONS.includes(selectedOption) || loading
              }
              style={{ width: '100%' }}
              onClick={handleUploadMoney}
            >
              Upload
            </Button>
          </div>
        </Wrapper>
      </ContainerBox>
    </PageWithNavbar>
  );
}
