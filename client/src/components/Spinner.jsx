import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color='#2e9949'
      loading={loading}
      cssOverride={override}
      size={70}
    />
  );
};
export default Spinner;
