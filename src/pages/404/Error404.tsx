import React from "react";
import {
  Button,
  Container,
  Flex,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import useError404Styles from "./useError404Styles";

const Error404 = (): JSX.Element => {
  const { classes } = useError404Styles();

  return (
    <ScrollArea
      className={classes.root}
      h="100%"
    >
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Listen here, partner.</Title>
        <Text
          size="lg"
          align="center"
          className={classes.description}
        >
          I&apos;m gettin&apos; real tired of this, partner! The blasted page
          you&apos;re barkin&apos; after, it&apos;s up and gone, disappeared
          like a damn coyote on a moonless night. Maybe you ain&apos;t got your
          trail right, or your words are all jumbled, but you&apos;re in the
          wrong damn place! Ain&apos;t no reason for this ruckus but sure as
          hell stirs up a storm. Life&apos;s a rough ride, not some Sunday
          picnic, you gotta grit your teeth, dig your spurs in, and ride the
          damn thing! So dust off and buckle up, this ain&apos;t the end of the
          road. There&apos;s a whole wild world out there, a helluva lot bigger
          than one measly missing page!
        </Text>

        <Flex
          justify="center"
          align="center"
          direction="column"
        >
          <Link to="/">
            <Button
              variant="white"
              size="md"
            >
              Go on, head back home
            </Button>
          </Link>

          <Text
            color="white"
            mt={10}
          >
            There&apos;s no more to see here for now
          </Text>
        </Flex>
      </Container>
    </ScrollArea>
  );
};

export default Error404;
