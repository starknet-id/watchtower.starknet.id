import { ReactNode } from "react";

const BlackScreen = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50 rounded-lg" />
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default BlackScreen;
