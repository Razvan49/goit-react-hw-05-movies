import { Button, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

const NoResultFound = () => {
  const navigate = useNavigate();
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={<span>No movie was found. Try something else</span>}
    >
      <Button type="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Empty>
  );
};
export default NoResultFound;
