import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ImageCarousel({ images }: { images: string[] | null }) {
  return (
    <>
      {images && (
        <Carousel showStatus={false}>
          {images.map((image, index) => {
            return (
              <ImageContainer key={index}>
                <img src={image} alt="product_image" />
              </ImageContainer>
            );
          })}
        </Carousel>
      )}
    </>
  );
}
