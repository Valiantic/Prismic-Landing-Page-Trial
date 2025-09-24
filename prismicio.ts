import * as prismic from '@prismicio/client'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || "your-repository-name"

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
export const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'landing_pages',
    path: '/:uid',
  },
];  

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  })

  return client
}