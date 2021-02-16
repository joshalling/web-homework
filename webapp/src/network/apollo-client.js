import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import * as AbsintheSocket from '@absinthe/socket'
import createAbsintheSocketLink from './create-absinthe-socket-link'
import { Socket as PhoenixSocket } from 'phoenix'

const SERVER_URL = 'http://localhost:8000/graphql'

const request = async operation => {
  let headers = {}
  operation.setContext({ headers })
}

const cache = new InMemoryCache()

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(operation => request(operation))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const httpLink = new HttpLink({
  uri: SERVER_URL
})

const phoenixSocket = new PhoenixSocket('ws://localhost:8000/socket')

const absintheSocket = AbsintheSocket.create(phoenixSocket)
const socketLink = createAbsintheSocketLink(absintheSocket)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  socketLink,
  httpLink
)

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.warn('GQL Errors', graphQLErrors)
      }
      if (networkError) {
        console.error('Network Error', networkError)
      }
    }),
    requestLink,
    splitLink
  ]),
  cache
})

window.__APOLLO_CLIENT__ = client
