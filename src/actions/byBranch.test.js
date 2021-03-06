/* eslint-env mocha */
import { testAction } from 'test-utils'
import { byBranch } from './'

it('should go down current branch', done => {
  testAction(
    [
      byBranch,
      {
        next: () => ({ success: true }),
        otherwise: [],
      },
    ],
    {},
    {
      success: true,
    },
    done
  )
})
