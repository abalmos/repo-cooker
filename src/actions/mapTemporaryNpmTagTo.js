export function mapTemporaryNpmTagTo(tagName) {
  return function mapTemporaryNpmTagTo({
    npm,
    props: { temporaryNpmTagByPackage, newVersionByPackage },
  }) {
    const packages = Object.keys(temporaryNpmTagByPackage)

    return Promise.all(
      packages.map(name =>
        npm.replaceTag(
          name,
          newVersionByPackage[name],
          temporaryNpmTagByPackage[name],
          tagName
        )
      )
    ).then(() => ({
      [`${tagName}NpmTagByPackage`]: packages.reduce(
        (latestNpmTagByPackage, name) => {
          latestNpmTagByPackage[name] = tagName

          return latestNpmTagByPackage
        },
        {}
      ),
    }))
  }
}
