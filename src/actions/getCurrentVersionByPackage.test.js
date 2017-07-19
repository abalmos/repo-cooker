/* eslint-env mocha */
import simple from 'simple-mock'
import { testAction } from 'test-utils'
import { mockNpmRegistry, versions } from 'test-utils/npm'
import { getCurrentVersionByPackage } from './'

describe('getCurrentVersionByPackage', () => {
  before(mockNpmRegistry)
  after(() => simple.restore())

  it('should get current version for each package', done => {
    const semverByPackage = {
      '@repo-cooker-test/commis': 'minor',
      'repo-cooker-test': 'minor',
    }
    const currentVersionByPackage = {
      'repo-cooker-test': versions['repo-cooker-test'],
      '@repo-cooker-test/commis': versions['@repo-cooker-test/commis'],
      '@repo-cooker-test/poissonier': versions['@repo-cooker-test/poissonier'],
    }
    const relatedPackagesByPackage = {
      'repo-cooker-test': [],
      '@repo-cooker-test/commis': ['@repo-cooker-test/poissonier'],
    }

    testAction(
      getCurrentVersionByPackage,
      { semverByPackage, relatedPackagesByPackage },
      { currentVersionByPackage },
      done
    )
  })
})