import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button, Center, Heading } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error: ", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const handleOnClear = () => {
        localStorage.clear();
        location.reload();
      };

      return (
        <Center flexDirection="column" height="100vh" padding="4">
          <Heading fontSize="2xl" mb="4" textAlign="center">
            Sorry, something went wrong.
          </Heading>
          <Button colorScheme="blue" onClick={handleOnClear}>
            Clear local storage
          </Button>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
