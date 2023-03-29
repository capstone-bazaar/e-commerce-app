import styled from 'styled-components';
import { EmptyStarIcon, FilledStarIcon } from '../../assests/icons';

const Container = styled.div`
  width: 100px;
`;

const StarsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export default function RateStars({ rate = 0 }: { rate?: number }) {
  return (
    <Container>
      <StarsContainer>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((_, index) => {
          if (index + 1 <= Math.ceil(rate)) {
            return <FilledStarIcon />;
          }
          return <EmptyStarIcon />;
        })}
      </StarsContainer>
    </Container>
  );
}
