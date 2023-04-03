import styled from 'styled-components';
import RateStars from '../RateStars/RateStars';

const CommentContainer = styled.div`
  margin-top: 40px;
  background-color: #f5f5f5;
  color: rgba(92, 96, 97, 0.9);
  padding: 30px;
  border-radius: 10px;
`;

const ProfileImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Comment = styled.div`
  margin-top: 30px;
`;

const Name = styled.div`
  font-weight: 600;
`;

const CreatedAtDate = styled.div`
  font-weight: 100;
`;

const NameAndCreatedAtContainer = styled.div`
  margin-left: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function CommentItem({
  profileImage,
  buyerName,
  createdAt,
  rate,
  comment,
}: {
  profileImage?: string;
  buyerName?: string;
  createdAt?: Date;
  rate?: number;
  comment: string;
}) {
  return (
    <CommentContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ProfileContainer>
          <ProfileImage src={profileImage} alt="profile_img" />
          <NameAndCreatedAtContainer>
            <Name>{buyerName}</Name>
            <CreatedAtDate>1 days ago</CreatedAtDate>
          </NameAndCreatedAtContainer>
        </ProfileContainer>
        <RateStars rate={rate} />
      </div>
      <Comment>{comment}</Comment>
    </CommentContainer>
  );
}
