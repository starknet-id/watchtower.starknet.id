import BookMark from "./solid/bookmark";

const IconRouter = ({ name }: { name: string }) => {
  let icon = null;
  switch (icon) {
    default:
      icon = <BookMark />;
      break;
  }
  return icon;
};

export default IconRouter;
