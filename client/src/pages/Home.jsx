import { useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import Button from "../components/Utility/Button/Button";
import { signOutUser } from "../store/user/user-actions";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Header />
    </>
  );
};

export default Home;
