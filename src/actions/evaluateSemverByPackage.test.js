/* eslint-env mocha */
import { testAction } from 'test-utils'
import { evaluateSemverByPackage } from './'

const commitsByPackage = {
  foo: [{ type: 'fix', breaks: [] }],
  bar: [{ type: 'feat', breaks: [] }],
  noop: [{ type: 'noop', breaks: [] }],
  baz: [
    { type: 'fix', breaks: [] },
    { type: 'feat', breaks: [] },
    { type: 'fix', breaks: ['x'] },
  ],
}

const semverByPackage = {
  foo: 'patch',
  bar: 'minor',
  baz: 'major',
}

it('should run the grouping function for every commit and group commits', done => {
  testAction(
    evaluateSemverByPackage,
    { commitsByPackage },
    { semverByPackage },
    done
  )
})

it('should bump all to major for Big Bang hash', done => {
  const semverByPackage = {
    foo: 'major',
    bar: 'major',
    noop: 'major',
    baz: 'major',
  }
  testAction(
    evaluateSemverByPackage,
    { commitsByPackage, hash: 'Big Bang' },
    { semverByPackage },
    done
  )
})
