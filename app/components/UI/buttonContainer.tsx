import BlackScreen from "./blackScreen";
import Loading from "./loading";

const ButtonContainer = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <>
      {loading ? (
        <BlackScreen>
          <Loading />
        </BlackScreen>
      ) : null}
      {children}
    </>
  );
};

export default ButtonContainer;
