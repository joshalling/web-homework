import { ApolloLink } from '@apollo/client/link/core'
import { send, toObservable, unobserveOrCancel } from '@absinthe/socket'
import compose from 'lodash.flowright'
import { print } from 'graphql'

/**
 * This code has been extracted from the @absinth/socket-apollo-link package
 * in order make it compatible with apollo client v3.
 */
export default function createAbsintheSocketLink (
  absintheSocket,
  onError,
  onStart
) {
  return new ApolloLink(
    compose(
      notifierToObservable(absintheSocket, onError, onStart),
      (request) => send(absintheSocket, request),
      getRequest
    )
  )
}

function unobserveOrCancelIfNeeded (absintheSocket, notifier, observer) {
  if (notifier && observer) {
    unobserveOrCancel(absintheSocket, notifier, observer)
  }
}

function notifierToObservable (absintheSocket, onError, onStart) {
  return function (notifier) {
    return toObservable(absintheSocket, notifier, {
      onError,
      onStart,
      unsubscribe: unobserveOrCancelIfNeeded
    })
  }
}

function getRequest ({ query, variables }) {
  return {
    operation: print(query),
    variables
  }
}
