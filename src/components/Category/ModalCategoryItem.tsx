import styled from 'styled-components';

interface CategoryItemProps {
  title: string;
  imageURL: string;
  id: string;
  selectedCategory: string;
  onSelected: (id: string) => void;
}

interface ItemWrapperProps {
  isSelected?: boolean;
}

const ItemWrapper = styled.div<ItemWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${(props) => (props.isSelected ? '#ff9bbb31' : '#fff')};
  &:hover {
    cursor: pointer;
    background-color: #ff9bbb31;
    scale: calc(1.1);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

const Image = styled.img`
  display: block;
  height: 70px;
  width: 70px;
  margin-bottom: 10px;
`;

export default function ModalCategoryItem({
  title,
  imageURL,
  id,
  onSelected,
  selectedCategory,
}: CategoryItemProps) {
  return (
    <ItemWrapper
      isSelected={selectedCategory === id}
      onClick={() => onSelected(id)}
    >
      <Image src={imageURL} alt={title} />
      {title}
    </ItemWrapper>
  );
}
