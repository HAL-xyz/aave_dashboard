import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
      ... on ContractsTriggerMatch {
        createdAt
        UUID
        contract {
          address
        }
        method {
          name
        }
        returnedValues {
          matched
          all
        }
        block {
          hash
          number
          timestamp
        }
        trigger {
          name
          UUID
          matchesCount
          isActive
        }
      }
      ... on TransactionsTriggerMatch {
        createdAt
        UUID
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
        block {
          hash
          number
          timestamp
        }
        transaction {
          hash
          nonce
          from
          to
          value
          gas
          gasPrice
          inputData
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

  return data.matches.map((match) => (
    <div key={match.UUID}>
      <p>
        {match.UUID}
      </p>
    </div>
  ));
};

export default FlashLoans;
