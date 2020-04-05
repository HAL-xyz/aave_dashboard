import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Style
import {
  Box,
  Footer,
  Grid,
  Heading,
  Text,
} from 'grommet';

const getTriggerMatches = (triggerId) => gql`
  {
    matches(filter:{triggerUUID:{eq:"${triggerId}"}}){
      UUID
      createdAt
      ... on EventsTriggerMatch {
        createdAt
        UUID
        block {
          number
          hash
          timestamp
        }
        trigger {
          name
          UUID
          matchesCount
          isActive
        }
        decoded {
          method {
            name
          }
          arguments
        }
        log {
          address
          data
          topics
        }
        transaction {
          hash
        }
      }
    }
  }
`;

const TRIGGER_ID = 'b8408e35-5d62-44b8-ad35-fb9bc96b0b40';

const FlashLoans = () => {
  const { loading, error, data } = useQuery(getTriggerMatches(TRIGGER_ID));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <Grid
      columns={{
        count: 1,
        size: 'auto',
      }}
      gap="large"
      responsive
    >
      {data.matches.map((match) => (
        <Box key={match.UUID}>
          <Box
            round={{
              corner: 'top',
            }}
            background="background-front"
            pad="medium"
          >
            <Heading
              level="2"
              responsive
            >
              {match.UUID}
            </Heading>
            {match.decoded.arguments.map((arg, i) => (
              <Box key={i}>
                <Text>
                  <span>
                    <strong>
                      Amount:&nbsp;
                    </strong>
                  </span>
                  <span>
                    {arg._amount}
                  </span>
                </Text>
                <Text>
                  <span>
                    <strong>
                      Target:&nbsp;
                    </strong>
                  </span>
                  <span>
                    {arg._target}
                  </span>
                </Text>
                <Text>
                  <span>
                    <strong>
                      Reserve:&nbsp;
                    </strong>
                  </span>
                  <span>
                    {arg._reserve}
                  </span>
                </Text>
                <Text>
                  <span>
                    <strong>
                      Total Fee:&nbsp;
                    </strong>
                  </span>
                  <span>
                    {arg._totalFee}
                  </span>
                </Text>
                <Text>
                  <span>
                    <strong>
                      Timestamp:&nbsp;
                    </strong>
                  </span>
                  <span>
                    {arg._timestamp}
                  </span>
                </Text>
                <Text>
                  <span>
                    <strong>
                      Protocol Fee:&nbsp;
                    </strong>
                  </span>
                  <span>
                    {arg._protocolFee}
                  </span>
                </Text>
              </Box>
            ))}
          </Box>
          <Footer
            background={{
              color: 'background-contrast',
              opacity: 'weak',
            }}
            pad={{
              vertical: 'small',
              horizontal: 'medium',
            }}
            round={{
              corner: 'bottom',
            }}
          >
            <Text
              color="text-xweak"
            >
              {match.createdAt}
            </Text>
          </Footer>
        </Box>
      ))}
    </Grid>
  );
};

export default FlashLoans;
