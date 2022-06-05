import { PropsWithChildren } from 'react';
import NavBar from '../../NavBar/NavBar';
import Wrapper, { Variants } from '../../Wrapper/Wrapper';

export interface LayoutProps {
  variant?: Variants,
  className?: string
};

const Layout = ({
  variant,
  className,
  children
}: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <NavBar />
      <Wrapper
        variant={variant}
        className={className}
      >
        {children}
      </Wrapper>
    </>
  );
};

export default Layout;
