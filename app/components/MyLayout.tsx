import { Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import Header from "./Header";
import MobileHeader from "./Header/MobileHeader";

/**
 * Primary application layout component
 * Renders either mobile or desktop header based on screen size
 */
const MyLayout = React.memo(
  ({
    children,
    user,
    isMobile,
  }: {
    user: any;
    children: React.ReactNode;
    isMobile: boolean;
  }) => {
    // Determine which header to show
    const headerComponent = useMemo(() => {
      return isMobile ? <MobileHeader user={user} /> : <Header user={user} />;
    }, [isMobile, user]);

    return (
      <>
        {headerComponent}
        <Flex
          as="main"
          role="main"
          direction="column"
          flex="1"
          width="100%"
          className="main-content-wrapper"
        >
          {children}
        </Flex>
      </>
    );
  }
);

MyLayout.displayName = "Layout";

export default MyLayout;
